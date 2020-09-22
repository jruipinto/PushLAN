/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import favicon from 'serve-favicon';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import feathers from '@feathersjs/feathers';
process.env.NODE_CONFIG_DIR = path.join(__dirname, '..', 'config/');
import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';


import { Application } from './declarations';
import logger from './logger';
import channels from './channels';
const multer = require('multer');
import scanFolder from './utils/scan-folder';


export default function (uploadsPath = '/uploads'): Application {

  const app: Application = express(feathers());

  // Don't remove this comment. It's needed to format import lines nicely.

  const storage = multer.diskStorage({
    destination: uploadsPath,
    filename: function (req: any, file: any, cb: any) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });

  // Load app configuration
  app.configure(configuration());

  // feathers-blob service
  const getPath = (pathStr: string): string => path.join(__dirname, '..', '..', '..', app.get(pathStr));



  // Enable security, CORS, compression, favicon and body parsing
  app.use(helmet());
  app.use(cors());
  app.use(compress());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(favicon(path.join(getPath('public'), 'favicon.ico')));
  // Host the public folder
  app.use('/', express.static(getPath('public')));


  // Set up Plugins and providers
  app.configure(express.rest());
  app.configure(socketio());

  // Register Upload Service with multipart support

  app.use('/files',
    upload.any(),
    {
      async find(params) {
        console.log(uploadsPath, params);
        return await scanFolder(path.join(uploadsPath, params?.query?.path ?? ''))
          .then(files => files.map(
            (file: any) => ({ ...file, path: path.join(file.path).replace(uploadsPath, '') })
          ));
      },
      async create(data: any) {
        return data;
      }
    }
  );

  app.configure(channels);

  // Configure a middleware for 404s and the error handler
  app.use(express.notFound());
  app.use(express.errorHandler({ logger } as any));

  return app;
}

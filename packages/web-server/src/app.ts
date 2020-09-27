/* eslint-disable @typescript-eslint/no-var-requires */
import { join } from 'path';
import favicon from 'serve-favicon';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import feathers from '@feathersjs/feathers';
process.env.NODE_CONFIG_DIR = join(__dirname, '..', 'config/');
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
    destination: (req: any, file: any, cb: any) => {
      cb(null, join(uploadsPath, file.fieldname));
    },
    filename: function (req: any, file: any, cb: any) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });

  // Load app configuration
  app.configure(configuration());

  // function to help solve paths in this electron app
  const getPath = (pathStr: string): string => join(__dirname, '..', '..', '..', app.get(pathStr));



  // Enable security, CORS, compression, favicon and body parsing
  app.use(helmet());
  app.use(cors());
  app.use(compress());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(favicon(join(getPath('public'), 'favicon.ico')));
  // Host the public folder
  app.use('/', express.static(getPath('public')));


  // Set up Plugins and providers
  app.configure(express.rest());
  app.configure(socketio());

  // Register Upload Service with multipart support

  app.use('/files',

    // uploads files to storage
    upload.any(),

    {
      // returns files inside the 'path' requested by client
      async find(params) {
        const requestedFolder = join(uploadsPath, params?.query?.path ?? '');
        function clip(_path: string) {
          return {
            fromPathsOf(files: any) {
              const { normalize } = require('path');
              return files.map(
                (file: any) => ({
                  ...file,
                  path: normalize(file.path).replace(_path, '')
                })
              );
            }
          };
        }
        return await scanFolder(requestedFolder)
          .then(files => clip(uploadsPath).fromPathsOf(files));
      },

      // don't do much. Multer takes care of the uploads
      async create(data: any) {
        return data;
      }
    }
  );

  // downloads requestFile
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.get('/download', (req, res, next) => {
    const requestedFile = req?.query?.path ?? false;
    if (requestedFile && typeof requestedFile === 'string') {
      res.download(
        join(uploadsPath, requestedFile)
      );
    }
  });

  app.configure(channels);

  // Configure a middleware for 404s and the error handler
  app.use(express.notFound());
  app.use(express.errorHandler({ logger } as any));

  return app;
}

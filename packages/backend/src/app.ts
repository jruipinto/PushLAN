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
const fs = require('fs');

const multer = require('multer');
const multipartMiddleware = multer();
const dauria = require('dauria');


const app: Application = express(feathers());

// Don't remove this comment. It's needed to format import lines nicely.

// Load app configuration
app.configure(configuration());

// feathers-blob service
const uploadsDir = app.get('uploads');
const blobService = require('feathers-blob');
const blobStorage = require('fs-blob-store')(uploadsDir);
const bodyParser = require('body-parser');


// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(favicon(path.join(process.cwd(), app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static( app.get('public')));

// Parse HTTP JSON bodies
app.use(bodyParser.json({ limit: '10mb' }));
// Parse URL-encoded params
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

// Upload Service with multipart support
app.use('/uploads',

  multipartMiddleware.single('uri'),

  function (req: any, res, next) {
    req.feathers.file = req.file;
    next();
  },

  blobService({ Model: blobStorage })
).hooks({
  before: {
    create: [
      function (hook) {
        if (!hook.data.uri && hook.params.file) {
          const file = hook.params.file;
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
          hook.data = { uri: uri };
        }
      }
    ]
  }
});

app.use(
  '/files',
  function (req: any, res, next) {
    console.log('files got');
    fs.readdir(uploadsDir, function (err: any, files: any) {
      if (err) {
        console.log('Unable to scan directory: ' + err);
      }
      files.forEach(console.log);
    });
    next();
  }
);

app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger } as any));

export default app;

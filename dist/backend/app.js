"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const path_1 = __importDefault(require("path"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const feathers_1 = __importDefault(require("@feathersjs/feathers"));
const configuration_1 = __importDefault(require("@feathersjs/configuration"));
const express_1 = __importDefault(require("@feathersjs/express"));
const socketio_1 = __importDefault(require("@feathersjs/socketio"));
const logger_1 = __importDefault(require("./logger"));
const channels_1 = __importDefault(require("./channels"));
const fs = require('fs');
const multer = require('multer');
const multipartMiddleware = multer();
const dauria = require('dauria');
const app = express_1.default(feathers_1.default());
// feathers-blob service
const blobService = require('feathers-blob');
const blobStorage = require('fs-blob-store')(app.get('uploads'));
const bodyParser = require('body-parser');
// Don't remove this comment. It's needed to format import lines nicely.
// Load app configuration
app.configure(configuration_1.default());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(compression_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(serve_favicon_1.default(path_1.default.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express_1.default.static(app.get('public')));
// Parse HTTP JSON bodies
app.use(bodyParser.json({ limit: '10mb' }));
// Parse URL-encoded params
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// Set up Plugins and providers
app.configure(express_1.default.rest());
app.configure(socketio_1.default());
// Upload Service with multipart support
app.use('/uploads', multipartMiddleware.single('uri'), function (req, res, next) {
    req.feathers.file = req.file;
    next();
}, blobService({ Model: blobStorage })).hooks({
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
app.use('/files', function (req, res, next) {
    console.log('files got');
    fs.readdir(app.get('uploads'), function (err, files) {
        if (err) {
            console.log('Unable to scan directory: ' + err);
        }
        files.forEach(console.log);
    });
    next();
});
app.configure(channels_1.default);
// Configure a middleware for 404s and the error handler
app.use(express_1.default.notFound());
app.use(express_1.default.errorHandler({ logger: logger_1.default }));
exports.default = app;

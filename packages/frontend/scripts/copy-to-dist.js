const srcPath = './';
const dstPath = '../../../dist/frontend/';


const fs = require('fs-extra');

fs.copy(srcPath, dstPath, { overwrite: true })
    .then(() => {
        console.log(`Copied files in ${srcPath} to ${dstPath} folder successfully.`);
    })
    .catch(err => {
        console.error(`fs.copy(${srcPath},${dstPath}) error:`, err)
    });
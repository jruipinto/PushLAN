import fs from 'fs';
import { promisify } from 'util';
import { join, extname } from 'path';

const lstat = promisify(fs.lstat);
const readdir = promisify(fs.readdir);


async function scanFolder(
  path = __dirname,
  options = { scanDeep: false }
): Promise<any> {

  const { scanDeep } = options;

  try {

    const files = Promise.all(
      await readdir(path).then(
        filesNames => filesNames.map(
          fileName => lstat(join(path, fileName))
            .then(
              fileProperties => ({
                name: fileName,
                path: join(path, fileName).replace(/\\/g, '/'),
                accessedAt: fileProperties.atime,
                createdAt: fileProperties.birthtime,
                updatedAt: fileProperties.mtime,
                size: fileProperties.size,
                isFile: fileProperties.isFile(),
                isDirectory: fileProperties.isDirectory(),
                isSymbolicLink: fileProperties.isSymbolicLink(),
                extension: extname(fileName)
              })
            )
            .then(
              file => {
                if (file.isDirectory && scanDeep) {
                  return scanFolder(file.path, { scanDeep }).then(
                    tree => ({ ...file, children: tree })
                  );
                }
                return file;
              }
            )
        )
      )
    );

    return files;

  } catch (error) {
    console.log(error);
    return {};
  }
}

export default scanFolder;

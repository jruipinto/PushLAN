/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */
// copied and modified from:
// https://github.com/dannav/directory-tree-promise
const fs = require('fs-extra');
const nPath = require('path');

const itemType = (stat: any) => {
  if (stat.isFile()) {
    return 'file';
  }

  if (stat.isDirectory()) {
    return 'dir';
  }

  return '';
};
const directoryTree = async (path = __dirname, onEachFile?: any): Promise<any> => {
  const name = nPath.basename(path);
  let item: any = { path, name };

  try {
    const stat = await fs.stat(path);

    switch (itemType(stat)) {
    case 'file':
      item.extension = nPath.extname(item.path).toLowerCase();
      item.size = stat.size;
      item.type = 'file';

      if (onEachFile && typeof onEachFile === 'function') {
        item = await onEachFile(item);
      }
      break;
    case 'dir':
      try {
        item.children = await fs.readdir(path);
        item.type = 'directory';

        const recurse = (child: any) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          return new Promise(async (res, rej) => {
            try {
              const i = await directoryTree(
                nPath.join(path, child),
                onEachFile
              );
              res(i);
            } catch (e) {
              res({});
            }
          });
        };

        const setChildren = item.children.map((child: any) => {
          return recurse(child).then(c => c);
        });

        item.children = await Promise.all(setChildren);
        item.children = item.children.filter((i: any) => Object.keys(i).length); // don't include empty items
        item.size = item.children.reduce((prev: any, cur: any) => prev + cur.size, 0);
      } catch (e) {
        return {};
      }

      break;
    default:
      return {};
    }
  } catch (e) {
    return {};
  }

  return item;
};


export default directoryTree;

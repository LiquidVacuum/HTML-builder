const { join } = require('path');
const { readdir, copyFile, mkdir, rm } = require('fs/promises');

const prepareFolder = async (nameFolderClear) => {
  try {
    await rm(nameFolderClear, { recursive: true });
  } catch(err) {}
  await mkdir(nameFolderClear, { recursive: true });
};

const recursiveCopy = async (sourceDir, sourceName, copyDir, copyName) => {
  const source = join(sourceDir, sourceName);
  const copy = join(copyDir, copyName);
  await prepareFolder(copy);

  const dirEntries = await readdir(source, { withFileTypes: true });

  for (const dirEnt of dirEntries) {
    if (dirEnt.isFile()) {
      const sourceFile = join(source, dirEnt.name);
      const copiedFile = join(copy, dirEnt.name);
      await copyFile(sourceFile, copiedFile);
    } else {
      recursiveCopy(source, dirEnt.name, copy, dirEnt.name);
    }
  }
};

recursiveCopy(__dirname, 'files', __dirname, 'files-copy');

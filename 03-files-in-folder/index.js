const { join, extname, basename } = require('path');
const { readdir, stat } = require('fs/promises');
const { stdout } = process;

const folderName = 'secret-folder';
const folderPath = join(__dirname, folderName);

const displayFileInfo = async (fileName) => {
  const filePath = join(folderPath, fileName);
  const extension = extname(fileName);
  const name = basename(fileName, extension);
  const size = (await stat(filePath)).size;

  stdout.write(`${name} - ${extension.slice(1)} - ${size >= 1024 ? (size / 1024).toFixed(2) : size} ${size >= 1024 ? 'KB' : 'B'} \n`);
};

const listFiles = async (folder) => {
  try {
    const files = await readdir(folder, {withFileTypes: true});
    for (const file of files) {
      if (file.isFile()) {
        displayFileInfo(file.name);
      }
    }
  } catch(err) {
    console.error(`\x1b[33mDirectory \x1b[31m${folder}\x1b[33m does not exist.\x1b[0m`);
  }
};

listFiles(folderPath);

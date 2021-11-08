const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const userName = require("os").userInfo().username;
const fileName = `${userName}.txt`;
const filePath = path.join(__dirname, fileName);
const output = fs.createWriteStream(filePath, 'utf-8');

stdout.write(`\x1b[32mHello, ${userName}. \x1B[0m`);
stdout.write(`\x1b[32mEnter some text you wish to save or type \x1b[33mexit\x1b[32m to leave:\x1B[0m \n`);

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', line => {
  if(line.trim() === 'exit') {
    process.exit();
  } else {
    output.write(line + '\n');
  }
});

process.on('exit', () => stdout.write(`\n\x1b[32mFile \x1B[0m\x1b[46m${fileName}\x1B[0m\x1b[32m saved. See you next time.\x1B[0m`));

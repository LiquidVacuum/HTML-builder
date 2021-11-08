const fs = require('fs');
const path = require('path');

const fileName = 'text.txt';
const filePath = path.join(__dirname, fileName);
const readableStream = fs.createReadStream(filePath, 'utf-8');
readableStream.on('data', data => console.log(data));
readableStream.on('error', error => console.log(error.message));

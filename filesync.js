import fs from 'fs';

const data = 'this is an example of file create using synchronous file system operations in node.js';
fs.writeFileSync('example.txt', data);
console.log("writing into file done successfully");

const appendData = ' in this line was appended using fs.appendFileSync()';
fs.appendFileSync('example.txt', appendData);
console.log("appending into file done successfully");

const fileData = fs.readFileSync('example.txt', 'utf8');
console.log("file content: ", fileData);
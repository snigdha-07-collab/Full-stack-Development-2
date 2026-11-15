import fs from 'fs';
const data = 'File created using asynchronous fs methods in Node.js.';
const appendData = '\nAppended line using fs.appendFile().' ;
fs.writeFile('sample.txt', data, (err) => {
  if (err) throw err;
  console.log('File has been created.');
  fs.readFile('sample.txt', 'utf8', (err, fileData) => {
    if (err) throw err;
    console.log("file content: ",fileData);
  });
  fs.appendFile('sample.txt', appendData, (err) => {
    if (err) throw err;
    console.log('Data has been appended to the file.');
  });
});

// Print numbers
//  1 through 5
for (let i = 1; i <= 5; i++) {
  console.log(i);
}

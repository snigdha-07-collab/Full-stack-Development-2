import fs from 'fs';

const filePath = 'sample.txt';

    // Write to file
    fs.writeFileSync(filePath, 'Hello, this is initial content.\nThis is another line.');
    console.log('File written successfully.');

    // Read file
    let data = fs.readFileSync(filePath, 'utf8');
    console.log('\nFile Content:');
    console.log(data);

    // Append to file
    fs.appendFileSync(filePath, '\nThis is appended content.');
    console.log('\nData appended successfully.');

    // Read updated file
    data = fs.readFileSync(filePath, 'utf8');
    console.log('\nUpdated File Content:');
    console.log(data);

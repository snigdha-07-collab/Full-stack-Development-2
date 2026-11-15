import fs from 'fs';

fs.writeFile('sample.txt', 'Hello, this is initial content.\nThis is another line.', (err) => {
    if (err) return console.error(err.message);

    fs.readFile('sample.txt', 'utf8', (err, data) => {
        if (err) return console.error(err.message);
        console.log(data);

        fs.appendFile('sample.txt', '\nThis is appended content.', (err) => {
            if (err) return console.error(err.message);

            fs.readFile('sample.txt', 'utf8', (err, updatedData) => {
                if (err) return console.error(err.message);
                console.log(updatedData);
            });
        });
    });
});
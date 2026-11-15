import http from 'http';

const server = http.createServer((req, res) => {
    //create a sutdent POST http://localhost:3000/students
    if (req.method === 'POST' && req.url === '/students') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Student Created Successfully</h1>');
        res.end();
    }
    //get all students GET http://localhost:3000/students
    else if (req.method === 'GET' && req.url === '/students') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>List of Students</h1>');
        res.end();
    }
    //get a student by id GET http://localhost:3000/students/:id
    else if (req.method === 'GET' && req.url === '/students/1') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<h1>Student Details Successfully</h1>`);
        res.end();
    }
    //update a student by id PUT http://localhost:3000/students/:id
    else if (req.method === 'PUT' && req.url === '/students/1') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<h1>Student Updated for Successfully</h1>`);
        res.end();
    }
    //delete a student by id DELETE http://localhost:3000/students/:id
    else if (req.method === 'DELETE' && req.url === '/students/1') {
        const id = req.url.split('/')[2];
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<h1>Student Deleted Successfully</h1>`);
        res.end();
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>404 Not Found</h1>');
        res.end();
    }
});
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
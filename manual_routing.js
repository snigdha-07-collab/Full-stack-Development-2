import http from 'http';

const server = http.createServer((req, res) => {

    // Create a student
    // POST http://localhost:3000/students
    if (req.method === 'POST' && req.url === '/students') {
        res.writeHead(201, { 'Content-Type': 'text/html' });
        res.end('<h1>Student created successfully</h1>');
    }

    // Get all students
    // GET http://localhost:3000/students
    else if (req.method === 'GET' && req.url === '/students') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>List of students</h1>');
    }

    // Get a student by ID
    // GET http://localhost:3000/students/1
    else if (req.method === 'GET' && req.url === '/students/1') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Student details for ID 1</h1>');
    }

    // Update a student by ID
    // PUT http://localhost:3000/students/1
    else if (req.method === 'PUT' && req.url === '/students/1') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Student updated successfully for ID 1</h1>');
    }

    // Delete a student by ID
    // DELETE http://localhost:3000/students/1
    else if (req.method === 'DELETE' && req.url === '/students/1') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Student deleted successfully for ID 1</h1>');
    }

    // Handle 404
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }

});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
import http from "http";

const server = http.createServer((req, res) => {
  // CREATE - Add a new employee
  if (req.method === "POST" && req.url === "/employees") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Employee created successfully with ID, Name, Age, Email, and Salary</h1>");
    res.end();
  } 
  // READ - Get all employees
  else if (req.method === "GET" && req.url === "/employees") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>List of all Employees</h1>");
    res.end();
  } 
  // READ - Get a single employee's details
  else if (req.method === "GET" && req.url === "/employees/1") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Employee Details: ID: 101, Name: Alex, Age: 28, Email: alex@example.com, Salary: 55000</h1>");
    res.end();
  } 
  // UPDATE - Update employee details
  else if (req.method === "PUT" && req.url === "/employees/1") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Employee updated successfully</h1>");
    res.end();
  } 
  // DELETE - Delete an employee
  else if (req.method === "DELETE" && req.url === "/employees/1") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Employee deleted successfully</h1>");
    res.end();
  } 
  // 404 - Not Found
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>404 Not Found</h1>");
    res.end();
  }
});
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
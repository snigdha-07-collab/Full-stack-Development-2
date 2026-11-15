app.post('/api/data', (req, res) => {
  const faculty = readData();
  const newfaculty = req.body;
  faculty.push(newfaculty);
  writeData(faculty);
  res.status(201).json(newfaculty);
}
app.get('/api/data', (req, res) => {
  const faculty = readData();
  res.json(faculty);
}
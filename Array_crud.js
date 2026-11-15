// Array - CRUD Program

const students = [
    { id: 1, name: "A", age: 20 },
    { id: 2, name: "B", age: 22 },
    { id: 3, name: "C", age: 19 }
];

// Create a student
const newStudent = { id: 4, name: "G", age: 21 };

students.push(newStudent);

console.log("List of students:", students);


// Get a student by ID
const studentIdToGet = 2;

const student = students.find(s => s.id === studentIdToGet);

if (student) {
    console.log(`Student with ID ${studentIdToGet}:`, student);
} else {
    console.log(`Student with ID ${studentIdToGet} not found`);
}


// Update a student by ID
const studentIdToUpdate = 3;

const updatedStudent = { id: 3, name: "Ravi", age: 20 };

const indexToUpdate = students.findIndex(
    s => s.id === studentIdToUpdate
);

if (indexToUpdate !== -1) {
    students[indexToUpdate] = updatedStudent;

    console.log(
        `Student with ID ${studentIdToUpdate} updated successfully`
    );
} else {
    console.log(
        `Student with ID ${studentIdToUpdate} not found`
    );
}


// Delete a student by ID
const studentIdToDelete = 1;

const indexToDelete = students.findIndex(
    s => s.id === studentIdToDelete
);

if (indexToDelete !== -1) {
    students.splice(indexToDelete, 1);

    console.log(
        `Student with ID ${studentIdToDelete} deleted successfully`
    );
} else {
    console.log(
        `Student with ID ${studentIdToDelete} not found`
    );
}
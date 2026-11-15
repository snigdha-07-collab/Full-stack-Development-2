import express from "express";
import fs from "fs";
const app = express();
app.use(express.json());
const readData = () => {
    try {
        return JSON.parse(
            fs.readFileSync("./faculty.json", "utf-8")
        );
    } catch (error) {
        return [];
    }
};
const writeData = (data) => {
    fs.writeFileSync(
        "./faculty.json",
        JSON.stringify(data, null, 2)
    );
};
app.post("/api/v1/faculty", (req, res) => {

    const allFaculty = readData();

    const nextId =
        allFaculty.length === 0
            ? 1
            : allFaculty[allFaculty.length - 1].id + 1;

    const newFaculty = {
        id: nextId,
        ...req.body
    };

    allFaculty.push(newFaculty);

    writeData(allFaculty);

    res.status(201).json({
        message: "Faculty created successfully",
        data: newFaculty
    });
});
app.get("/api/v1/faculty", (req, res) => {

    const allFaculty = readData();

    res.status(200).json({
        message: "Faculty retrieved successfully",
        data: allFaculty
    });
});
app.get("/api/v1/faculty/:id", (req, res) => {

    const facultyId = parseInt(req.params.id);

    const allFaculty = readData();

    const faculty = allFaculty.find(
        (fac) => fac.id === facultyId
    );
    if (faculty) {

        res.status(200).json({
            message: "Faculty retrieved successfully",
            data: faculty
        });

    } else {

        res.status(404).json({
            message: "Faculty not found"
        });
    }
});
app.put("/api/v1/faculty/:id", (req, res) => {
    const facultyId = parseInt(req.params.id);
    const allFaculty = readData();
    const facultyIndex = allFaculty.findIndex(
        (fac) => fac.id === facultyId
    );

    if (facultyIndex !== -1) {

        const updatedFaculty = {
            ...allFaculty[facultyIndex],
            ...req.body
        };

        allFaculty[facultyIndex] = updatedFaculty;

        writeData(allFaculty);

        res.status(200).json({
            message: "Faculty updated successfully",
            data: updatedFaculty
        });

    } else {

        res.status(404).json({
            message: "Faculty not found"
        });
    }
});

app.delete("/api/v1/faculty/:id", (req, res) => {

    const facultyId = parseInt(req.params.id);

    const allFaculty = readData();

    const facultyIndex = allFaculty.findIndex(
        (fac) => fac.id === facultyId
    );

    if (facultyIndex !== -1) {

        const deletedFaculty =
            allFaculty.splice(facultyIndex, 1)[0];

        writeData(allFaculty);

        res.status(200).json({
            message: "Faculty deleted successfully",
            data: deletedFaculty
        });

    } else {

        res.status(404).json({
            message: "Faculty not found"
        });
    }
});
app.listen(8080, () => {
    console.log("Server running at http://localhost:8080/api/v1/faculty");
});
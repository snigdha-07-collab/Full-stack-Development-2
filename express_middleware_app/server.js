import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';

const app = express();

// third party middleware
app.use(cors());
app.use(morgan('dev'));

// built-in middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// custom middleware function - logging
const logger = (req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        const logMessage = `${req.method} ${req.url} ${res.statusCode} - ${duration}ms\n`;
        fs.appendFile("server.log", logMessage, (err) => {
            if (err) {
                console.error("Failed to write to log file:", err);
            }
        });
    });
    next();
};
app.use(logger);

// route-specific middleware function - validation
const validate = (req, res, next) => {
    const { name, age, ward } = req.body;

    if (!name || !age || !ward) {
        const err = new Error("Patient details missing");
        err.statusCode = 400;
        throw err;
    }

    next();
};

// POST - create a patient
app.post("/api/v1/patients", validate, (req, res) => {
    res.status(200).send('Patient record created successfully');
});

// GET - fetch all patients (or by ward)
app.get("/api/v1/patients", (req, res) => {
    const ward = req.query.ward;
    if (ward) {
        res.status(200).send(`${ward} patients records fetched successfully`);
    } else {
        res.status(200).send("All patients records fetched successfully");
    }
});

// GET - fetch a patient by ID (no body required, so validate is NOT used here)
app.get("/api/v1/patients/:id", (req, res) => {
    const id = req.params.id;
    res.status(200).send(`Patient record with id ${id} fetched successfully`);
});

// PUT - update a patient by ID
app.put("/api/v1/patients/:id", validate, (req, res) => {
    const id = req.params.id;
    res.status(200).send(`Patient record with id ${id} updated successfully`);
});

// DELETE - delete a patient by ID
app.delete("/api/v1/patients/:id", (req, res) => {
    const id = req.params.id;
    res.status(200).send(`Patient record with id ${id} deleted successfully`);
});

// 404 middleware
app.use((req, res, next) => {
    res.status(404).send("Resource not found");
});

// error-handling middleware
app.use((err, req, res, next) => {
    const errCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(errCode).send(message);
});

const PORT = 6500;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
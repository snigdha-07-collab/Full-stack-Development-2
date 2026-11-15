
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';

const app = express();

// Third-party middleware
app.use(cors());
app.use(morgan('dev'));

// Built-in middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware function: logging
const logger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const logMessage =
            `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms\n`;

        fs.appendFile('server.log', logMessage, (err) => {
            if (err) {
                console.error('Failed to write to log file:', err);
            }
        });
    });

    next();
};

app.use(logger);

// Route-specific middleware: validation
const validate = (req, res, next) => {
    const { name, age, ward } = req.body ?? {};

    if (
        typeof name !== 'string' || !name.trim() ||
        age === undefined || age === null || age === '' ||
        !Number.isFinite(Number(age)) ||
        typeof ward !== 'string' || !ward.trim()
    ) {
        const err = new Error('Patient details missing or invalid');
        err.statusCode = 400;
        return next(err);
    }

    next();
};

// POST: Create a patient
app.post('/api/v1/patients', validate, (req, res) => {
    res.status(201).send('Patient record created successfully');
});

// GET: Fetch all patients or filter by ward
app.get('/api/v1/patients', (req, res) => {
    const ward = req.query.ward;

    if (ward) {
        res.status(200).send(`${ward} patients records fetched successfully`);
    } else {
        res.status(200).send('All patients records fetched successfully');
    }
});

// GET: Fetch patient by ID
app.get('/api/v1/patients/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).send(`Patient record with id ${id} fetched successfully`);
});

// PUT: Update patient by ID
app.put('/api/v1/patients/:id', validate, (req, res) => {
    const id = req.params.id;
    res.status(200).send(`Patient record with id ${id} updated successfully`);
});

// DELETE: Delete patient by ID
app.delete('/api/v1/patients/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).send(`Patient record with id ${id} deleted successfully`);
});

// 404 middleware
app.use((req, res) => {
    res.status(404).send('Resource not found');
});

// Error-handling middleware
app.use((err, req, res, next) => {
    const errCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    res.status(errCode).send(message);
});

const PORT = 6500;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongo_url = process.env.MONGODB_URI;

if (!mongo_url) {
  throw new Error("MONGODB_URI environment variable is required");
}

let db;

const client = new MongoClient(mongo_url);

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");

    db = client.db("books");
  })
  .catch((err) => {
    console.error("Failed to connect MongoDB:", err);
  });
app.post("/api/v1/books", (req, res) => {
  const { title, author, category, publisher } = req.body;

  db.collection("books")
    .insertOne({
      title,
      author,
      category,
      publisher
    })
    .then((result) => {
      res.status(201).json({
        message: "Book added successfully",
        data: {
          _id: result.insertedId,
          title,
          author,
          category,
          publisher
        }
      });
    })
    .catch((err) => {
      err.message = "Failed to add book";
      throw err;
    });
});

app.get("/api/v1/books", (req, res) => {
  db.collection("books")
    .find({})
    .toArray()
    .then((books) => {
      res.status(200).json({
        message: "Books fetched successfully",
        data: books
      });
    })
    .catch((err) => {
      err.message = "Failed to fetch books";
      throw err;
    });
});

app.get("/api/v1/books/:id", (req, res) => {
  const { id } = req.params;

  db.collection("books")
    .findOne({
      _id: new ObjectId(id)
    })
    .then((book) => {
      if (!book) {
        return res.status(404).json({
          message: "Book not found"
        });
      }

      res.status(200).json({
        message: "Book fetched successfully",
        data: book
      });
    })
    .catch((err) => {
      err.message = "Failed to fetch book";
      throw err;
    });
});

app.put("/api/v1/books/:id", (req, res) => {
  const { id } = req.params;

  const {
    title,
    author,
    category,
    publisher
  } = req.body;

  db.collection("books")
    .updateOne(
      {
        _id: new ObjectId(id)
      },
      {
        $set: {
          title,
          author,
          category,
          publisher
        }
      }
    )
    .then((result) => {
      if (result.matchedCount === 0) {
        return res.status(404).json({
          message: "Book not found"
        });
      }

      res.status(200).json({
        message: "Book updated successfully",
        data: {
          _id: id,
          title,
          author,
          category,
          publisher
        }
      });
    })
    .catch((err) => {
      err.message = "Failed to update book";
      throw err;
    });
});
app.delete("/api/v1/books/:id", (req, res) => {
  const { id } = req.params;

  db.collection("books")
    .deleteOne({
      _id: new ObjectId(id)
    })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({
          message: "Book not found"
        });
      }

      res.status(200).json({
        message: "Book deleted successfully"
      });
    })
    .catch((err) => {
      err.message = "Failed to delete book";
      throw err;
    });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server error";

  res.status(status).json({
    message
  });
});

const PORT = 7000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
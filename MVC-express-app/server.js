import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";

 const app = express();
 app.use(express.json());
 //db connection
 dotenv.config();
const PORT = process.env.PORT;
const mongo_url = process.env.MONGO_URI;
const db_name = process.env.DB_NAME;

dbConnect(mongo_url, db_name);

app.use("/api/v1/movies", movieRoutes);
//test route
app.get("/",(req,res)=>{
    res.status(200).json({message: "Movie API Server is running"});
});

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})

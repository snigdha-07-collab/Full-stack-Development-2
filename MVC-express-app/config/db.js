import mongoose from "mongoose";
const dbConnect = (mongo_url, db_name) => {
    mongoose.connect(mongo_url,{dbName: db_name}).then(()=>{
        console.log("Connected to MongoDB");
        }).catch((err)=>{
            console.log("Problem while connecting to MongoDB: ",err);
        });
    }
export default dbConnect;
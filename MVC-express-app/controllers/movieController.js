import Movie from "../models/movieModel.js";

const createMovie = (req,res)=>{
    const newMovie = req.body;
    Movie.create(newMovie).then((result)=>{
        res.status(201).json({message: "Movie created successfully", data: result});
    }).catch((err)=>{
        res.status(500).json({message: "Problem in movie creation", error: err});
 });
}

 const readMovies = (req,res)=>{
    const {category} = req.query;
    const query = category ? {category} : {};
    Movie.find(query).then((result)=>{
        res.status(200).json({message: "Movies retrieved successfully", data: result});
    }).catch((err)=>{
        res.status(500).json({message: "Problem in retrieving movies", error: err});
    });
 }

 const readMovieById = (req,res)=>{
    const {id} = req.params;
    Movie.findById(id).then((result)=>{
        if(result){
            res.status(200).json({message: "Movie details retrieved successfully", data: result});
        } else {
            res.status(404).json({message: "Movie not found"});
        }
    }).catch((err)=>{
        res.status(500).json({message: "Movie fetching failed", error: err});
    });
}

const updateMovieById = (req,res)=>{
    const {id} = req.params;
    const updateMovie = req.body;
    Movie.findByIdAndUpdate(id, updateMovie, {create: true}).then((result)=>{
        if(result){
            res.status(200).json({message: "Movie updated successfully", data: result});
        } else {
            res.status(404).json({message: "Movie not found"});
        }
    }).catch((err)=>{
        res.status(500).json({message: "Movie updation failed", error: err});
    });
}

const deleteMovieById = (req,res)=>{
    const {id} = req.params;
    Movie.findByIdAndDelete(id).then((result)=>{
        if(result){
            res.status(200).json({message: "Movie deleted successfully", data: result});
        } else {
            res.status(404).json({message: "Movie not found"});
        }
    }).catch((err)=>{
        res.status(500).json({message: "Movie deletion failed", error: err});
    });
}
export {createMovie, readMovies, readMovieById, updateMovieById, deleteMovieById};
import express from "express";
import { getTrendingMovie, getMovieTrailers } from "../controllers/movie.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);

export default router;

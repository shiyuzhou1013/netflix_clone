import express from "express";
import { getTrendingMovie } from "../controllers/movie.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);

export default router;

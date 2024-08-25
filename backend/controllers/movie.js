import { fetchFromTMDB } from "../services/tmdb.js";

export async function getTrendingMovie(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomTrendingMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({ success: true, content: randomTrendingMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

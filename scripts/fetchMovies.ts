import fs from "fs";
import path from "path";

// Defining Shape
interface Movie {
  id: number;
  title?: string;
  name?: string;
  vote_average: number;
  genre_ids: number[];
  release_date?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
}

interface TMDBResponse {
  results: Movie[];
}

// Replace with your valid TMDB API key
const API_KEY = "01d048bc79805737f086585c52000108";
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchMovies(endpoint: string): Promise<Movie[]> {
  try {
    // Handle endpoints that already have query parameters
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${BASE_URL}/${endpoint}${separator}api_key=${API_KEY}`;
    console.log(`Fetching: ${endpoint}`);
    
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`TMDB error ${res.status}`);
    }
    const data = (await res.json()) as TMDBResponse;
    return data.results || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function run() {
  try {
    // Create directories if they don't exist
    const mockDir = path.resolve("src/mock");
    if (!fs.existsSync(mockDir)) {
      fs.mkdirSync(mockDir, { recursive: true });
    }
    
    // Fetch data from different endpoints
    const trending = await fetchMovies("trending/all/week");
    const topRated = await fetchMovies("movie/top_rated");
    const actionMovies = await fetchMovies("discover/movie?with_genres=28");
    const comedyMovies = await fetchMovies("discover/movie?with_genres=35");
    const horrorMovies = await fetchMovies("discover/movie?with_genres=27");
    const romanceMovies = await fetchMovies("discover/movie?with_genres=10749");
    const documentaries = await fetchMovies("discover/movie?with_genres=99");

  // Picking only required fields
  const simplify = (movies: Movie[]) =>
    movies.map((movie) => ({
      id: movie.id,
      title: movie.title ?? movie.name ?? "Untitled",
      rating: movie.vote_average,
      genre: movie.genre_ids,
      release_date: movie.release_date ? movie.release_date.split("-")[0] : "Unknown",
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      description: movie.overview,
    }));

  // Filter out empty results
  if (trending.length === 0) {
    console.warn("Warning: No trending movies found");
  }
  if (topRated.length === 0) {
    console.warn("Warning: No top rated movies found");
  }

  const output = {
    trending: simplify(trending.slice(0, 20)),
    topRated: simplify(topRated.slice(0, 10)),
    action: simplify(actionMovies.slice(0, 20)),
    comedy: simplify(comedyMovies.slice(0, 20)),
    horror: simplify(horrorMovies.slice(0, 20)),
    romance: simplify(romanceMovies.slice(0, 20)),
    documentaries: simplify(documentaries.slice(0, 20)),
  };

  const writeJSON = path.resolve("src/mock/movies.json");
  fs.writeFileSync(writeJSON, JSON.stringify(output, null, 2), "utf-8");
  console.log("Movies fetched successfully");
  } catch (error) {
    console.error("Error in run function:", error);
  }
}

run().catch((e) => {
  console.error("Unhandled error:", e);
  process.exit(1);
});

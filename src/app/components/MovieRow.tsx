import { useState, useEffect } from "react";
import movies from "@/mock/movies.json";
import MovieCard from "./MovieCard";

type MovieRowProps = {
  genre:
    | "trending"
    | "topRated"
    | "action"
    | "comedy"
    | "horror"
    | "romance"
    | "documentaries";
  title: string;
};

export default function MovieRow({ genre, title }: MovieRowProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const itemsPerPage = 7; // Show 7 full cards plus 2 peek cards

  // Update window width on resize
  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const genreMovies = (movies[genre] || []).slice(0, 40);
  const totalPages = Math.ceil(genreMovies.length / itemsPerPage);

  // Get current movies for this page and add one from previous/next page for peek effect
  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;

  // Get the peek movie from the previous page (if any)
  const previousPeekMovie =
    indexOfFirstMovie > 0 ? genreMovies[indexOfFirstMovie - 1] : null;

  // Get the peek movie from the next page (if any)
  const nextPeekMovie =
    indexOfLastMovie < genreMovies.length
      ? genreMovies[indexOfLastMovie]
      : null;

  // Current page movies
  const currentPageMovies = genreMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  // Assemble final array with peek movies
  const displayMovies = [
    ...(previousPeekMovie ? [previousPeekMovie] : []),
    ...currentPageMovies,
    ...(nextPeekMovie ? [nextPeekMovie] : []),
  ];

  // Calculate container width based on screen size
  const getContainerStyles = () => {
    // Card width + gap
    const cardWithGap = 289.82 + 16; // 16px is the reduced gap between cards (space-x-4)

    // Calculate max visible cards based on screen width
    let visibleCards;
    if (windowWidth >= 1920) visibleCards = 7; // 2xl and above
    else if (windowWidth >= 1536) visibleCards = 6; // xl
    else if (windowWidth >= 1280) visibleCards = 5; // lg
    else if (windowWidth >= 1024) visibleCards = 4; // md
    else if (windowWidth >= 768) visibleCards = 2; // sm
    else visibleCards = 1; // xs

    // For very small screens, adjust to show at least one full card
    if (visibleCards < 1) visibleCards = 1;

    // Calculate percentage width to show exactly the number of visible cards
    // Add 40% of a card width for peek effect on both sides
    const containerWidth = cardWithGap * (visibleCards + 0.8);

    return {
      width: `${containerWidth}px`,
      maxWidth: "100%",
      margin: "0 auto",
    };
  };

  // Change page with animation
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(pageNumber);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <section className="relative py-6 bg-black group">
      <h2 className="text-white text-2xl font-bold mb-4 ml-4 px-4">{title}</h2>

      {/* Movie row with absolute positioned buttons */}
      <div className="w-full overflow-hidden">
        {/* Navigation Buttons at extreme edges */}
        <button
          className={`absolute left-0 -bottom-12 transform -translate-y-1/2 z-50
                    bg-black/30 text-white p-3 hover:bg-black/70 
                    opacity-80 group-hover:opacity-100 md:block hidden
                    transition-all duration-300 h-[59%] lg:flex items-center
                    ${isAnimating ? "scale-105" : "scale-100"} 
                    disabled:opacity-0 group`}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <span className="transform text-3xl transition-transform duration-200 group-hover:scale-135">
            &lt;
          </span>
        </button>

        {/* Content Container with cards */}
        <div className="relative px-6 md:px-16">
          <div
            className={`flex justify-center space-x-4 py-2 scrollbar-hide transition-all duration-500 ${
              isAnimating ? "opacity-80" : "opacity-100"
            }`}
            style={getContainerStyles()}
          >
            {displayMovies.map((movie, index) => (
              <div
                key={movie.id}
                className={`flex-none transition-all duration-300 transform
                  ${
                    index === 0
                      ? "opacity-70 scale-95 hover:opacity-100 hover:scale-100"
                      : ""
                  }
                  ${
                    index === displayMovies.length - 1
                      ? "opacity-70 scale-95 hover:opacity-100 hover:scale-100"
                      : ""
                  }
                `}
                style={{
                  width: "289.82px", // Match the exact width of MovieCard
                }}
              >
                <MovieCard
                  title={movie.title}
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className={`absolute right-0 top-40 transform -translate-y-1/2 z-50
                    bg-black/30 text-white p-3 hover:bg-black/70 
                    opacity-80 group-hover:opacity-100 md:block hidden
                    transition-all duration-300 h-[60%] lg:flex items-center
                    ${isAnimating ? "scale-105" : "scale-100"} 
                    disabled:opacity-0 group`}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <span className="transform text-3xl transition-transform duration-200 hover:scale-135">
            &gt;
          </span>
        </button>
      </div>
    </section>
  );
}

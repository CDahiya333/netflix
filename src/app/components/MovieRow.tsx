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
  const itemsPerPage = 6;
  const cardAspectRatio = 16 / 9;

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const genreMovies = (movies[genre] || []).slice(0, 100);
  const totalPages = Math.ceil(genreMovies.length / itemsPerPage);

  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;

  const previousPeekMovie =
    indexOfFirstMovie > 0 ? genreMovies[indexOfFirstMovie - 1] : null;

  const nextPeekMovie =
    indexOfLastMovie < genreMovies.length
      ? genreMovies[indexOfLastMovie]
      : null;

  const currentPageMovies = genreMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const displayMovies = [
    ...(previousPeekMovie ? [previousPeekMovie] : []),
    ...currentPageMovies,
    ...(nextPeekMovie ? [nextPeekMovie] : []),
  ];

  // Calculate container and card dimensions
  const getLayoutStyles = () => {
    // Number of fully visible cards
    const fullVisibleCards = windowWidth >= 768 ? 6 : 3; // 6 cards for desktop, 3 cards for mobile
    const gap = 4;

    const sidePadding = windowWidth >= 768 ? 48 : 24;

    const availableWidth = windowWidth - sidePadding * 2;

    // Calculate card width:
    // We need space for fullVisibleCards + two peek cards (0.4 each)
    // Total gap space = gaps between cards (fullVisibleCards + 1)
    const totalGapSpace = (fullVisibleCards + 1) * gap;
    const cardWidth = Math.floor(
      (availableWidth - totalGapSpace) / (fullVisibleCards + 0.8)
    );

    // Calculate card height based on aspect ratio
    const cardHeight = Math.floor(cardWidth / cardAspectRatio);

    // Width for peek cards (40% of regular cards)
    const peekCardWidth = Math.floor(cardWidth * 0.4);

    // Navigation button width and positioning
    const navButtonWidth = peekCardWidth;

    // Calculate container width to exactly fit the cards + gaps
    const containerWidth =
      cardWidth * fullVisibleCards + cardWidth * 0.8 + totalGapSpace;

    return {
      containerWidth: `${containerWidth}px`,
      containerStyle: {
        width: `${containerWidth}px`,
        maxWidth: "100%",
        margin: "0 auto",
        display: "flex",
        gap: `${gap}px`,
      },
      cardWidth: `${cardWidth}px`,
      cardHeight: `${cardHeight}px`,
      peekCardWidth: `${peekCardWidth}px`,
      navButtonWidth: navButtonWidth,
      navButtonHeight: cardHeight,
    };
  };

  const styles = getLayoutStyles();

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

  // Generate page indicator UI
  const renderPageIndicator = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div className="flex items-center space-x-2/3 h-1">
        {pageNumbers.map((page) => (
          <div
            key={page}
            className={`h-1/4 w-3 cursor-pointer transition-all duration-300 ${
              page === currentPage
                ? "bg-white "
                : "bg-gray-500 opacity-70 hover:opacity-100"
            }`}
            onClick={() => paginate(page)}
            aria-label={`Go to page ${page}`}
            role="button"
          />
        ))}
      </div>
    );
  };

  return (
    <section className="relative bg-zinc-900 group">
      <div className="flex justify-between items-center px-12">
        <div className="text-white text-xl ml-1">{title}</div>
        <div className="md:block hidden self-end -pb-12 ">
          {renderPageIndicator()}
        </div>
      </div>

      {/* Movie row with absolute positioned buttons */}
      <div className="w-full overflow-hidden relative">
        {/* Navigation Buttons at extreme edges */}
        <button
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-50
                    bg-black/30 text-white hover:bg-black/40 
                    opacity-0 group-hover:opacity-100 md:flex hidden
                    transition-all duration-300 items-center justify-center
                    ${isAnimating ? "scale-105" : "scale-100"} 
                    disabled:opacity-0`}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          style={{
            height: `${styles.navButtonHeight}px`,
            width: `${styles.navButtonWidth}px`,
          }}
        >
          <span className="text-4xl">&lt;</span>
        </button>

        {/* Content Container with cards */}
        <div className="relative px-6 md:px-12 flex justify-center">
          <div
            className={`py-2 scrollbar-hide transition-all duration-500 ${
              isAnimating ? "opacity-80" : "opacity-100"
            }`}
            style={styles.containerStyle}
          >
            {displayMovies.map((movie, index) => {
              const isPeekCard =
                index === 0 || index === displayMovies.length - 1;
              return (
                <div
                  key={movie.id}
                  className={`flex-none transition-all duration-300 transform
                    ${
                      isPeekCard
                        ? "opacity-70 scale-95 hover:opacity-100 hover:scale-100"
                        : ""
                    }
                  `}
                >
                  <MovieCard
                    title={movie.title}
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    width={styles.cardWidth}
                    height={styles.cardHeight}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <button
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-50
                    bg-black/30 text-white hover:bg-black/40
                    opacity-0 group-hover:opacity-100 md:flex hidden
                    transition-all duration-300 items-center justify-center
                    ${isAnimating ? "scale-105" : "scale-100"} 
                    disabled:opacity-0`}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          style={{
            height: `${styles.navButtonHeight}px`,
            width: `${styles.navButtonWidth}px`,
          }}
        >
          <span className="text-4xl">&gt;</span>
        </button>
      </div>
    </section>
  );
}

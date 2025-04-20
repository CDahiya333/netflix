import { useState, useEffect } from "react";
import movies from "@/mock/movies.json";
import Image from "next/image";

type TopRatedRowProps = {
  title: string;
};

export default function TopRatedRow({ title }: TopRatedRowProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const itemsPerPage = 5; // Show 5 cards per page

  const topRatedMovies = movies.topRated.slice(0, 10);
  const totalPages = Math.ceil(topRatedMovies.length / itemsPerPage);

  // Update window width on resize
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;

  const previousPeekMovie =
    indexOfFirstMovie > 0 ? topRatedMovies[indexOfFirstMovie - 1] : null;

  const nextPeekMovie =
    indexOfLastMovie < topRatedMovies.length
      ? topRatedMovies[indexOfLastMovie]
      : null;

  const currentPageMovies = topRatedMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  // Assemble final array with peek movies
  const displayMovies = [
    ...(previousPeekMovie ? [previousPeekMovie] : []),
    ...currentPageMovies,
    ...(nextPeekMovie ? [nextPeekMovie] : []),
  ];

  // Calculate container and card dimensions
  const getLayoutStyles = () => {
    const fullVisibleCards = Math.min(5, itemsPerPage); // Max 5 cards visible
    const gap = 2;

    const sidePadding = windowWidth >= 768 ? 48 : 24;
    const availableWidth = windowWidth - sidePadding * 2;

    // Calculate card width
    const totalGapSpace = (fullVisibleCards + 1) * gap;
    const cardWidth = Math.floor(
      (availableWidth - totalGapSpace) / (fullVisibleCards + 0.8)
    );

    // For square cards, height equals width
    const cardHeight = cardWidth;

    // Width for peek cards
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
      <div className="flex items-center space-x-1 h-1">
        {pageNumbers.map((page) => (
          <div
            key={page}
            className={`h-1/4 w-4 cursor-pointer transition-all duration-300 ${
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
    <section className="relative py-6 bg-zinc-950 group">
      <div className="flex justify-between items-center mb-4 px-8">
        <h2 className="text-white text-2xl font-bold">{title}</h2>
        <div className="md:block hidden">{renderPageIndicator()}</div>
      </div>

      {/* Movie row with absolute positioned buttons */}
      <div className="w-full overflow-hidden relative">
        {/* Navigation Buttons at extreme edges */}
        <button
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10
                    bg-black/50 text-white hover:bg-black/80 
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

              // Calculate the rank based on actual position in topRatedMovies array (not display array)
              let rankNumber = null;

              if (previousPeekMovie && index === 0) {
                // This is the peek movie from previous page - don't show rank
                rankNumber = null;
              } else {
                // For regular cards, calculate position in original array
                const originalIndex = previousPeekMovie
                  ? index - 1 + indexOfFirstMovie
                  : index + indexOfFirstMovie;

                // Only show ranks for positions 0-9 (corresponding to ranks 1-10)
                if (originalIndex >= 0 && originalIndex < 10) {
                  rankNumber = originalIndex + 1; // +1 because ranks start at 1, not 0
                }
              }

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
                  style={{
                    width: styles.cardWidth,
                  }}
                >
                  <TopRatedCard
                    movie={movie}
                    rank={rankNumber}
                    width={styles.cardWidth}
                    height={styles.cardHeight}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <button
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10
                    bg-black/50 text-white hover:bg-black/80 
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

type TopRatedCardProps = {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    rating: number;
  };
  rank: number | null;
  width?: string;
  height?: string;
};

function TopRatedCard({ movie, rank, width, height }: TopRatedCardProps) {
  return (
    <div
      className="flex bg-zinc-900 rounded overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
      style={{
        width: width || "100%",
        height: height || "auto",
        aspectRatio: "1 / 1", // Ensure square aspect ratio
      }}
    >
      {/* Left side with rank number (if available) */}
      <div className="w-1/3 flex items-center justify-center bg-zinc-950">
        {rank && (
          <span
            className="font-bold text-black pl-6"
            style={{
              fontSize: rank > 9 ? "120px" : "160px", // Slightly smaller for double digits
              WebkitTextStroke: "2px grey",
              textStroke: "2px white",
              lineHeight: "0.8",
            }}
          >
            {rank}
          </span>
        )}
      </div>

      {/* Right side with movie poster */}
      <div className="w-2/3 justify-end relative ">
        <Image
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
          style={{ objectPosition: "center" }}
        />
      </div>
    </div>
  );
}

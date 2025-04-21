"use client";
import Navbar from "@/app/components/Navbar";
import dynamic from "next/dynamic";
import MovieRow from "../components/MovieRow";
import TopRatedRow from "../components/TopRatedRow";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <main className="relative min-h-screen bg-zinc-900">
      <Navbar />

      {/* Movie Rows Section */}
      <div className="movie-rows-section bg-zinc-900 relative z-20 pt-6">
        <MovieRow genre="trending" title="Trending Now" />
        <TopRatedRow title="Top 10 Movies" />
        <MovieRow genre="action" title="Action Thrillers" />
        <MovieRow genre="comedy" title="Comedy Movies" />
        <MovieRow genre="horror" title="Horror Movies" />
        <MovieRow genre="romance" title="Romance Movies" />
        <MovieRow genre="documentaries" title="Documentaries" />
        <MovieRow genre="action" title="Science Fiction" />
        <MovieRow genre="comedy" title="Critically Acclaimed TV Comedies" />
        <MovieRow genre="horror" title="New on Netflix" />
        <TopRatedRow title="Top 10 Shows in India Today" />
        <MovieRow genre="romance" title="Romantic International TV Dramas" />
        <MovieRow genre="documentaries" title="Bingeworth TV Thrillers" />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });

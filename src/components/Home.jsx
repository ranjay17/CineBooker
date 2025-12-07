import Sidebar from "../admin/Sidebar";
import HeroSection from "./HeroSection";
import NowPlaying from "./NowPlaying";
import TopRated from "./TopRated";
import Footer from "./Footer";
import useFetchMovies from "../hooks/useFetchMovies";

const Home = () => {
  const admin = localStorage.getItem("adminToken");
  const { loading } = useFetchMovies();

  if (loading) return <p className="p-6 text-center">Loading movies...</p>;

  return (
    <div className={`flex ${admin ? "" : "justify-center"}`}>
      {admin && <Sidebar />}

      <div className={`${admin ? "flex-1" : "w-full"}`}>
        <HeroSection />
        <NowPlaying />
        <TopRated />
        <Footer />
      </div>
    </div>
  );
};

export default Home;


import CategoryCard from "../../components/CategoryCardx";
import LastFilm from "./components/LastFilm";
import TopRatedFilm from "./components/TopRatedFilm";
import ActorsList from "../Actors/components/ActorsList";
import FilmSpotlight from "./components/FilmSpotlight";



const Homepage = () => {
  return (
    <main className="">
      <FilmSpotlight />
      <div className="flex flex-col bg-toxic flex-1 gap-10 py-6 px-20">
      <LastFilm/>
      <TopRatedFilm />
      <ActorsList />
      <CategoryCard /> 
      </div>

    </main>
  );
};

export default Homepage;

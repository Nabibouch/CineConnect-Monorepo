
import CategoryCard from "../../components/CategoryCardx";
import LastFilm from "./components/LastFilm";
import TopRatedFilm from "./components/TopRatedFilm";


const Homepage = () => {
  return (
    <main className="flex flex-col bg-toxic flex-1 gap-10 py-6 px-20">
      
      <LastFilm/>
      <TopRatedFilm />
      <CategoryCard /> 

    </main>
  );
};

export default Homepage;

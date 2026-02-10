import { useFilmsHomepage } from "../../../hook/useFilms";
import Label from "./Label"

const LastFilm = () => {

  const { data, isLoading, isError } = useFilmsHomepage();

  if (isLoading) return <div>Chargement...</div>;
  if (isError || !data) return <div>Erreur</div>;
  const { lastFilm } = data;
  return (
    <div className="flex flex-col gap-6 text-white">
      <Label title="Dernière sortie" />
      <h2 className="text-[40px] font-semibold">{ lastFilm.title }</h2>
      <p>{ lastFilm.description }</p>
    </div>
  )
}

export default LastFilm;

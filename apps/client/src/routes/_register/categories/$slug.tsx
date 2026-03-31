// src/routes/categories/$slug.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useFilms } from '../../../hook/useFilms'
import { FILM_THEMES } from '../../../hook/useFilmThemeFilter'
import FilmCard from '../../../components/FilmCard'
import { useMemo } from 'react'
import { CATEGORY_IMAGES } from '../../../utils/Categoryimages'

export const Route = createFileRoute('/_register/categories/$slug')({
  component: CategoryPage,
})

const getThemeFromSlug = (slug: string) =>
  FILM_THEMES.find(
    (t) => t.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-") === slug
  )

function CategoryPage() {
  const { slug } = Route.useParams()
  const { data: films, isLoading, error } = useFilms()

  const theme = getThemeFromSlug(slug)

  const filteredFilms = useMemo(() => {
    if (!films || !theme) return []
    return films.filter((film) =>
      (film.categories ?? []).includes(theme.title)
    )
  }, [films, theme])

  if (isLoading) return <div>Chargement...</div>
  if (error) return <div>Erreur lors du chargement.</div>
  if (!theme) return <div>Catégorie introuvable.</div>

  return (
    <div className="flex min-h-screen bg-toxic">

      {/* Gauche — liste des films */}
      <div className="flex-1 px-6 py-8">
        <h1 className="text-white text-3xl font-bold mb-6">{theme.title}</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFilms.length > 0
            ? filteredFilms.map((film) => <FilmCard key={film.id} film={film} />)
            : <p className="text-white col-span-full">Aucun film trouvé.</p>
          }
        </div>
      </div>

            {/* Droite — image de la catégorie en sticky */}
        <div className="hidden lg:block w-[600px] shrink-0 ">
        <div className="sticky top-5 h-screen">
            <img
            src={CATEGORY_IMAGES[theme.title]}
            alt={theme.title}
            className="w-full h-full object-cover object-right"
            />
        </div>
        </div>
        </div>
  )
}
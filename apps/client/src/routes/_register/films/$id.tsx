import { createFileRoute } from '@tanstack/react-router'
import OneFilm from '../../../pages/OneFilm/OneFilm'

export const Route = createFileRoute('/_register/films/$id')({
  component: OneFilm,
})



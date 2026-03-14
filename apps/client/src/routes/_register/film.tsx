import { createFileRoute } from '@tanstack/react-router'
import Films from '../../pages/Films/Films'

export const Route = createFileRoute('/_register/film')({
  component: Films,
})



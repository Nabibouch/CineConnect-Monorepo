import { createFileRoute } from '@tanstack/react-router'
import AllActors from '../../../pages/Actors/components/ALLActors'

export const Route = createFileRoute('/_register/actors/')({
  component: AllActors,
})
import { createFileRoute } from '@tanstack/react-router'
import OneActor from '../../../pages/Actors/OneActor'

export const Route = createFileRoute('/_register/actors/$id')({
  component: OneActor,
})
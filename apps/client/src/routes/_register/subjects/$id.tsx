import { createFileRoute } from '@tanstack/react-router'
import OneSubject from '../../../pages/OneSubject/OneSubject'

export const Route = createFileRoute('/_register/subjects/$id')({
    component: OneSubject,
})



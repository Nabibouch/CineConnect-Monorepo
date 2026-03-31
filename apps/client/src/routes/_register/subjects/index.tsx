import { createFileRoute } from '@tanstack/react-router'
import Subjects from '../../../pages/Subjects/Subjects'

export const Route = createFileRoute('/_register/subjects/')({
    component: Subjects,
})

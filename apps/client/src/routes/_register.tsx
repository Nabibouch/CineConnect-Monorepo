import { createFileRoute, Outlet } from '@tanstack/react-router'
import Header from '../components/Header'

export const Route = createFileRoute('/_register')({
  component: RegisterLayout,
})

function RegisterLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  )
}

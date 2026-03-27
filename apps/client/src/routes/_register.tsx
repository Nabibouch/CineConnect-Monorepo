import { createFileRoute, Outlet } from '@tanstack/react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const Route = createFileRoute('/_register')({
  component: RegisterLayout,
})

function RegisterLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
       
    </div>
  )
}

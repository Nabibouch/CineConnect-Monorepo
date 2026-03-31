import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { apiUser } from '../services/apiUser';

export const Route = createFileRoute('/_register')({
  beforeLoad: async () => {
    try {
      await apiUser.getMe();
    } catch (error) {
      throw redirect({
        to: '/signup',
      });
    }
  },
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

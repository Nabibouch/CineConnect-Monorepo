import { createFileRoute, redirect } from '@tanstack/react-router'
import { apiUser } from '../services/apiUser'

export const Route = createFileRoute('/film')({
  beforeLoad: async () => {
    try {
      await apiUser.getMe();
    } catch (error) {
      throw redirect({
        to: '/signup',
      });
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div> bro thats bullshit <span className='text-red-400'>film!</span></div>
}

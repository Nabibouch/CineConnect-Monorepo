import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/film')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div> bro thats bullshit <span className='text-red-400'>film!</span></div>
}

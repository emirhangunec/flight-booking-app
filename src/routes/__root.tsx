import Header from '@/components/header'
import { createRootRoute, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from '@/components/ui/sonner'
import Footer from '@/components/footer'

export const Route = createRootRoute({
	component: () => (
		<>
			<Header />
			<Outlet />
			<Footer />
			{/* <TanStackRouterDevtools /> */}
			<Toaster />
		</>
	),
})

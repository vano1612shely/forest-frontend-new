import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'

import { ThemeProvider } from '@/components/theme-provider.tsx'

import { useAuthStore } from '@/store/auth.store.ts'

import EsdProvider from './ESD/EsdProvider'
import './index.scss'
import { routeTree } from './routeTree.gen'

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
		SIGN_DATA_BY_ESD?: Function | null
		// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
		CALLBACK_SIGN_DATA_BY_ESD?: Function | null
		PREVENT_CHECK_SIGNATURES_SERIAL_ON_FRONT_END?: boolean
	}
}
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0
		}
	}
})
// Create a new router instance
const router = createRouter({
	routeTree,
	context: {
		queryClient,
		user: undefined!
	}
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}
function App() {
	const user = useAuthStore(state => state)
	return (
		<RouterProvider
			router={router}
			context={{ queryClient, user }}
		/>
	)
}
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
	const root = createRoot(rootElement)
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider
					defaultTheme='dark'
					storageKey='vite-ui-theme'
				>
					<EsdProvider>
						<App />
						<Toaster />
					</EsdProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</StrictMode>
	)
}

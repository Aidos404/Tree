import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

import ReactDOM from 'react-dom/client'
import './index.css'
import TreeComponent from './TreeComponent.jsx'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<TreeComponent />
		</QueryClientProvider>
	</React.StrictMode>
)

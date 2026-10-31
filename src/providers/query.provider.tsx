
import React from 'react'
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // One retry, not three. A failing API otherwise keeps every
            // loading state on screen for the length of the whole backoff,
            // which reads as a hung page rather than an error.
            retry: 1,
            refetchOnWindowFocus: false
        }
    }
})


const QueryProvider = ({children}:{children:React.ReactNode}) => {
    return (
        <QueryClientProvider client={queryClient}>
            { children}
        </QueryClientProvider>
  )
}

export default QueryProvider

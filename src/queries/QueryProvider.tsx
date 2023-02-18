import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 0,
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	},
});

const QueryProvider = ({ children }: { children: ReactNode}) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProvider;
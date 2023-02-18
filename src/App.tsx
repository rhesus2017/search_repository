import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/home/Home";
import Search from "./page/search/Search";

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

axios.defaults.headers.common["Authorization"] = `token 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`;

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

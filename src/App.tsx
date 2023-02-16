import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/home/Home";
import SearchResult from "./page/search-result/SearchResult";
import axios from "axios";

export const queryClient = new QueryClient({ defaultOptions: {
  queries: {
    cacheTime: 0,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  }
}});

const App = () => {
  axios.defaults.headers.common["Authorization"] = `token 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`;

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-result" element={<SearchResult />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/home/Home";
import Issues from "./page/issues/Issues";
import NotFound from "./page/not-found/NotFound";
import SearchResult from "./page/search-result/SearchResult";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-result" element={<SearchResult />} />
          <Route path="/issues" element={<Issues />} />
          <Route element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

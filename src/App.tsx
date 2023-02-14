import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/home/Home";
import Issues from "./page/issues/Issues";
import NotFound from "./page/not-found/NotFound";
import SearchResult from "./page/search-result/SearchResult";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-result" element={<SearchResult />} />
        <Route path="/issues" element={<Issues />} />
        <Route element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

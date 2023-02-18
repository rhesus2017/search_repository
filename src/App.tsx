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

// API 시간당 요청 횟수가 적어 사용 시 문제가 생길 수 있습니다.
// API 시간당 요청을 늘리기 원한다면 아래 토큰 텍스트 자리에 토큰을 넣고 주석을 해제해주세요.
// axios.defaults.headers.common["Authorization"] = `token 토큰`;

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

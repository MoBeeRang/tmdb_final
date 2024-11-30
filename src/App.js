import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'
import MovieCategory from './pages/MovieCategory'
import SearchResults from './pages/SearchResults'
import NotFound from './pages/NotFound'
import './styles/common.css'

function App() {
   //Tip!)라우트는 같은 컴포넌트와 연결 되어있으면 props가 바뀌어도 재 랜더링을 하지 않는 특징이 있다.
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/popular" element={<MovieCategory category="popular" />} />
         <Route path="/now_playing" element={<MovieCategory category="now_playing" />} />
         <Route path="/upcoming" element={<MovieCategory category="upcoming" />} />
         <Route path="/search" element={<SearchResults />} />
         <Route path="/detail/:movieId" element={<Detail />} />
         <Route path="/*" element={<NotFound />} />
      </Routes>
   )
}

export default App

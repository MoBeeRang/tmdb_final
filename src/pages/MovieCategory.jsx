// 인기영화/ 현재 상영중인영화/ 개봉예정영화 를 한데 모아서 보여주는 곳
import { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../features/movies/moviesSlice'

import '../styles/common.css'
import { Wrap, Main } from '../styles/StyledComponent'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import MovieCard from '../components/MovieCard'
import Button from '@mui/material/Button'

function MovieCategory({ category }) {
   const dispatch = useDispatch(fetchMovies())
   const { movies, loading, error } = useSelector((state) => state.movies)
   const [page, setPage] = useState({
      popular: 1,
      now_playing: 1,
      upcoming: 1,
   })

   //메뉴이동(탭이동)할때마다 페이징 초기화

   /* 심화 정보:: 최초 메뉴 클릭 시 MovieCategory 컴포넌트 렌더링(마운트), 이후 메뉴 클릭 시엔 MovieCategory 컴포넌트 재 렌더링 되지 않음. (라우터를 사용한 경우, 강튼 컴포넌트 사용 시 props가 바뀌어도 재 렌더링 되지 않는 특징을 가지고 있음 주의. 그래서 페이지 이동 시 state처리를 해줘야 한다고 한다.)
   'main페이지에 있다가 최초메뉴 클릭 했을때' -> MovieCategory랜더링되면서 1,2번 유즈이팩트가 동시에 실행된다.
   '1번 유즈이팩트에서 page가 바뀜, 2번 유즈이팩트에서 API콜을 한다.' 그런데 1번 유즈이팩트 실행시 page state가 바뀌었기 때문에
   2번 useEffect가 한번 더 실행되며 API콜이 한번 더 발행되는 현상이 발생한다. 
   이후에 다른 메뉴를 클릭 시 category props는 바뀌지만, 라우터의 특징에 따라 (링크를 클릭하여 props가 바뀌고, page스테이트도 바뀌게 되지만, 동일 컴포넌트일 경우, 재 렌더링은 일어나지 않는 현상)state변경에 따른 재 랜더링은 발생하지 않기때문에, 
   2번 유즈이팩트가 실행되지 않는 것이다.
   => 중요!)) 따라서 "useRef"를 사용해 최초로 메뉴를 클릭할때에만 한번 useEffect를 실행하도록 만들어 준다.(어차피 최초 메뉴 클릭시 page sate는 모두 1)
   */

   //최최1번 실행 유무 확인용
   const isFirstLoad = useRef(true)

   //1번 유즈이팩트
   useEffect(() => {
      if (isFirstLoad.current) {
         isFirstLoad.current = false
         return
      }
      setPage((prevPage) => ({ ...prevPage, [category]: 1 }))
   }, [category])

   //2번 유즈이팩트
   useEffect(() => {
      dispatch(fetchMovies({ category, page: page[category] }))
      // eslint-disable-next-line react-hooks/exhaustive-deps
      /** eslint-disable-next-line react-hooks/exhaustive-deps 는 warning을 인지하고있으며, 의도된 조건등록임을 명시해줘서 warning을 안나오게 함 대신 다른사람이 이해하기 쉽게 왜 의존성을 뺐는지 이유를 적어야 한다.*/
   }, [dispatch, page])

   const loadMore = useCallback(() => {
      setPage((prevPage) => ({
         ...prevPage,
         [category]: prevPage[category] + 1,
      }))
   }, [category])

   if (loading && page === 1) {
      return (
         <Wrap>
            <Menu>
               <Main>
                  <h2>loading...</h2>
               </Main>
               <Footer></Footer>
            </Menu>
         </Wrap>
      )
   }
   if (error) {
      return (
         <Wrap>
            <Menu>
               <Main>
                  <h2>error...{error}</h2>
               </Main>
               <Footer></Footer>
            </Menu>
         </Wrap>
      )
   }
   return (
      <Wrap>
         <Menu />
         <Main $padding="30px 0">
            <MovieCard movies={movies} />
            <Button
               variant="outlined"
               sx={{
                  margin: '20px auto',
                  display: 'block',
                  width: '500px',
               }}
               onClick={loadMore}
            >
               더보기
            </Button>
         </Main>
         <Footer />
      </Wrap>
   )
}

export default MovieCategory

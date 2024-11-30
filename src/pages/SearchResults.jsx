import { useCallback, useEffect, useState } from 'react'
//useSearchParams:: 쿼리스트링 내용을 가져올 수 있다.
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearchMovieResult } from '../features/movies/moviesSlice'
// 영화 검색 결과
import { Wrap, Main } from '../styles/StyledComponent'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

import MovieCard from '../components/MovieCard'
import Button from '@mui/material/Button'

function SearchResults() {
   const [searchParams] = useSearchParams()
   const query = searchParams.get('query')

   const [page, setPage] = useState(1) //더보기 눌렀을때 필요한 state값.

   const dispatch = useDispatch(fetchSearchMovieResult())
   const { searchResults, loading, error } = useSelector((state) => state.movies)
   //최초 실행시 받아오는 결과를 1페이지에 뿌린다.
   useEffect(() => {
      //createAsyncThunk는 무조건 두개이상 매개변수는 객체나 배열로 줘야된다. 받을때도 같은 구조로 받을것(fetchSearchMovieResult설정과 동일하게 맞춰야 한다는 말이다).
      dispatch(fetchSearchMovieResult({ query, page: 1 }))
   }, [dispatch, query])
   //page state가 변경될 때마다 새로운 결과를 로딩
   //더보기 버튼 눌렀을때 page 가 변경되고, 이후 useEffect 실행 (fetchSearchMovieResult()실행)
   useEffect(() => {
      //useEffect는 무조건 처음에 실행하게 되는데, 그러면 두개의 useEffect가 실행됨. 1페이지 기준으로 나누어 두번째페이지부터 실행되도록 조건을 달아서 최초 로딩시 이중실행을 막음.
      if (page > 1) {
         dispatch(fetchSearchMovieResult({ query, page }))
      }
   }, [dispatch, page, query])

   const loadMore = useCallback(() => {
      //더보기 누를때마다 page state가 1씩 증가
      setPage((prevPage) => prevPage + 1)
   }, [])

   if (loading && page === 1) {
      return (
         <Wrap>
            <Menu />
            <Main $padding="30px 0">
               <h2>검색중...</h2>
            </Main>
            <Footer />
         </Wrap>
      )
   }
   if (error) {
      return (
         <Wrap>
            <Menu />
            <Main $padding="30px 0">
               <h2>오류발생:{error}</h2>
            </Main>
            <Footer />
         </Wrap>
      )
   }
   return (
      <Wrap>
         <Menu />
         <Main $padding="30px 0">
            {searchResults.length > 0 ? (
               <>
                  <MovieCard movies={searchResults} />
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
               </>
            ) : (
               <h2>검색 결과가 없습니다.</h2>
            )}
         </Main>

         <Footer />
      </Wrap>
   )
}

export default SearchResults

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearchMovieDetail } from '../features/movies/moviesSlice'
import Grid from '@mui/material/Grid2'
import Rating from '@mui/material/Rating' //평점만들때 씀
import { useParams } from 'react-router-dom'
function MovieDetail() {
   const { movieId } = useParams() //path에 있는 movieId를 가져옴, 왜 못가져오냐..
   const dispatch = useDispatch(fetchSearchMovieDetail())
   const { movieDetails, loading, error } = useSelector((state) => state.movies)
   useEffect(() => {
      if (movieId) {
         dispatch(fetchSearchMovieDetail(movieId))
      }
   }, [dispatch, movieId])
   if (loading) return <p>loading</p>

   if (error) return <p>error:{error}</p>

   return (
      //맨처음 렌더링 발생시 movieDtl의 초기 state는 null, 렌더링 이후 useEffect가 실행되면 그때 값이 들어오기때문에 렌더링 연산자 사용하여 있을때만 보여주도록 함.
      <>
         {movieDetails && (
            <Grid container spacing={2}>
               <Grid size={3}>
                  <img src={`https://image.tmdb.org/t/p/w400${movieDetails.poster_path}`} alt={movieDetails.title} width={270}></img>
               </Grid>
               <Grid size={9}>
                  <h2 style={{ marginBottom: '10px' }}>{movieDetails.title}</h2>
                  <h3 style={{ marginTop: '10px' }}>줄거리</h3>
                  <p>{movieDetails.overview}</p>
                  <h3 style={{ marginTop: '10px' }}>장르</h3>
                  <p>{movieDetails.genres.map((genre) => `${genre.name}`)}</p>
                  <h3 style={{ marginTop: '10px' }}>개봉일</h3>
                  <p>{movieDetails.release_date}</p>
                  <h3 style={{ marginTop: '10px' }}>평점</h3>
                  <p>
                     <Rating name="read-only" value={movieDetails.vote_average / 2} readOnly />
                  </p>
               </Grid>
            </Grid>
         )}
      </>
   )
}

export default MovieDetail

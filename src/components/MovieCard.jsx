import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
function MovieCard({ movies }) {
   return (
      <Grid container spacing={2.5}>
         {movies.map((movie) => (
            //size는 12에서 5를 나눈 값. 얼마나 표현하고 싶은지 구하고 싶으면 12에 원하는 1행의 표현개수를 나눠 계산하면 된다지롱.
            <Grid key={movie.id} size={2.4}>
               <Link to={`/detail/${movie.id}`} style={{ textDecoration: 'none' }}>
                  <Card sx={{ maxWidth: 345 }}>
                     <CardMedia sx={{ height: 400 }} image={movie.poster_path ? `https://image.tmdb.org/t/p/w400${movie.poster_path}` : '/images/poster.png'} title={movie.title} />
                     <CardContent>
                        <Typography
                           gutterBottom
                           variant="h5"
                           component="div"
                           sx={{
                              //말줄임표 스타일 적용하는 방법. 자주쓰인다고 함
                              fontSize: 17,
                              whiteSpace: 'nowrap', // 한 줄로 설정
                              overflow: 'hidden', // 넘치는 텍스트 숨김
                              textOverflow: 'ellipsis', // 말줄임표 적용
                              width: '200px', // 최대 너비 설정
                           }}
                        >
                           {movie.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                           {movie.release_date ? movie.release_date : '없음'}
                        </Typography>
                     </CardContent>
                  </Card>
               </Link>
            </Grid>
         ))}
      </Grid>
   )
}

export default MovieCard

import axios from 'axios'

// const BASE_URL = 'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1&region=KR'
const BASE_URL = 'https://api.themoviedb.org/3'

// const AUTH_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTU3MmRhYjlkODc5OTNhNzIwM2YzMzFlZWUwMzYyYiIsIm5iZiI6MTczMTEzOTMzNS40Nzc3NjcyLCJzdWIiOiI2NzJmMGRjZjVhNjViYjgxOTBkZDBhOTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.lJDt7ntFwNq-n4dh6osJJxmakWYo8Y2BH6_fjh7oWSI'
const AUTH_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTU3MmRhYjlkODc5OTNhNzIwM2YzMzFlZWUwMzYyYiIsIm5iZiI6MTczMTEzOTMzNS40Nzc3NjcyLCJzdWIiOiI2NzJmMGRjZjVhNjViYjgxOTBkZDBhOTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.lJDt7ntFwNq-n4dh6osJJxmakWYo8Y2BH6_fjh7oWSI'

//axios api 사용방법~!
const tmdbApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      accept: 'application/json', //response데이터를 json객체로 달라고 요청
      Authorization: `Bearer ${AUTH_KEY}`, //서버에게 인정받은 사람에게만 response해주기때문에 키값을 보내줘야 한다.
   },
})

//axios api 사용방법~!(get방식) (async await (비동기함수)를 사용해야한다.)
//API를 통해 영화 목록을 가져오는 함수
//매개변수 name=값 은 default값이다.
export const searchMovie = async (query, page = 1) => {
   //   /search/movie?query=%EB%B2%A0%EB%86%88&include_adult=false&language=ko-KR&page=1&region=KR'
   const response = await tmdbApi.get('/search/movie', {
      params: {
         query,
         page,
         include_adult: false,
         language: 'ko-KR',
         region: 'KR',
      },
   })
   return response
}

//영화 상세정보 가져오는 요청
export const getMovieDetails = async (MovieId) => {
   //  https://api.themoviedb.org/3/movie/515616?language=ko-KR
   const response = await tmdbApi.get(`/movie/${MovieId}`, {
      params: {
         language: 'ko-KR',
      },
   })
   return response
}
//영화 상세정보 가져오는 요청
export const getMovieCredits = async (MovieId) => {
   //  https://api.themoviedb.org/3/movie/515616?language=ko-KR
   const response = await tmdbApi.get(`/movie/${MovieId}/credits`, {
      params: {
         language: 'ko-KR',
      },
   })
   return response
}

//영화 카테고별 정보 가져오는 요청:: popular
export const getMovies = async (category = 'popular', page = 1) => {
   // ?language=ko-KR&page=1&region=KR
   const response = await tmdbApi.get(`/movie/${category}`, {
      params: {
         page,
         language: 'ko-KR',
         region: 'KR',
      },
   })
   return response //영화데이터
}
export default tmdbApi

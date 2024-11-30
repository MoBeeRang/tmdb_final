import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { searchMovie, getMovieDetails, getMovieCredits, getMovies } from '../../api/tmdbApi'
//async 매개변수 받을때 {}로(비구조화 할당) 받는거 주의. createAsyncThunk는 1개는 그냥 ()로 중괄호 없이 받아도 되지만, 두개이상의 매개변수를 받을때는 반드시 json객체나 (혹은 배열)로 받아야 한다~
//영화 검색
export const fetchSearchMovieResult = createAsyncThunk('movies/fetchSearchMovieResult', async ({ query, page }) => {
   const response = await searchMovie(query, page)
   return response.data.results
})
//영화 상세정보가져오기
export const fetchSearchMovieDetail = createAsyncThunk('movies/fetchSearchMovieDetail', async (movieId) => {
   const response = await getMovieDetails(movieId)
   return response.data
})
//영화 제작 참여자 정보가져오기
export const fetchSearchMovieCredit = createAsyncThunk('movies/fetchSearchMovieCredit', async (movieId) => {
   const response = await getMovieCredits(movieId)
   return response.data
})
//영화 카테고리 목록 가져오기(인기/현재/예정)
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async ({ category, page }) => {
   const response = await getMovies(category, page)
   return response.data.results
})
const moviesSlice = createSlice({
   name: 'movies',
   initialState: {
      loading: false,
      error: null,
      searchResults: [], //검색한 영화목록(배열은 초기값을 빈 배열로 준다)
      movieDetails: null, //영화상세정보(json객체는 초기값을 null로 준다)
      movieCredit: null,
      movies: [],
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchSearchMovieResult.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchSearchMovieResult.fulfilled, (state, action) => {
            state.loading = false
            //최초 search버튼 실행시 page 기본값 1로 들어감.
            if (action.meta.arg.page === 1) {
               state.searchResults = action.payload
            } else {
               //더 보기 눌렀을때 추가될 페이지 데이터로드시 기존+새로운 데이터 update 실행
               state.searchResults = [...state.searchResults, ...action.payload]
            }
         })
         .addCase(fetchSearchMovieResult.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
         .addCase(fetchSearchMovieDetail.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchSearchMovieDetail.fulfilled, (state, action) => {
            state.loading = false
            state.movieDetails = action.payload
         })
         .addCase(fetchSearchMovieDetail.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
         .addCase(fetchSearchMovieCredit.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchSearchMovieCredit.fulfilled, (state, action) => {
            state.loading = false
            state.movieCredit = action.payload
         })
         .addCase(fetchSearchMovieCredit.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
         .addCase(fetchMovies.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false
            if (action.meta.arg.page === 1) {
               state.movies = action.payload
            } else {
               //더 보기 눌렀을때 추가될 페이지 데이터로드시 기존+새로운 데이터 update 실행
               state.movies = [...state.movies, ...action.payload]
            }
         })
         .addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
   },
})

export default moviesSlice.reducer

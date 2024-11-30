import { configureStore } from '@reduxjs/toolkit'
import movieReducer from '../features/movies/moviesSlice'

const store = configureStore({
   reducer: {
      movies: movieReducer,
   },
})
export default store

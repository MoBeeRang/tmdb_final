import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import '../css/CreditsSlider.css'
import 'swiper/css/scrollbar'
import { Autoplay, Scrollbar } from 'swiper/modules'

import { useDispatch, useSelector } from 'react-redux'
import { fetchSearchMovieCredit } from '../../features/movies/moviesSlice'
import { useParams } from 'react-router-dom'

function CreditsSlider() {
   const { movieId } = useParams()
   const dispatch = useDispatch(fetchSearchMovieCredit())
   const { movieCredit, loading, error } = useSelector((state) => state.movies)
   useEffect(() => {
      if (movieId) dispatch(fetchSearchMovieCredit(movieId))
   }, [dispatch, movieId])
   if (loading) return <p>loading중..</p>
   if (error) return <p>error: {error}</p>
   return (
      <div className="common_margin_tb">
         <h2>출연배우</h2>
         <Swiper
            slidesPerView={5}
            spaceBetween={30} //margin-right:30px
            modules={[Scrollbar, Autoplay]} //버튼형,바 형등 다양한 형태 존재
            className="mySwiper"
            scrollbar={{
               hide: false,
            }}
            autoplay={{
               delay: 2500,
               disableOnInteraction: false,
            }}
         >
            {movieCredit &&
               movieCredit.cast.map((cast) => (
                  <SwiperSlide key={cast.id}>
                     <div style={{ padding: 20 }}>
                        <img src={cast.profile_path ? `https://image.tmdb.org/t/p/w400${cast.profile_path}` : '/images/person.png'} alt={cast.name} />
                        <p style={{ fontWeight: 'bold' }}>{cast.name}</p>
                     </div>
                  </SwiperSlide>
               ))}
         </Swiper>
      </div>
   )
}

export default CreditsSlider

import './css/Banner.css'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import { useCallback, useState } from 'react'
//useNavigate :: 페이지 이동시키는 hook
import { useNavigate } from 'react-router-dom'
function Banner() {
   //최적화 팁:: 컴포넌트 내부에서 사용하는 함수들은 useCallback하는게 좋다.
   const [searchQuery, setSearchQuery] = useState('')
   //navigate객체는 이동할 경로를 매개변수로 주면 그 주소로 링크를 눌러이동해주는 역할을 하는가봉가(submit의 action으로 이동시켜주는 역할을 하는거과 같은듯하다.)
   const navigate = useNavigate()
   const handleInputChange = useCallback((e) => {
      setSearchQuery(e.target.value)
   }, [])
   const handleSearch = useCallback(
      (e) => {
         e.preventDefault() //새로고침 방지(기본이벤트 실행 중단)
         //trim() ==> 양 옆의 공백 제거
         if (searchQuery.trim()) {
            navigate(`search?query=${searchQuery}`)
         }
      },
      [searchQuery, navigate] //useCallBack팁:: warning뜨면 그거 등록 해주면 됨
   )
   return (
      <div
         style={{
            width: '100%',
            height: '400px',
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), url(/images/banner.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
         }}
      >
         <div className="search">
            <h1 className="header_msg">환영합니다! 수백만 개의 영화를 지금 살펴보세요.</h1>
            <form className="search_form" onSubmit={handleSearch}>
               <TextField sx={{ backgroundColor: 'white' }} fullWidth label="영화검색" id="fullWidth" value={searchQuery} onChange={handleInputChange} />
               <Button sx={{ width: 100, height: 56, backgroundColor: 'white' }} variant="outlined" startIcon={<SearchIcon />} type="submit">
                  검색
               </Button>
            </form>
         </div>
      </div>
   )
}

export default Banner

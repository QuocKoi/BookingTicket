import React, { useEffect } from 'react'
import HomeFilmCommingSoonList from './HomeFilmCommingSoonList/HomeFilmCommingSoonList'
import HomeFilmList from './HomeFilmList/HomeFilmList'
import HomeMenu from './HomeMenu/HomeMenu'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchFilmList } from '../../redux/actions/MovieManagerAction'
import { actFetchMoviesCalendarInCinema } from '../../redux/actions/CinemaManagerAction'
import { actFetchBannerList } from '../../redux/actions/CarouselActions'
import HomeCarousel from './HomeCarousel/HomeCarousel'

export default function Home(props) {
  const dispatch = useDispatch();
  const { arrFilmList } = useSelector(state => state.MovieManagerReducer);
  const { arrMoviesCalendarList } = useSelector(state => state.CinemaManagerReducer);
  const { arrBanner } = useSelector(state => state.CarouselReducer);
  useEffect(() => {
    dispatch(actFetchBannerList());
    dispatch(actFetchFilmList());
    dispatch(actFetchMoviesCalendarInCinema());
  }, [])
  return (
    <div className='home'>
      <HomeCarousel arrBanner={arrBanner} />
      <div className='w-3/4 m-auto pt-24'>
        <HomeFilmList arrFilmList={arrFilmList} />
        <HomeFilmCommingSoonList arrFilmList={arrFilmList} />
        <HomeMenu arrMoviesCalendarList={arrMoviesCalendarList} />
      </div>

    </div>
  )
}

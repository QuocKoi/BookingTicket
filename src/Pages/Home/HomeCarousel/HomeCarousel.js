import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import styled from 'styled-components';
import { actFetchBannerList } from '../../../redux/actions/CarouselActions';
const Button = styled.button`
  &[data-bs-target]{
  width: 15px;
  height: 15px;
  border-radius:50%;
  }
  &[data-bs-target].active{
    background-color:#f59e0b 
    }
`
export default function HomeCarousel(props) {
  const dispatch=useDispatch();
  const {arrBanner}=props;
  const renderBanner = () => {
    return arrBanner.map((banner, index) => {
      const { maBanner, hinhAnh, maPhim } = banner;
      let classActive = '';
      if (maBanner == 1) {
        classActive = 'active'
      }
      return <div key={index} className={`carousel-item ${classActive} relative float-left w-full h-97 bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url(${hinhAnh})` }}>
        <img src={hinhAnh} className="block w-full opacity-0" alt="Motorbike Smoke" />
      </div>
    })
  }
  return (
    <div id="carouselDarkVariant" className="carousel slide carousel-fade relative" data-bs-ride="carousel">
      <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
        <Button data-bs-target="#carouselDarkVariant" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
        <Button data-bs-target="#carouselDarkVariant" data-bs-slide-to={1} aria-label="Slide 1" />
        <Button data-bs-target="#carouselDarkVariant" data-bs-slide-to={2} aria-label="Slide 1" />
      </div>
      <div className="carousel-inner relative w-full overflow-hidden ">
        {renderBanner()}
      </div>
      <button className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0" type="button" data-bs-target="#carouselDarkVariant" data-bs-slide="prev">
        <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0" type="button" data-bs-target="#carouselDarkVariant" data-bs-slide="next">
        <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>


  )
}

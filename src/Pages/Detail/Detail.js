import React, { useEffect, useState, useLayoutEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchFilmInforDetail } from '../../redux/actions/MovieManagerAction'
import { Progress, Rate, Tabs } from 'antd';
import styled from 'styled-components'
import moment from 'moment'
import _ from 'lodash'
import { actFetchFilmCalendar } from '../../redux/actions/CinemaManagerAction'

const Overley = styled.div`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index:1;
  background:linear-gradient(to top, rgb(19,28,36) 5%, transparent);
`
const Glassmorphism = styled.div`
background: rgba( 255, 255, 255, 0.25 );
  backdrop-filter: blur( 6px );
  height:100%;
  position:relative;
`
const SectionDetail = styled.div`
 background: rgb(19,28,36)
`
const Image = styled.div`
    cursor: pointer;
    &:hover{
      .overley{
        opacity:1
      }
    }
`
const TabsStyle = styled(Tabs)`
    .ant-tabs-nav{
      .ant-tabs-nav-wrap{
        .ant-tabs-nav-list{
          .ant-tabs-tab{
            .ant-tabs-tab-btn{
              color:#fff
            }
          }
          .ant-tabs-tab-active{
            .ant-tabs-tab-btn{
              color:#fbbf24
            }
          }
          .ant-tabs-ink-bar{
            background:#d97706
          }
        }
      }
    }
`
const { TabPane } = Tabs;
export default function Detail() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [size, setSize] = useState([0, 0]);
  const [state, setState] = useState({ len: 100, visible: true });
  const [direction, setDirection] = useState(true);
  const { id } = useParams();
  const { filmInforDetail } = useSelector(state => state.MovieManagerReducer);
  const { filmCalendar } = useSelector(state => state.CinemaManagerReducer);
  const { heThongRapChieu } = filmCalendar;
  const { hinhAnh, moTa, tenPhim, trailer, danhGia, hot, ngayKhoiChieu } = filmInforDetail;
  useEffect(() => {
    dispatch(actFetchFilmInforDetail(id));
    dispatch(actFetchFilmCalendar(id));
    const handleResize = (event) => {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(()=>{
    if(size[0]>448){
      setDirection(true);
    }
    if(size[0]<540){
      setDirection(false);
    }
  },[size])
  const BackgroundRegion = styled.section`
   background-image:url(${hinhAnh});
   height:100vh;
   background-repeat:no-repeat;
   background-size:cover;
   background-position:center;
  `
  const renderCinemaSystem = () => {
    return heThongRapChieu?.map((cinemaSystem, index) => {
      const { logo, tenHeThongRap, cumRapChieu } = cinemaSystem;
      return <TabPane tab={
        <div className='flex items-center'>
          <img src={logo} className='w-10 h-10 mx-auto rounded-circle' />
          <span className='ml-3 hidden md:block'>{tenHeThongRap}</span>
        </div>
      } key={index}>
        {renderCinemaList(cumRapChieu)}
      </TabPane>
    })
  }
  const renderCinemaList = (cinemaList) => {
    return cinemaList.map((cinema, index) => {
      const { diaChi, tenCumRap, hinhAnh, lichChieuPhim } = cinema;
      return <div key={index} className='mb-8'>
        <div className='flex items-center'>
          <img src={hinhAnh} className='w-10 h-10 rounded-circle' alt={tenCumRap} />
          <div className='ml-3'>
            <h4 className='text-white'>{tenCumRap}</h4>
            <p className='text-gray-400 m-0'>{diaChi}</p>
          </div>
        </div>
        <div className='mt-5 grid grid-cols-4 gap-2'>
          {renderFilmCalandar(lichChieuPhim)}
        </div>
      </div>
    })
  }
  const renderFilmCalandar = (filmCalendars) => {
    return filmCalendars.slice(0, 12).map((calendar, index) => {
      const { ngayChieuGioChieu, maLichChieu } = calendar;
      return <button key={index} className='text-white bg-lime-600 rounded font-semibold hover:bg-amber-500 hover:text-black' onClick={() => { handleOnClick(maLichChieu) }}>{moment(ngayChieuGioChieu).format('h:mm A')}</button>
    })
  }
  const handleOnClick = (filmCalendarId) => {
    history.push(`/checkout/${filmCalendarId}`)
  }
  return (
    <SectionDetail >
      <BackgroundRegion>
        <Glassmorphism>
          <Overley></Overley>
          <div className=' w-4/5 md:w-3/5 h-full mx-auto relative z-10 flex items-center'>
            <div className='flex items-center flex-col md:flex-row justify-between w-full'>
              <div className='flex items-center'>
                <Image className='image w-48 h-72 overflow-hidden relative'>
                  <img className='rounded w-full h-full' src={hinhAnh} />
                  <a href={trailer} className='overley rounded bg-black/40 absolute w-full h-full top-0 flex items-center justify-center transition-all duration-200 opacity-0'>
                    <div className='text-white text-base w-10 h-10 rounded-circle border-2 flex items-center justify-center'><i class="fa fa-play"></i></div>
                  </a>
                </Image>
                <div className='text-white ml-3 w-1/2'>
                  <div className='flex items-center'>
                    <p className={`text-white bg-red-600 p-1 rounded-md font-semibold ${hot ? 'inline-block mr-3' : 'hidden'}`}>Hot</p>
                    <p>{moment(ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                  </div>
                  <p className='text-base font-semibold'>{tenPhim}</p>
                  <p className='m-0'>{_.truncate(moTa, { length: `${state.len}` })}</p>
                  <div>
                    <button className={`${state.visible ? `block` : `hidden`} text-amber-500 hover:underline`} onClick={() => { setState({ len: moTa.length, visible: false }) }}>Đọc thêm</button>
                    <button className={`${state.visible ? `hidden` : `block`} text-amber-500 hover:underline`} onClick={() => { setState({ len: 100, visible: true }) }}>Ẩn bớt</button>
                  </div>
                </div>
              </div>
              <div className='hidden md:flex flex-col items-center'>
                <Progress strokeColor='#84cc16' format={(percent, successPercent) => {
                  return <span className='text-white text-3xl'>{percent / 10}</span>
                }} type="circle" percent={danhGia * 10} />
                <Rate style={{ display: 'flex' }} disabled value={danhGia / 2} />
              </div>
            </div>
          </div>
        </Glassmorphism>
      </BackgroundRegion>
      <div className=' w-4/5 md:w-3/5 mx-auto py-24 border-t-2 border-slate-700'>
        <h1 className={`text-white text-center text-lg ${heThongRapChieu?.length == 0 ? 'block' : 'hidden'}`}>Không có lịch chiếu!</h1>
        <TabsStyle tabPosition={direction?'left':'top'} tabBarStyle={{ justifyContent: 'center' }}>
          {renderCinemaSystem()}
        </TabsStyle>
      </div>
    </SectionDetail>
  )
}

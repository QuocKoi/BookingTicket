import { Tabs } from 'antd'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'
import moment from 'moment';
import { useHistory } from 'react-router-dom';
const { TabPane } = Tabs;
const TabStyle = styled(Tabs)`
    .ant-tabs-nav{
        .ant-tabs-nav-wrap{
            .ant-tabs-nav-list{
                .ant-tabs-ink-bar{
                    background:#d97706
                  }
            }
        }
    }
    .ant-tabs-content-holder{
        height:450px;
    }
`
const CinemaTabStyle = styled(Tabs)`
   .ant-tabs-nav{
        width:50%;
        height:450px;
        overflow: auto;
        display:block;
        .ant-tabs-nav-list{
            .ant-tabs-tab{
                padding:0;
                border-radius:0.25rem;
                transition:all .2s;
                &:hover{
                    background:#f59e0b;
                    .detail{
                        color:black;
                        .address{
                            color:black
                        }
                    }
                }
                .ant-tabs-tab-btn{
                    width:100%;
                }
                .detail {
                    .address{
                        white-space:normal
                    }
                }
            }
            .ant-tabs-tab-active{
                background:#f59e0b;
                .detail{
                    color:black;
                    .address{
                        color:black;   
                    }
                }
            }
        }
   }
   .ant-tabs-content-holder{
    overflow: auto;
   }
`
export default function HomeMenu(props) {
    const history=useHistory()
    const dispatch = useDispatch()
    const { arrMoviesCalendarList } = props
    const renderTabPane = () => {
        return arrMoviesCalendarList.map((item, index) => {
            const { logo, tenHeThongRap, lstCumRap } = item;
            return <TabPane tab={<img className='rounded-full w-12' src={logo} alt={tenHeThongRap} />} key={index}>
                <CinemaTabStyle tabBarStyle={{ overflow: 'auto' }} tabPosition='left' size='small'>
                    {renderCinemasLst(lstCumRap)}
                </CinemaTabStyle>
            </TabPane>
        })
    }
    const renderCinemasLst = (array) => {
        return array.map((cinema, index) => {
            const { tenCumRap, hinhAnh, diaChi, danhSachPhim } = cinema;
            return <TabPane key={index} tab={
                <div className='detail text-left p-2 mb-3 flex items-center cursor-pointer text-white'>
                    <img className='w-10 h-10 rounded-circle' src={hinhAnh} alt={tenCumRap} />
                    <div className='ml-2'>
                        <p className='mb-1 font-semibold '>{tenCumRap}</p>
                        <p className='address m-0 text-gray-400 text-xs'>{diaChi}</p>
                    </div>
                </div>}
            >
                {renderFilmList(danhSachPhim)}
            </TabPane>
        })
    }
    const renderFilmList = (arrayFilms) => {
        return arrayFilms.map((film, index) => {
            const { hinhAnh, dangChieu, hot, lstLichChieuTheoPhim, tenPhim } = film;
            if (dangChieu) {
                return <div key={index} className='mb-4'>
                    <div className='flex items-center mb-3'>
                        <img className='w-10 h-10 rounded' src={hinhAnh} alt={tenPhim} />
                        <span className='ml-2 font-semibold text-white'>{tenPhim}</span>
                    </div>
                    <div className='grid grid-cols-4 gap-2' >
                    {renderFilmsCalendar(lstLichChieuTheoPhim)}
                    </div>
                </div>
            }
        })
    }
    const renderFilmsCalendar = (arrayFilmsCalendar) => {
        return arrayFilmsCalendar.slice(0,12).map((calendar, index) => {
            const { ngayChieuGioChieu, maRap, maLichChieu } = calendar;
            return <button key={index} className='text-white bg-lime-600 rounded font-semibold hover:bg-amber-500 hover:text-black' onClick={()=>{history.push(`/checkout/${maLichChieu}`)}}>
                    {moment(ngayChieuGioChieu).format('h:mm A')}
            </button>
        })
    }
    return (
        <section className='pb-24'>
            <TabStyle type='line' tabPosition='left' tabBarStyle={{ borderColor: 'blue' }} >
                {renderTabPane()}
            </TabStyle>
        </section>
    )
}

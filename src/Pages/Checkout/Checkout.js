import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { actBookTickets, actChooseSeat, actFetchTicketOfficeList } from '../../redux/actions/TicketManagerActions'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { TICKET } from '../../_core/Models/TICKET'
import { Collapse, Tabs, Avatar, Dropdown, Menu } from 'antd';
import { actFetchUsernameDetail } from '../../redux/actions/UserActions'
import { SET_TAB_ACTIVE } from '../../redux/constants/TicketManagerConstant'
import moment from 'moment'
import Notification from '../../Components/Notification/Notification'
import { STATUS, TOKEN, USER_LOGIN } from '../../util/settings/config'
import { connection } from '../..'
import User from '../../Components/User/User'
const { TabPane } = Tabs;
const { Panel } = Collapse;
const Tab = styled(Tabs)`
  .ant-tabs-nav{
    background-color:#475569;
    margin:0;
    box-shadow: 0 10px 15px -3px rgb(15 23 42 /0.1), 0 4px 6px -4px rgb(15 23 42 /0.1);
    &::before{
      border:none;
    }
    .ant-tabs-nav-wrap{
      .ant-tabs-nav-list{
        width:100%;
        padding:0 10px;
        .ant-tabs-tab:nth-of-type(3){
          flex-grow:1;
          cursor:default;
          .ant-tabs-tab-btn{
            margin-left:auto
          }
        }
        .ant-tabs-tab-active{
          .ant-tabs-tab-btn{
            h1{
              color:#f59e0b
            }
          }
         
        }
        .ant-tabs-ink-bar{
          background:#f59e0b
        }
      }
    }
  }
`
const Screen = styled.div`
  position:relative;
  &::after{
    content:'';
    position:absolute;
    top:100%;
    height: 20vw;
    clip-path: polygon(5% 0, 95% 0, 100% 20%, 0% 20%);
    background: linear-gradient(180deg, #cbd5e1, transparent 20%);
    width:100%;
  }

  }

`
const CollapseTicket = styled(Collapse)`
    background-color:#475569;
    border-color:#94a3b8;
    .ant-collapse-item{
      border-color:#94a3b8;
      .ant-collapse-header{
        span{
          color:white
        }
      }
      .ant-collapse-content{
        background-color:transparent;
      }
    }
`
function Checkout() {
  const dispatch = useDispatch();
  const { filmCalendarId } = useParams();
  useEffect(() => {
    dispatch({ type: SET_TAB_ACTIVE, tabIndex: '1' })
    dispatch(actFetchTicketOfficeList(filmCalendarId))
    //lấy danh sách ghế khách khác đang đặt(real time)
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      console.log(dsGheKhachDat)
    })
  }, [])
  const { ticketOfficeDetail, listOfSeatsCurrently, listOfOtherCustomersSeat } = useSelector(state => state.TicketManagerReducer);
  const { userInfor } = useSelector(state => state.UserReducer);
  return (
    <section className='h-full'>
      <div className='grid grid-cols-4'>
        <SeatRegion filmCalendarId={filmCalendarId} ticketOfficeDetail={ticketOfficeDetail} listOfSeatsCurrently={listOfSeatsCurrently} userInfor={userInfor} listOfOtherCustomersSeat={listOfOtherCustomersSeat} />
        <Payment userInfor={userInfor} ticketOfficeDetail={ticketOfficeDetail} listOfSeatsCurrently={listOfSeatsCurrently} />
      </div>
    </section>
  )
}
function SeatRegion(props) {
  const dispatch = useDispatch();
  const { ticketOfficeDetail, listOfSeatsCurrently, userInfor, listOfOtherCustomersSeat, filmCalendarId } = props
  const { danhSachGhe, thongTinPhim } = ticketOfficeDetail;
  const { tenCumRap, diaChi } = thongTinPhim;
  const { taiKhoan } = userInfor;
  const renderSeatList = () => {
    return danhSachGhe?.map((seat, index) => {
      const { tenGhe, maGhe, loaiGhe, daDat, taiKhoanNguoiDat } = seat;
      let allow = daDat;
      let seatBackground = loaiGhe === 'Vip' ? 'bg-red-600 shadow-red-700' : 'bg-lime-600 shadow-lime-700';
      let seatName = tenGhe;
      let cursorStyle = 'cursor-pointer';
      let customersSeat = listOfOtherCustomersSeat.findIndex(seat => seat.maGhe === maGhe);
      if (listOfSeatsCurrently.findIndex(seatCurrent => seatCurrent.maGhe === maGhe) != -1) {
        seatBackground = 'bg-amber-600 shadow-amber-900'
      }
      if (daDat) {
        seatName = <i class="fa fa-times"></i>;
        cursorStyle = 'cursor-not-allowed';
        if (taiKhoan === taiKhoanNguoiDat) {
          seatBackground = 'bg-slate-600 shadow-slate-700';
          seatName = <i class="fa fa-user-check"></i>
        }
      }
      if (customersSeat !== -1) {
        allow = true;
        seatBackground = 'bg-violet-700 shadow-violet-900'

      }
      return <button key={index} className={`text-white ${seatBackground} ${cursorStyle} text-center rounded w-full h-8 shadow`} disabled={allow} onClick={() => { handleOnclick(seat) }}>{seatName}</button>
    })
  }
  const handleOnclick = (seat) => {
    dispatch(actChooseSeat(seat))
  }
  return (
    <div className='col-span-3 w-4/5 mx-auto '>
      <div className='flex items-center my-4'>
        <img className='w-10 h-10 rounded-circle border-2 border-white border-solid' src='https://picsum.photos/200' />
        <div className='ml-3'>
          <h4 className='text-white m-0'>{tenCumRap}</h4>
          <p className='text-gray-400 m-0 text-xs'>{diaChi}</p>
        </div>
      </div>
      <Screen className='screen  h-2 bg-amber-500'>
        <h2 className='text-white absolute w-full text-center top-7'>Màn hình</h2>
      </Screen>
      <div className='grid grid-cols-16 gap-3 mt-16'>
        {renderSeatList()}
      </div>
      <div className='note mt-5'>
        <div className='flex items-center justify-center'>
          <div className='text-center'>
            <button className='bg-amber-600 w-4 h-4 rounded cursor-default'></button>
            <p className='text-gray-500'>Ghế đang chọn</p>
          </div>
          <div className='text-center mx-5'>
            <button className='bg-lime-600 w-4 h-4 rounded cursor-default'></button>
            <p className='text-gray-500'>Ghế Thường</p>
          </div>
          <div className='text-center'>
            <button className='bg-red-600 w-4 h-4 rounded cursor-default'></button>
            <p className='text-gray-500'>Ghế Vip</p>
          </div>
          <div className='text-center ml-5'>
            <button className='bg-violet-700 w-4 h-4 rounded cursor-default'></button>
            <p className='text-gray-500'>Ghế người khác đang chọn</p>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <div className='text-center ml-5'>
            <button className='text-white text-base w-4 h-4 rounded cursor-default'><i class="fa fa-times"></i></button>
            <p className='text-gray-500'>Ghế đã có người đặt</p>
          </div>
          <div className='text-center ml-5'>
            <button className='text-white text-base w-4 h-4 rounded cursor-default'><i class="fa fa-user-check"></i></button>
            <p className='text-gray-500'>Ghế bạn đã đặt</p>
          </div>
        </div>
      </div>
    </div>
  )
}
function Payment(props) {
  const dispatch = useDispatch();
  const { userInfor, ticketOfficeDetail, listOfSeatsCurrently } = props;
  const { thongTinPhim } = ticketOfficeDetail;
  const { maLichChieu, tenPhim, tenCumRap, tenRap, ngayChieu, gioChieu } = thongTinPhim;
  const { email, soDT } = userInfor;
  const renderListOfSeatsCurrently = () => {
    return _.sortBy(listOfSeatsCurrently, ['stt']).map((seat, index) => {
      const { tenGhe, loaiGhe } = seat;
      let background = loaiGhe === 'Vip' ? 'bg-red-600' : 'bg-lime-600'
      return <span key={index} className={`text-white cursor-pointer inline-block text-xs text-center rounded mr-2 w-5 h-5 leading-5 ${background}`} onClick={() => { handleOnclick(seat) }}>{tenGhe}</span>
    })
  }
  const totalMoney = () => {
    return listOfSeatsCurrently.reduce((total, seat) => {
      return total += seat.giaVe
    }, 0)
  }
  const handleBookTickets = () => {
    if (listOfSeatsCurrently.length == 0) {
      Notification(STATUS.WARNING, 'Vui lòng chọn chỗ ngồi!');
      return
    }
    dispatch(actBookTickets(new TICKET(maLichChieu, listOfSeatsCurrently), maLichChieu))
  }
  const handleOnclick = (seat) => {
    dispatch(actChooseSeat(seat))
  }
  return (
    <div className='relative shadow-lg bg-slate-800 shadow-slate-900'>
      <div className='p-6'>
        <div className=' border-b border-slate-700' >
          <h1 className='text-white text-4xl text-center'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalMoney())}</h1>
        </div>
        <div className='py-2 border-b border-slate-700 text-white'>
          <h2 className='text-white'>{tenPhim}</h2>
          <p className=' m-0'>{tenCumRap}</p>
          <p>{ngayChieu}-{gioChieu}-{tenRap}</p>
        </div>
        <div className='text-white border-b border-slate-700 py-2'>
          <div className='flex justify-between items-center '>
            <h3 className='text-red-500 m-0'>Ghế</h3>
            <p className='text-lime-600 font-bold m-0'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalMoney())}</p>
          </div>
          <div >{renderListOfSeatsCurrently()}</div>
        </div>
        <div className='text-white border-b border-slate-700 pt-2'>
          <h3 className='text-slate-500 m-0'>E-mail</h3>
          <p>{email}</p>
        </div>
        <div className='text-white border-b border-slate-700 pt-2'>
          <h3 className='text-slate-500 m-0'>Phone</h3>
          <p>{soDT}</p>
        </div>
      </div>
      <div className='text-center text-white absolute bottom-0 w-full'>
        <p className='text-xs'><i class="fa fa-exclamation-circle text-red-600"></i>  Vé đã mua không thể đổi hoặc hoàn tiền <br />
          Mã vé sẽ được gửi qua <span className='text-amber-400'>ZMS</span>(tin nhắn zalo) và <br /> <span className='text-amber-400'>Email</span> đã nhập</p>
        <button className='bg-amber-500 font-bold text-white w-full py-3' onClick={handleBookTickets}>Đặt Vé</button>
      </div>
    </div>
  )
}
function HistoryBookTickets(props) {
  const dispatch = useDispatch();
  const { usernameDetail } = useSelector(state => state.UserReducer);
  const { thongTinDatVe } = usernameDetail;
  const history=useHistory()
  useEffect(() => {
    dispatch(actFetchUsernameDetail())
  }, [])
  const renderDateList = () => {
    const arrFilmDatetime = [];
    for (let i = 0; i < thongTinDatVe.length; i++) {
      if (arrFilmDatetime.length == 0) {
        arrFilmDatetime.push(moment(thongTinDatVe[i].ngayDat).format('L'))
      } else {
        if (arrFilmDatetime.findIndex(date => date == moment(thongTinDatVe[i].ngayDat).format('L')) == -1) {
          arrFilmDatetime.push(moment(thongTinDatVe[i].ngayDat).format('L'))
        }

      }
    }
    return arrFilmDatetime.map((date, index) => {
      return <Panel header={<h2 className='m-0 text-white'>{date}</h2>} key={index + 1}>
        {renderTicketInfor(date)}
      </Panel>
    })
  }
  const renderTicketInfor = (date) => {
    return thongTinDatVe.map(({ hinhAnh, tenPhim, danhSachGhe, ngayDat }, index) => {
      if (moment(ngayDat).format('L') == date) {
        return <div key={index} className='mb-5'>
          <div className='flex items-center mb-3 '>
            <img className='w-10 h-10 rounded mr-3' src={hinhAnh} alt={tenPhim} />
            <h2 className='text-white text-xl'>{tenPhim}</h2>
          </div>
          <div className='grid grid-cols-3 gap-3'>
            {renderSeat(danhSachGhe)}
          </div>
        </div>
      }
    })
  }
  const renderSeat = (danhSachGhe) => {
    return danhSachGhe.map(({ tenCumRap, tenHeThongRap, tenGhe }, index) => {
      return <div key={index} className="flex justify-center">
        <div className="block p-6 rounded-lg shadow-lg bg-slate-800 shadow-slate-900 w-full">
          <h6 className="text-white text-lg leading-tight font-medium mb-2">{tenHeThongRap}</h6>
          <span className="text-white font-semibold">
            {tenCumRap}-
          </span>
          <span className="text-white font-semibold">
            Ghế {tenGhe}
          </span>
        </div>
      </div>

    })
  }
  return (
    <div className='w-9/12 mx-auto h-screen mt-24'>
      <h1 className='text-center text-white text-2xl'>Lịch Sử Đặt Vé</h1>
      <CollapseTicket className='h-4/5 overflow-auto'>
        {renderDateList()}
      </CollapseTicket>
      <div className='text-center'>
      <button className='text-white px-4 py-1 text-base bg-slate-600 rounded shadow-lg shadow-slate-900 mt-4 ' onClick={()=>{history.push('/home')}}>Quay lại trang chủ</button>
      </div>
    </div>
  )
}


export default function CheckoutPages(props) {
  const [tabIndex, setTabIndex] = useState('2');
  const [logOut, setLogout] = useState(false);
  const { tabActive } = useSelector(state => state.TicketManagerReducer);
  useEffect(() => {
    setTabIndex(tabActive)
  }, [tabActive])
  return (
    <Tab activeKey={tabIndex} centered >
      <TabPane tab={<h1 className='m-0 text-white' >01 CHỌN GHẾ & THANH TOÁN</h1>} key="1">
        <Checkout {...props} />
      </TabPane>
      <TabPane tab={<h1 className='m-0 text-white' >02 KẾT QUẢ ĐẶT VÉ</h1>} key="2">
        <HistoryBookTickets {...props} />
      </TabPane>
      <TabPane tab={<User/>} key='3'></TabPane>
    </Tab>
  )
}
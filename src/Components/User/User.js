import React from 'react'
import { Avatar, Tooltip } from 'antd'
import { NavLink } from 'react-router-dom';
import { TOKEN, USER_LOGIN } from '../../util/settings/config';
import { useDispatch, useSelector } from 'react-redux';
import { actHideDrawer } from '../../redux/actions/DrawerActions';
export default function User(props) {
  const dispatch=useDispatch()
  const { userInfor } = useSelector(state => state.UserReducer);
  const { size } = props;
  const handleCloseDrawer=()=>{
    dispatch(actHideDrawer())
  }
  const title = <ul className='py-3 mb-0'>
    <li className='mb-2'><NavLink to='/Profile' className=' text-gray-600 hover:text-white p-2 hover:bg-gray-600 font-semibold'onClick={handleCloseDrawer}><i class="fa fa-address-card" ></i> Thông tin tài khoản</NavLink></li>
    <li ><button className='p-2 w-full hover:bg-gray-600 font-semibold text-gray-600 hover:text-white' onClick={() => { window.location.reload(); localStorage.removeItem(USER_LOGIN); localStorage.removeItem(TOKEN);handleCloseDrawer() }}><i class="fa fa-door-closed"></i> Đăng xuất</button></li>
  </ul>
  if (size == 'big') {
    return <>
      <div className='p-4 border-b border-b-gray-600'>
        <Tooltip overlayInnerStyle={{ padding: '6px 0' }} color='#1f2937' arrowPointAtCenter={true} placement="bottom" title={title} trigger='hover'>
          <img className=' cursor-pointer w-28 h-28 rounded-circle mx-auto ' src='https://picsum.photos/200' />
        </Tooltip>
        <p className='text-white text-center font-semibold mt-3'>{userInfor.hoTen}</p>
      </div>
    </>
  }
  return (
    <>
      <Tooltip overlayInnerStyle={{ padding: '6px 0' }} color='#1f2937' arrowPointAtCenter={true} placement="bottom" title={title} trigger='hover'>
        <div className='text-white cursor-pointer '
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <Avatar className='border' src='https://picsum.photos/200'></Avatar>
          <span className='inline-block ml-1'><i class="fa fa-caret-down"></i></span>
        </div>
      </Tooltip>


    </>
  )
}

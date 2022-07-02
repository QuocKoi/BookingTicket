import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { USER_LOGIN } from '../../../../util/settings/config'
import { useTranslation } from 'react-i18next';
import User from '../../../../Components/User/User'
import { useDispatch } from 'react-redux';
import { actDisplayDrawer, actHideDrawer } from '../../../../redux/actions/DrawerActions';
const NavLinkStyled = styled(NavLink)`
    position: relative;
    &::after{
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0%;
        background: #fbbf24;
        height: 2px;
        transition:all .3s
    }
    &:hover::after{
        width: 100%;
    }
    &:focus::after{
        width: 100%;
    }
`
export default function Header() {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    const handleScroll = (event) => {
        if (window.pageYOffset > 200) {
            setScroll(true)
        }
        if (window.pageYOffset < 200) {
            setScroll(false)
        }
    }
    const renderUserRegion = () => {
        if (localStorage.getItem(USER_LOGIN)) {
            return <div className='hidden md:block'><User /></div>
        } else {
            return <div className="text-white hidden md:block">
                <NavLink to='/login' activeClassName='text-amber-400' className='text-white text-sm font-semibold hover:text-amber-400'>Đăng Nhập</NavLink>
                <span className='mx-2'>/</span>
                <NavLink to='/register' activeClassName='text-amber-400' className='text-white text-sm font-semibold hover:text-amber-400'>Đăng Ký</NavLink>
            </div>
        }
    }

    return (
        <header className="text-gray-600 body-font ">
            <div className={`flex flex-wrap justify-between md:flex-row items-center fixed w-full z-50 shadow-md transition-all duration-300 px-14 ${scroll ? 'bg-gray-800 shadow-gray-900 py-3' : 'bg-black/50 py-5'}`} >
                <NavLink to='/' className="flex title-font font-medium items-center text-gray-900 mb-0">
                    <img src='https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png' className='w-7/10' alt='cyberLearn' />
                </NavLink>
                <nav className="hidden md:block md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <NavLinkStyled to='/home' activeClassName=' text-amber-400' className="mr-5  cursor-pointer text-white  transition-all duration-200 hover:text-amber-400 font-medium ">{t('Trang Chủ')}</NavLinkStyled>
                    <NavLinkStyled to='/contact' activeClassName=' text-amber-400' className="mr-5  cursor-pointer text-white transition-all duration-200 hover:text-amber-400 font-medium">{t('Liên Hệ')}</NavLinkStyled>
                    <NavLinkStyled to='/news' activeClassName=' text-amber-400' className="mr-5  cursor-pointer text-white transition-all duration-200 hover:text-amber-400 font-medium">{t('Tin Tức')}</NavLinkStyled>
                </nav>
                {renderUserRegion()}
                <div className='block md:hidden text-white text-base cursor-pointer' onClick={() => {
                    dispatch(actDisplayDrawer(<Navbar />, <NavLink to='/' onClick={()=>{dispatch(actHideDrawer())}}>
                        <img src='https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png' className='w-1/3' alt='cyberLearn' />
                    </NavLink>));
                }}><i class="fa fa-align-justify"></i></div>
            </div>
        </header>

    )
}
function Navbar() {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const handleClick=()=>{
        dispatch(actHideDrawer())
    }
    if (localStorage.getItem(USER_LOGIN)) {
        return <>
            <User size='big' />
            <nav className='flex flex-col'>
                <NavLinkStyled to='/home' activeClassName=' text-amber-400' className="mb-2 p-3 text-center  cursor-pointer text-white  transition-all duration-200 hover:text-amber-400 font-medium " onClick={handleClick}>{t('Trang Chủ')}</NavLinkStyled>
                <NavLinkStyled to='/contact' activeClassName=' text-amber-400' className="mb-2 p-3 text-center  cursor-pointer text-white transition-all duration-200 hover:text-amber-400 font-medium" onClick={handleClick}>{t('Liên Hệ')}</NavLinkStyled>
                <NavLinkStyled to='/news' activeClassName=' text-amber-400' className="mb-2 p-3 text-center  cursor-pointer text-white transition-all duration-200 hover:text-amber-400 font-medium" onClick={handleClick}>{t('Tin Tức')}</NavLinkStyled>
            </nav>
        </>
    }
    return <>
        <nav className='flex flex-col'>
            <NavLinkStyled to='/home' activeClassName=' text-amber-400' className="mb-2 p-3 text-center  cursor-pointer text-white  transition-all duration-200 hover:text-amber-400 font-medium " onClick={handleClick}>{t('Trang Chủ')}</NavLinkStyled>
            <NavLinkStyled to='/contact' activeClassName=' text-amber-400' className="mb-2 p-3 text-center  cursor-pointer text-white transition-all duration-200 hover:text-amber-400 font-medium" onClick={handleClick}>{t('Liên Hệ')}</NavLinkStyled>
            <NavLinkStyled to='/news' activeClassName=' text-amber-400' className="mb-2 p-3 text-center  cursor-pointer text-white transition-all duration-200 hover:text-amber-400 font-medium" onClick={handleClick}>{t('Tin Tức')}</NavLinkStyled>
            <NavLinkStyled to='/login' activeClassName=' text-amber-400' className="mb-2 p-3 text-center  cursor-pointer text-white transition-all duration-200 hover:text-amber-400 font-medium" onClick={handleClick}>{t('Đăng nhập')}</NavLinkStyled>
            <NavLinkStyled to='/register' activeClassName=' text-amber-400' className="mb-2 p-3 text-center  cursor-pointer text-white transition-all duration-200 hover:text-amber-400 font-medium" onClick={handleClick}>{t('Đăng ký')}</NavLinkStyled>
        </nav>
    </>
}
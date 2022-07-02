import React, { useState } from 'react'
import { NavLink, Redirect, Route, useHistory } from 'react-router-dom'
import {  MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraAddOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import User from '../../Components/User/User';
import { useSelector } from 'react-redux';
import { STATUS, USER_LOGIN } from '../../util/settings/config';
import Notification from '../../Components/Notification/Notification';
const { Header, Sider, Content } = Layout;
const NewSider = styled(Sider)`
    background:#334155;
    box-shadow: 0 10px 15px -3px rgb(15 23 42 /10%), 0 4px 6px -4px rgb(15 23 42 /10%); 
    .ant-layout-sider-children{
        .logo{
            height:60px
        }
        .ant-menu-dark{
            background:#334155;
            &:not(.ant-menu-horizontal){
                .ant-menu-item-selected {
                    background-color:#ea580c
                }
            }
            .ant-menu-sub{
                background:#334155;
            }
        }

    }
    &.ant-layout-sider-collapsed{
        .ant-layout-sider-children{
            .logo{
                display:flex;
                align-items:center
            }
        }
    }
`
const NewLayout = styled(Layout)`
    background:#001529;
    header{
        background:#1e293b;
    }
`
export default function AdminTemplate(props) {
    const history = useHistory();
    const [collapsed, setCollapsed] = useState(false);
    const { userInfor } = useSelector(state => state.UserReducer)
    const { Component, ...rest } = props
    const handleClick = ({ key }) => {
        if (key == 1) {
            history.push('/admin/users')
        }
        if (key == 2) {
            history.push('/admin/films')
        }
        if (key == 3) {
            history.push('/admin/films/addnews')
        }
    }
    if (localStorage.getItem(USER_LOGIN)) {
        if (userInfor.maLoaiNguoiDung === 'KhachHang') {
            Notification(STATUS.ERROR, 'Bạn không có quyền truy cập!');
            return <Redirect to='/'></Redirect>
        }
    } else {
        return <Redirect to='/login'></Redirect>
    }
    return (
        <Route {...rest} render={(routeProps) => {
            return <Layout>
                <NewSider trigger={null} collapsible collapsed={collapsed} className='shadow shadow-slate-900'>
                    <div className="logo">
                        <NavLink to='/'>
                            <img src='https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png' alt='cyberLearn' />
                        </NavLink>
                    </div>
                    <Menu
                        onClick={handleClick}
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                label: 'Người Dùng',
                                icon: <UserOutlined />
                            },
                            {
                                label: 'Phim',
                                icon: <VideoCameraOutlined />,
                                children: [
                                    {
                                        key: '2',
                                        label: 'Phim',
                                        icon: <VideoCameraOutlined />,
                                    },
                                    {
                                        key: '3',
                                        label: 'Thêm Phim',
                                        icon: <VideoCameraAddOutlined />,
                                    },
                                ]

                            },
                       
                        ]}
                    />
                </NewSider>
                <NewLayout className="site-layout ">
                    <Header
                        className="site-layout-background flex items-center justify-between text-white px-3 shadow-lg shadow-slate-900 "
                    >
                        <span className='text-white'>{collapsed ? <MenuUnfoldOutlined className='text-2xl' onClick={() => { setCollapsed(!collapsed) }} /> : <MenuFoldOutlined className='text-2xl' onClick={() => { setCollapsed(!collapsed) }} />}</span>
                        <User />
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Component {...routeProps} />
                    </Content>
                </NewLayout>
            </Layout>


        }}></Route>
    )
}

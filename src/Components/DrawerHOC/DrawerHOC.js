import React from 'react'
import { Drawer } from 'antd';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { actHideDrawer } from '../../redux/actions/DrawerActions';
const NewDrawer = styled(Drawer)`
    .ant-drawer-content-wrapper{
        .ant-drawer-content{
            .ant-drawer-wrapper-body{
                .ant-drawer-header{
                    .ant-drawer-header-title{
                        flex-direction: row-reverse;
                        .ant-drawer-close{
                            color:white;
                            font-weight:600
                        }
                    }
                }
            }
        }
    }
`
export default function DrawerHOC() {
    const dispatch=useDispatch();
    const {visible,Component,title}=useSelector(state=>state.DrawerReducer);
    const handleClose=()=>{
       dispatch(actHideDrawer()) 
    }
    return (
        <NewDrawer title={title} placement="right" onClose={handleClose} visible={visible} bodyStyle={{ background: '#1f2937' }} headerStyle={{ background: '#1f2937' }}>
            {Component}
        </NewDrawer>
    )
}


import React from 'react'
import { useSelector } from 'react-redux'
export default function Loading() {
  const {visible}=useSelector(state=>state.LoadingReducer);
  return (
    <div className={`${visible?'flex':'hidden'} justify-center items-center fixed w-screen h-screen z-100 bg-white`}>
        <img src={require('../../assets/loading.gif')}/>
    </div>
  )
}

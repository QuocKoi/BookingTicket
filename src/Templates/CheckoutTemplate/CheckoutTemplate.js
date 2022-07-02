import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom';
import { USER_LOGIN } from '../../util/settings/config';

export default function CheckoutTemplate(props) {
  const { Component, ...rest } = props;
  useEffect(()=>{
    window.scrollTo(0,0)
})
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to='/login'></Redirect>
  }
  return (
    <Route {...rest} render={(propsRoute) => {
      return <div className='bg-slate-900 '>
        <Component {...propsRoute} />
        </div>
    }}></Route>
  )
}

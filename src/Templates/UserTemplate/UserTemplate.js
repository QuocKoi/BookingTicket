import React, { useEffect } from 'react'
import { Route } from 'react-router-dom';
import styled from 'styled-components'
const Div =styled.div`
  width:100vw;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
`
export default function UserTemplate(props) {
    const {Component,...rest}=props;
    useEffect(()=>{
      window.scrollTo(0,0)
  })
  return (
   <Route {...rest} render={(propsRoute)=>{
       return <Div style={{backgroundImage:`url(${require('../../assets/cinema3_08.jpg')})`}}>
            <Component {...propsRoute}/>
       </Div>
   }}></Route>
  )
}

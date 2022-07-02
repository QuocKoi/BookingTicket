import {useEffect}from 'react'
import {Route} from 'react-router-dom'
import Footer from './Layout/Footer/Footer';
import Header from './Layout/Header/Header';
const HomeTemplate=(props)=>{
    useEffect(()=>{
        window.scrollTo(0,0)
    })
    const {Component,...rest}=props;
    return <Route {...rest} render={(propsRoute)=>{
        return <div style={{background:'#001529'}}>
        <Header/>
        <Component {...propsRoute}/>
        <Footer/>
        </div>
    }}></Route>
}
export default HomeTemplate
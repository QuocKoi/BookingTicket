import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { withFormik } from 'formik';
import { connect } from 'react-redux'
import { actLogin } from '../../redux/actions/UserActions';
import 'animate.css';
const Div = styled.div`
  color:#fff;
  background-color:rgba(255,255,255,0.07);
  width:430px;
  height:520px;
  border-radius:10px;
  border:2px solid rgba(255,255,255,0.1);
  box-shadow: 0 0 40px rgba(8,7,16,0.6);
  backdrop-filter: blur( 10px );

`
const FormGroup = styled.div`
  background:transparent;
  position:relative;
  border:none;
  i{
    position:absolute;
    top: 50%;
    left: 5%;
    transform: translateY(-50%);
    font-size: 1rem;
    z-index:2
  }
  .fa-eye-slash,.fa-eye{
    right:5%;
    left:unset;
    cursor:pointer
  }

`
const Input = styled.input`
  background:transparent;
  border:none;
  padding:1em;
  padding-left:3em;
  width:100%;
  outline:none;
  color:#fff;
  border-left:1px solid rgba(255,255,255,.3);
  border-top:1px solid rgba(255,255,255,.3);
  backdrop-filter: blur( 5px );
  box-shadow:4px 4px 60px rgba(0,0,0,.2);
  text-shadow:2px 2px 4px rgba(0,0,0,.2);
  transition:all .2s;
  &:hover,&:focus{
    background:rgba(255,255,255,0.1);
    box-shadow:4px 4px 60px 8px rgba(0,0,0,.2);
  }
  &::placeholder{
    color:#fff
  }
  &[type='submit']{
    padding-left:0;
    cursor:pointer
  }
  &.password{
    padding-left:3em;
    padding-right:3em;
  }

`
function Login(props) {
  const [displayPassword,setDisplayPassword]=useState(false)
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  const handleClickDisplayPassword=()=>{
    setDisplayPassword(!displayPassword)
  }
  return (
    <Div className='py-14 px-9 '>
      <h1 className='text-white text-2xl font-medium'>Chào Mừng Trở Lại!</h1>
      <p className='text-base font-light text-gray-300'>Đăng nhập với tài khoản của bạn.</p>
      <form className='mt-10' onSubmit={handleSubmit}>
        <div className='mb-2 '>
          <FormGroup>
            <i class="fa fa-user"></i>
            <Input className='font-medium rounded-3xl' type='text' placeholder='Tài Khoản' name='userName'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.userName}>
            </Input>
          </FormGroup>
          <span className='text-yellow-400 pl-4 font-semibold '>{errors.userName}</span>
        </div>
        <div className='mb-2 '>
          <FormGroup>
            <i class="fa fa-lock"></i>
            <Input className='password font-medium rounded-3xl' type={displayPassword?'text':'password'} placeholder='Mật Khẩu' name='password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}>
            </Input>
            {displayPassword?<i class="fa fa-eye" onClick={handleClickDisplayPassword}></i>:<i class="fa fa-eye-slash" onClick={handleClickDisplayPassword}></i>}
          </FormGroup>
          <span className='text-yellow-400 pl-4 font-semibold'>{errors.password}</span>
        </div>
        <Input type='submit' className='font-medium rounded-3xl mt-8 pl-0' value='Đăng Nhập' />
      </form>
      <p className='text-center mt-5 mb-0 text-base'>Chưa có tài khoản ? <NavLink className='text-amber-500' to='/register'>Đăng ký</NavLink></p>
    </Div>
  )
}
const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({ userName: '', password: '' }),

  // Custom sync validation
  validate: (values) => {
    const errors = {};
    const { userName, password } = values
    if (userName.trim() === '') {
      errors.userName = `Tài khoản không được để trống!`
    }
    if (password.trim() === '') {
      errors.password = `Mật khẩu không được để trống!`
    } else if (password.trim().length < 6) {
      errors.password = `Tối thiểu 6 ký tự!`
    }
    return errors;
  },

  handleSubmit: (values, { props }) => {
    const { handleLogin } = props;
    handleLogin({
      taiKhoan: values.userName,
      matKhau: values.password
    })
  },
  displayName: 'BasicForm',

})(Login);
const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (userData) => {
      dispatch(actLogin(userData))
    }
  }
}
export default connect(null, mapDispatchToProps)(MyEnhancedForm)

import React from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik';
import { connect } from 'react-redux'
import {actRegister } from '../../redux/actions/UserActions';
import 'animate.css';
import { REGISTER } from '../../_core/Models/REGISTER';
import { NavLink } from 'react-router-dom';
const Div = styled.div`
  color:#fff;
  background-color:rgba(255,255,255,0.07);
  width:430px;
  height:550px;
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

`
function Register(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  return (
    <Div className='py-10 px-6'>
      <h1 className='text-white text-2xl font-medium'>Đăng Ký Tài Khoản!</h1>
      <form className='mt-7' onSubmit={handleSubmit}>
      <div className='flex items-center'>
          <div className='mb-2 mr-2 '>
            <FormGroup>
              <i class="fa fa-envelope"></i>
              <Input className='font-medium rounded-3xl' type='text' placeholder='First Name' name='firstName'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}>
              </Input>
            </FormGroup>
            <span className='text-yellow-400 pl-4 font-semibold'>{errors.firstName}</span>
          </div>
          <div className='mb-2 '>
            <FormGroup>
            <i class="fa fa-mobile"></i>
              <Input className='font-medium rounded-3xl' type='text' placeholder='Phone number' name='phone'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}>
              </Input>
            </FormGroup>
            <span className='text-yellow-400 pl-4 font-semibold'>{errors.phone}</span>
          </div>
        </div>
        <div className='mb-2'>
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
        <div className='mb-2'>
          <FormGroup>
            <i class="fa fa-lock"></i>
            <Input className='font-medium rounded-3xl' type='password' placeholder='Mật Khẩu' name='password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}>
            </Input>
          </FormGroup>
          <span className='text-yellow-400 pl-4 font-semibold'>{errors.password}</span>
        </div>
        <div className='mb-2'>
          <FormGroup>
            <i class="fa fa-envelope"></i>
            <Input className='font-medium rounded-3xl' type='email' placeholder='Email' name='email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}>
            </Input>
          </FormGroup>
          <span className='text-yellow-400 pl-4 font-semibold'>{errors.email}</span>
        </div>
        <Input type='submit' className='font-medium rounded-3xl mt-3 pl-0' value='Đăng Ký' />
      </form>
      <p className='text-center mt-5 mb-0 text-base'>Đã có tài khoản và mật khẩu ? <NavLink className='text-amber-500' to='/login'>Đăng nhập</NavLink></p>
    </Div>
  )
}
const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({ firstName:'',phone:'',userName: '', password: '',email:'' }),

  // Custom sync validation
  validate: (values) => {
    const errors = {};
    const { userName, password,firstName,phone,email } = values
    if (userName.trim() === '') {
      errors.userName = `Tài khoản không được để trống!`
    }
    if (password.trim() === '') {
      errors.password = `Mật khẩu không được để trống!`
    } else if (password.trim().length < 6) {
      errors.password = `Tối thiểu 6 ký tự!`
    }
    if(firstName.trim()===''){
      errors.firstName=`không được để trống!`
    }
    if(phone.trim()===''){
      errors.phone=`không được để trống!` 
    }else{
      const phoneRegex=/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
      if(!phoneRegex.test(phone)){
        errors.phone=`Không hợp lệ!`
      }
    }
    if(email.trim()===''){
      errors.email=`Email không được để trống!`
    }else{
      const emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!emailRegex.test(email)){
        errors.email='Email không hợp lệ!'
      }
    }
    return errors;
  },

  handleSubmit: (values, { props }) => {
    const { handleRegister } = props;
    const {userName,password,email,firstName,phone}=values;
    const account=new REGISTER();
    account.setValues(userName,password,email,phone,firstName)
    handleRegister(account)
  },
  displayName: 'BasicForm',

})(Register);
const mapDispatchToProps = (dispatch) => {
  return {
    handleRegister: (account) => {
      dispatch(actRegister(account))
    }
  }
}
export default connect(null, mapDispatchToProps)(MyEnhancedForm)

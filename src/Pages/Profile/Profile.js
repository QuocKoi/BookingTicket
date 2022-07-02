import React from 'react'
import { Redirect } from 'react-router-dom'
import { TOKEN } from '../../util/settings/config'
import styled from 'styled-components'
import { useState } from 'react'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip } from 'antd'
import { actFetchUsernameDetail, actUpdatePersonalInfor} from '../../redux/actions/UserActions'
import * as Yup from 'yup'
import { WarningOutlined } from '@ant-design/icons'
const ButtonMorphism = styled.button`
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 1px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );

`
const Group = styled.div`
  position:relative;
  label{
    position:absolute;
    top:40%;
    left:6%;
    transform:translateY(-50%);
    font-size:18px;
    transition:all .3s;
    display:flex;
    align-items:center;
    .icon-warning{
      margin-left:10px;
      color:red
    }
  }
  input{
    outline:none;
    display:block;
    border-radius:4px;
    background:transparent;
    padding:13px 15px;
    border:1px solid #374151;
    width:100%;
    &.InputMorphism,&.InputMorphism:valid{
      background: rgba( 255, 255, 255, 0.25 );
      box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
      backdrop-filter: blur( 1px );
      border-radius: 10px;
      border-color:rgba( 255, 255, 255, 0.18 );
      outline:none;
      padding:10px 0;
      text-align:center;
      & + .icon-warning{
        position:absolute;
        top:50%;
        right:4%;
        transform:translateY(-50%);
        cursor:pointer;
        color:yellow
      }  
      &:disabled{
        background: transparent;
        box-shadow:none;
        backdrop-filter: none;
        border: none;

      }
    }
    &.error,&.error:valid{
      border-color:red
    }
    &:focus + label,&:valid + label{
      top:0%;
      left:3%;
      color:#ea580c;
      font-weight:600;
      font-size:14px;
      background:#111827;
      padding:0 5px;
    }
    &:focus,&:valid{
      border-color:#ea580c;
      border-width:2px;
    }
    &.password{
      padding-right:25px;
      & ~ i{
        position:absolute;
        top:50%;
        right:4%;
        transform:translateY(-50%);
        cursor:pointer
      }
    }
    &:disabled{
      padding-left:0;
      border:none;
      & + label{
        top:0%;
        left:0;
        font-size:17px
      }
  
    }
  }
 

 
`
const UpdateSchema = Yup.object().shape({
  taiKhoan: Yup.string().trim('Không được để trống').
    required('Không được để trống!'),
  matKhau: Yup.string().trim('Không được để trống').
    required('Không được để trống!').
    min(6, 'Tối thiểu 6 ký tự!'),
  email: Yup.string().
    required('Không được để trống!').
    matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Không hợp lệ!'),
  maLoaiNguoiDung: Yup.string().
    required('Không được để trống!'),
  soDt: Yup.string().
    required('không được để trống!').
    matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Không hợp lệ!').nullable(),
  hoTen: Yup.string().trim('Không được để trống').
    required('Không được để trống!').nullable(),
})
export default function Profile() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState({ email: true, hoTen: true, soDt: true, taiKhoan: true, matKhau: true });
  const [displayPassword, setDisplayPassword] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDT: "",
      soDt: "",
      maNhom: "",
      loaiNguoiDung: "",
    },
    validationSchema: UpdateSchema,
    onSubmit: (values) => {
      console.log(values)
      dispatch(actUpdatePersonalInfor(values))
    },
  })
  useEffect(() => {
    dispatch(actFetchUsernameDetail())
  }, [])
  const { usernameDetail } = useSelector(state => state.UserReducer);
  useEffect(() => {
    formik.setValues({ ...usernameDetail, maLoaiNguoiDung: usernameDetail.loaiNguoiDung == 'Khách hàng' ? 'KhachHang' : 'QuanTri',soDt:usernameDetail.soDT })
  }, [usernameDetail])
  const { values, errors } = formik;
  const handleDisplayPassword = () => {
    setDisplayPassword(!displayPassword)
  }
  const handleVisibleTextBox = (event) => {
    const { name } = event.target;
    setVisible({ ...visible, [name]: false })
  }
  const handleChange = (e) => {
    const { value, name } = e.target;
    formik.setFieldValue(name, value)
  }
  const handleSave = (e) => {
    const { name } = e.target;
    if (errors[name]) {
      return
    } else {
      setVisible({ ...visible, [name]: true })
    }
  }
  if (!localStorage.getItem(TOKEN)) {
    return <Redirect to='/login'></Redirect>
  } else {
    return (
      <div className='h-screen flex items-center justify-center '>
        <form className='md:grid grid-cols-3 rounded-lg overflow-hidden' onSubmit={formik.handleSubmit}>
          <div className='text-white bg-gradient-to-r from-red-700 to-orange-700 py-10 p-6'>
            <div>
              <img className='w-24 h-24 rounded-circle mx-auto' src='https://picsum.photos/200' />
              <div className='mt-10 p-0'>
                <Group>
                  <input className='w-full text-base font-semibold InputMorphism' name='hoTen' autoComplete='off' disabled={visible.hoTen} type='text' value={values.hoTen} onChange={handleChange} />
                  <Tooltip  placement="top" title={errors.hoTen}><WarningOutlined className='icon-warning' style={{display:`${errors.hoTen?'block':'none'}`}} /></Tooltip>
                </Group>
                <p className='text-center'>Web Designer</p>
                <ButtonMorphism className={`py-2 w-full ${visible.hoTen ? 'block' : 'hidden'}`} type='button' name='hoTen' onClick={handleVisibleTextBox}>Chỉnh sửa</ButtonMorphism>
                <ButtonMorphism className={`py-2 w-full ${visible.hoTen ? 'hidden' : 'block'}`} type='submit' name='hoTen' onClick={handleSave}>Lưu</ButtonMorphism>
              </div>
            </div>
          </div>
          <div className='text-white col-span-2 bg-gray-900 px-10 py-4'>
            <div>
              <div className='information'>
                <h3 className='text-white text-base border-b border-gray-600 pb-2'>Thông tin</h3>
                <div className=' py-4'>
                  <div className='flex items-center justify-between mb-4'>
                    <div>
                      <Group >
                        <input className={errors.email ? 'error' : ''} type='text' autoComplete='off' name='email' disabled={visible.email} value={values.email} onChange={handleChange} />
                        <label><span>Email</span> <Tooltip  placement="top" title={errors.email}><WarningOutlined className='icon-warning' style={{display:`${errors.email?'block':'none'}`}} /></Tooltip></label>
                      </Group>
                      <p className={`text-red-600 ${visible.email ? 'hidden' : 'block'}`}>{errors.email}</p>
                    </div>
                    <button className={`text-blue-600 hover:underline ${visible.email ? 'block' : 'hidden'}`} type='button' name='email' onClick={handleVisibleTextBox}>Chỉnh sửa</button>
                    <ButtonMorphism className={`py-1 px-2 ${visible.email ? 'hidden' : 'block'}`} type='submit' name='email' onClick={handleSave}>Lưu</ButtonMorphism>
                  </div>
                  <div className='flex items-center justify-between '>
                    <div>
                      <Group>
                        <input className={errors.soDt ? 'error' : ''} type='text' name='soDt' autoComplete='off' disabled={visible.soDt} value={values.soDt} onChange={handleChange} />
                        <label><span>Số điện thoại  </span> <Tooltip  placement="top" title={errors.soDt}><WarningOutlined className='icon-warning' style={{display:`${errors.soDt?'block':'none'}`}} /></Tooltip></label>
                      </Group>
                      <p className={`text-red-600 ${visible.soDt ? 'hidden' : 'block'}`}>{errors.soDt}</p>
                    </div>
                    <button className={`text-blue-600 hover:underline ${visible.soDt ? 'block' : 'hidden'}`} type='button' name='soDt' onClick={handleVisibleTextBox}>Chỉnh sửa</button>
                    <ButtonMorphism className={`py-1 px-2 ${visible.soDt ? 'hidden' : 'block'}`} type='submit' name='soDt' onClick={handleSave}>Lưu</ButtonMorphism>
                  </div>
                </div>
              </div>
              <div className='loginInfor'>
                <h3 className='text-white text-base border-b border-gray-600 pb-2'>Thông tin đăng nhập</h3>
                <div className=' py-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <Group >
                        <input className={`password ${errors.matKhau ? 'error' : ''}`} name='matKhau' disabled={visible.matKhau} type={displayPassword ? 'text' : 'password'} value={values.matKhau} onChange={handleChange} />
                        <label><span>Mật khẩu</span> <Tooltip  placement="top" title={errors.matKhau}><WarningOutlined className='icon-warning' style={{display:`${errors.matKhau?'block':'none'}`}} /></Tooltip></label>
                        {displayPassword ? <i class={`fa fa-eye ${visible.matKhau ? 'hidden' : 'block'}`} onClick={handleDisplayPassword}></i> : <i class={`fa fa-eye-slash ${visible.matKhau ? 'hidden' : 'block'}`} onClick={handleDisplayPassword}></i>}
                      </Group>
                      <p className={`text-red-600 ${visible.matKhau ? 'hidden' : 'block'}`}>{errors.matKhau}</p>
                    </div>
                    <button className={`text-blue-600 hover:underline ${visible.matKhau ? 'block' : 'hidden'}`} type='button' name='matKhau' onClick={handleVisibleTextBox}>Chỉnh sửa</button>
                    <ButtonMorphism className={`py-1 px-2 ${visible.matKhau ? 'hidden' : 'block'}`} type='submit' name='matKhau' onClick={handleSave}>Lưu</ButtonMorphism>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }

}

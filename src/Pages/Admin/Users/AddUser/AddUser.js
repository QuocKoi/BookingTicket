import { Breadcrumb, Button, Form, Input, Select, Space } from 'antd'
import React from 'react'
import { useDispatch} from 'react-redux'
import styled from 'styled-components'
import { useFormik } from 'formik';
import { actAddUser, actEditUser, actUpdateUserInfor } from '../../../../redux/actions/UserActions'
import * as Yup from 'yup'
import { GROUPID } from '../../../../util/settings/config'
import { NavLink } from 'react-router-dom';
const Item = styled(Form.Item)`
    .ant-form-item-label{
        label{
            color:white;
            font-weight:600
        }
    }
`
const NewSpace = styled(Space)`
    display:flex;
    .ant-space-item{
        width:100%
    }
`
const NewBreadcrumb=styled(Breadcrumb)`
    .ant-breadcrumb-link{
        color:white;
        a{
            color:white
        }
        
    }
        .ant-breadcrumb-separator{
            color:white 
        }
`
const { Option } = Select;
const CreateSchema = Yup.object().shape({
    taiKhoan: Yup.string().trim('Không được để trống').
    required('Không được để trống!')
    ,
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
        matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Không hợp lệ!'),
    hoTen: Yup.string().trim('Không được để trống').
        required('Không được để trống!'),
})
export default function AddUser() {
    const dispatch = useDispatch();
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            taiKhoan: '',
            matKhau: '',
            email: '',
            hoTen: '',
            maLoaiNguoiDung: '',
            soDt: ''
        },
        values: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            hoTen: '',
            maLoaiNguoiDung: '',
            soDt: ''
        },
        errors: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            hoTen: '',
            maLoaiNguoiDung: '',
            soDt: ''
        },
        validationSchema: CreateSchema,
        onSubmit: values => {
            dispatch(actAddUser({...values,maNhom:GROUPID}))
        },
    });
    const { errors } = formik;
    const handleChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldValue(name, value)
    }
    const handleSelect = (value) => {
        formik.setFieldValue('maLoaiNguoiDung', value)
    }

    return (
        <div>
              <NewBreadcrumb>
                <Breadcrumb.Item>
                    <NavLink  to='/admin/users'>Người dùng</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item >Thêm người dùng</Breadcrumb.Item>
            </NewBreadcrumb>
           
            <Form
                layout="vertical"
                className='w-3/5 h-screen'
                style={{ margin: '50px auto 0' }}
                onSubmitCapture={()=>{formik.handleSubmit()}}
            >
                <Item label="Tài khoản" required={true} hasFeedback validateStatus={errors.taiKhoan?'error':'success'} >
                    <Input status={`${errors.taiKhoan ? 'error' : ''}`}  name='taiKhoan' onChange={handleChange} />
                    <span className='text-red-600'>{errors.taiKhoan}</span>
                </Item>
                <Item label="Mật khẩu" required={true} hasFeedback validateStatus={errors.matKhau?'error':'success'}>
                    <Input status={`${errors.matKhau ? 'error' : ''}`}   name='matKhau' onChange={handleChange} />
                    <span className='text-red-600'>{errors.matKhau}</span>
                </Item>
                <NewSpace >
                    <Item label="Email" required={true}  hasFeedback validateStatus={errors.email?'error':'success'}>
                        <Input status={`${errors.email ? 'error' : ''}`}   name='email' onChange={handleChange} />
                        <span className='text-red-600'>{errors.email}</span>
                    </Item>
                    <Item label="Loại người dùng" className='w-full' required={true}  hasFeedback validateStatus={errors.maLoaiNguoiDung?'error':'success'}>
                        <Select status={`${errors.maLoaiNguoiDung ? 'error' : ''}`}   onChange={handleSelect}>
                            <Option value='KhachHang'>Khách Hàng</Option>
                            <Option value='QuanTri'>Quản Trị</Option>
                        </Select>
                        <span className='text-red-600'>{errors.maLoaiNguoiDung}</span>
                    </Item>
                </NewSpace>
                <NewSpace >
                    <Item label="Số điện thoại" style={{ width: '100%' }} required={true} hasFeedback validateStatus={errors.soDt?'error':'success'}>
                        <Input status={`${errors.soDt ? 'error' : ''}`}  name='soDt' onChange={handleChange} />
                        <span className='text-red-600'>{errors.soDt}</span>
                    </Item>
                    <Item  label="Họ tên" className='w-full' required={true} hasFeedback validateStatus={errors.hoTen?'error':'success'}>
                        <Input name='hoTen' status={`${errors.hoTen ? 'error' : ''}`}  onChange={handleChange} />
                        <span className='text-red-600'>{errors.hoTen}</span>
                    </Item>
                </NewSpace>
                <button type='submit' className='bg-blue-600 px-4 py-2 text-white font-semibold rounded w-full'>Thêm người dùng</button>
            </Form>
        </div>
    )
}


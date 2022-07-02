import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {
    Breadcrumb,
    Button,
    Checkbox,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Space,
} from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { actAddFilm } from '../../../../redux/actions/MovieManagerAction';
import { GROUPID } from '../../../../util/settings/config';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
const Item = styled(Form.Item)`
    .ant-form-item-label{
        label{
            color:white;
            font-weight:600
        }
    }
`
const CheckBox = styled(Checkbox)`
    font-weight:600;
    color:white
    
`
const NewSpace = styled(Space)`
    display:flex;
    .ant-space-item{
        width:100%
    }
`
const NewBreadcrumb = styled(Breadcrumb)`
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
const CreateSchema = Yup.object().shape({
    tenPhim: Yup.string().trim('Không được để trống').
        required('Không được để trống!'),
    trailer: Yup.string().trim('Không được để trống').
        required('Không được để trống!'),
    moTa: Yup.string().trim('Không được để trống').
        required('Không được để trống!'),
})
export default function AddNews() {
    const [imgSrc, setImgSrc] = useState('')
    const dispatch = useDispatch();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
            maNhom: GROUPID
        },
        values: {
            tenPhim: '',
            trailer: '', moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
            maNhom: GROUPID
        },
        errors: {
            tenPhim: '',
            trailer: '', moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
            maNhom: GROUPID
        },
        validationSchema: CreateSchema,
        onSubmit: values => {
            let formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
            }
            dispatch(actAddFilm(formData))

        },
    });
    useEffect(() => {
        formik.setFieldValue('ngayKhoiChieu', moment().format('DD/MM/YYYY'))
    }, [])
    const { values, errors } = formik;
    const handleChange = (name, value) => {
        if (name == 'danhGia') {
            if (value == null) {
                value = 0
            }
        }
        if (name == 'hinhAnh') {
            value = value[0]
        }
        formik.setFieldValue([name], value)

    }
    const handleImage = (files) => {
        const file = files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImgSrc(reader.result)
            };

        }

    }
    const handleChangeDate = (date, dateString) => {
        if (dateString == "") {
            formik.setFieldValue('ngayKhoiChieu', moment().format('DD/MM/YYYY'))
        } else {
            formik.setFieldValue('ngayKhoiChieu', dateString)
        }

    }
    return (
        <div>
            <NewBreadcrumb >
                <Breadcrumb.Item>
                    <NavLink to='/admin/films'>Phim</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item >Thêm phim</Breadcrumb.Item>
            </NewBreadcrumb>
            <Form
                layout="vertical"
                className='w-3/5'
                style={{ margin: '50px auto 0' }}
                onSubmitCapture={formik.handleSubmit}

            >
                <Item label="Tên Phim" required>
                    <Input name='tenPhim' onChange={({ target }) => { handleChange(target.name, target.value) }} />
                    <span className='text-red-600'>{errors.tenPhim}</span>
                </Item>
                <Item label="Trailer" required >
                    <Input name='trailer' onChange={({ target }) => { handleChange(target.name, target.value) }} />
                    <span className='text-red-600'>{errors.trailer}</span>
                </Item>
                <Item label="Mô Tả" required>
                    <Input name='moTa' onChange={({ target }) => { handleChange(target.name, target.value) }} />
                    <span className='text-red-600'>{errors.moTa}</span>
                </Item>
                <NewSpace >
                    <Item label="Ngày Khởi chiếu" required={true} >
                        <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} value={moment(values.ngayKhoiChieu, 'DD/MM/YYYY')} onChange={handleChangeDate} />
                    </Item>
                    <Item label="Đánh Giá" >
                        <InputNumber type='number' style={{ width: '100%' }} min={0} max={10} value={values.danhGia} onChange={(value) => handleChange('danhGia', value)} />
                    </Item>
                </NewSpace>
                <Space className='mb-6'>
                    <CheckBox defaultChecked={false} name='dangChieu' onChange={({ target }) => handleChange(target.name, target.checked)}>Đang Chiếu</CheckBox>
                    <CheckBox defaultChecked={false} name='sapChieu' onChange={({ target }) => handleChange(target.name, target.checked)}>Sắp Chiếu</CheckBox>
                    <CheckBox defaultChecked={false} name='hot' onChange={({ target }) => handleChange(target.name, target.checked)}>Hot</CheckBox>
                </Space>
                <Item label="Hình Ảnh" name='hinhAnh'>
                    <img src={imgSrc} className='w-24 h-24'></img>
                    <input type='file' className='text-white cursor-pointer mt-2' name='hinhAnh' onChange={({ target }) => { handleChange(target.name, target.files); handleImage(target.files) }} accept=".jpg, .jpeg, .png, .gif,.jfif" />
                </Item>
                <button type='submit' className='bg-blue-600 px-4 py-2 text-white font-semibold rounded w-full'>Thêm phim</button>
            </Form>
        </div>
    )
}

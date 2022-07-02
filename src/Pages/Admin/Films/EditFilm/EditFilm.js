import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { actFetchFilmInforDetail, actUpdateFilm } from '../../../../redux/actions/MovieManagerAction';
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
import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup'
import { GROUPID } from '../../../../util/settings/config';
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
const UpdateSchema = Yup.object().shape({
    tenPhim: Yup.string().trim('Không được để trống').
        required('Không được để trống!'),
    trailer: Yup.string().trim('Không được để trống').
        required('Không được để trống!'),
    moTa: Yup.string().trim('Không được để trống').
        required('Không được để trống!'),
})
export default function EditFilm() {
    const [imgSrc, setImgSrc] = useState('')
    const { filmId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actFetchFilmInforDetail(filmId))
    }, [])
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
        validationSchema: UpdateSchema,
        onSubmit: values => {
            console.log(values)
            let formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
                if (key == 'hinhAnh') {
                    if (!values[key] == null) {
                        formData.append('File', values[key], values[key].name);
                    }
                }
            }
            dispatch(actUpdateFilm(formData, filmId))

        },
    });
    const { values, errors } = formik;
    const { filmInforDetail } = useSelector(state => state.MovieManagerReducer);
    useEffect(() => {
        formik.setValues({ ...filmInforDetail, hinhAnh: null, ngayKhoiChieu: moment(filmInforDetail.ngayKhoiChieu).format('DD/MM/YYYY') })
        setImgSrc(filmInforDetail.hinhAnh)
    }, [filmInforDetail])
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
                <Breadcrumb.Item >Chỉnh sửa phim</Breadcrumb.Item>
            </NewBreadcrumb>
            <Form
                layout="vertical"
                className='w-3/5'
                style={{ margin: '50px auto 0' }}
                onSubmitCapture={formik.handleSubmit}
            >
                <Item label="Tên Phim" required={true} hasFeedback >
                    <Input name='tenPhim' value={values.tenPhim} onChange={({ target }) => { handleChange(target.name, target.value) }} />
                    <span className='text-red-600'>{errors.tenPhim}</span>
                </Item>
                <Item label="Trailer" required={true}>
                    <Input name='trailer' value={values.trailer} onChange={({ target }) => { handleChange(target.name, target.value) }} />
                    <span className='text-red-600'>{errors.trailer}</span>
                </Item>
                <Item label="Mô Tả" required={true}>
                    <Input name='moTa' value={values.moTa} onChange={({ target }) => { handleChange(target.name, target.value) }} />
                    <span className='text-red-600'>{errors.moTa}</span>
                </Item>
                <NewSpace >
                    <Item label="Ngày Khởi chiếu" required={true} >
                        <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} value={moment(values.ngayKhoiChieu, 'DD/MM/YYYY')} onChange={handleChangeDate} />
                    </Item>
                    <Item label="Đánh Giá" required={true}>
                        <InputNumber style={{ width: '100%' }} min={0} max={10} value={values.danhGia} onChange={(value) => handleChange('danhGia', value)} />
                    </Item>
                </NewSpace>
                <Space className='mb-6'>
                    <CheckBox defaultChecked={false} checked={values.dangChieu} name='dangChieu' onChange={({ target }) => handleChange(target.name, target.checked)}>Đang Chiếu</CheckBox>
                    <CheckBox defaultChecked={false} checked={values.sapChieu} name='sapChieu' onChange={({ target }) => handleChange(target.name, target.checked)}>Sắp Chiếu</CheckBox>
                    <CheckBox defaultChecked={false} checked={values.hot} name='hot' onChange={({ target }) => handleChange(target.name, target.checked)}>Hot</CheckBox>
                </Space>
                <Item label="Hình Ảnh" name='hinhAnh' required={true}>
                    <img src={imgSrc} className='w-24 h-24'></img>
                    <input type='file' className='text-white cursor-pointer mt-2' name='hinhAnh' onChange={({ target }) => { handleChange(target.name, target.files); handleImage(target.files) }} accept=".jpg, .jpeg, .png, .gif,.jfif" />
                </Item>
                <button type='submit' className='bg-blue-600 px-4 py-2 text-white font-semibold rounded w-full'>Cập nhật</button>
            </Form>
        </div>
    )
}

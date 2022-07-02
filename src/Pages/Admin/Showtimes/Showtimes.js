import { Breadcrumb, DatePicker, Form, InputNumber, Select, Space } from 'antd'
import { CREATEFILMCALENDAR } from '../../../_core/Models/CREATEFILMCALENDAR'
import moment from 'moment';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { actFetchCinemaInfor, actFetchCinemaInforFollowSystem } from '../../../redux/actions/CinemaManagerAction';
import { NavLink, useParams } from 'react-router-dom';
import { actCreateFilmCalendar } from '../../../redux/actions/TicketManagerActions';
const { Option } = Select;
const Item = styled(Form.Item)`
    .ant-form-item-label{
        label{
            color:white;
            font-weight:600
        }
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
const NewSpace = styled(Space)`
    display:flex;
    .ant-space-item{
        width:100%
    }
`
export default function Showtimes() {
  const dispatch = useDispatch();
  const { filmId, tenPhim } = useParams();
  useEffect(() => {
    dispatch(actFetchCinemaInfor())
  }, [])
  const { arrCinemaInforList, arrCinemaInforFollowSystem } = useSelector(state => state.CinemaManagerReducer);
  const renderCinemaSystem = () => {
    return arrCinemaInforList?.map(({ maHeThongRap, tenHeThongRap }, index) => {
      return <Option key={index} value={maHeThongRap}>{tenHeThongRap}</Option>
    })
  }
  const renderCinemaInforFollowSystem = () => {
    return arrCinemaInforFollowSystem?.map(({ maCumRap, tenCumRap }, index) => {
      return <Option key={index} value={maCumRap}>{tenCumRap}</Option>
    })
  }
  const handleChange = (value) => {
    dispatch(actFetchCinemaInforFollowSystem(value))
  }
  const handleFinish = (values) => {
    const newValues = new CREATEFILMCALENDAR(filmId, moment(values.ngayChieuGioChieu._d).format('DD/MM/YYYY HH:mm:ss'), values.maRap, values.giaVe);
    dispatch(actCreateFilmCalendar(newValues))


  }
  return (
    <div className='h-screen'>
      <NewBreadcrumb >
        <Breadcrumb.Item>
          <NavLink to='/admin/films'>Phim</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item >Tạo lịch chiếu</Breadcrumb.Item>
        <Breadcrumb.Item >{tenPhim}</Breadcrumb.Item>
      </NewBreadcrumb>
      <Form
        layout='vertical'
        className='w-2/4 '
        style={{ margin: '50px auto 0' }}
        onFinish={handleFinish}
      >
        <Item label="Hệ thống rạp" name='maHeThongRap' rules={[{ required: true, message: 'Vui lòng chọn hệ thống rạp' }]}>
          <Select
            defaultActiveFirstOption
            onChange={handleChange}
          >
            {renderCinemaSystem()}
          </Select>

        </Item>
        <Item label="Rạp" name='maRap' rules={[{ required: true, message: 'Vui lòng chọn rạp' }]}>
          <Select
            defaultActiveFirstOption
          >
            {renderCinemaInforFollowSystem()}
          </Select>
        </Item>
        <NewSpace>
          <Item label='Ngày chiếu/Giờ chiếu' name='ngayChieuGioChieu' rules={[{ required: true, message: 'Vui lòng chọn ngày giờ chiếu' }]}>
            <DatePicker
              format="DD/MM/YYYY HH:mm:ss"
              style={{width:'100%'}}
              showTime={{
                defaultValue: moment('00:00:00', 'HH:mm:ss'),
              }}
            />
          </Item>
          <Item label='Giá vé' name='giaVe' rules={[{ required: true, message: 'Vui lòng điền giá vé' }]}>
            <InputNumber style={{width:'100%'}} min={75000} max={150000} />
          </Item>
        </NewSpace>
        <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded font-semibold w-full'> Tạo lịch chiếu</button>
      </Form>
    </div>
  )
}

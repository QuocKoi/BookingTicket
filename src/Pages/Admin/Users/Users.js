import React, { Fragment, useEffect, useRef } from 'react'
import { Popconfirm, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { actDeleteAccount, actFetchUsersList } from '../../../redux/actions/UserActions'
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import Search from 'antd/lib/transfer/search';
export default function Users() {
  const dispatch = useDispatch();
  const history = useHistory();
  const searchRef = useRef(null);
  useEffect(() => {
    dispatch(actFetchUsersList())
  }, [])
  const { usersList } = useSelector(state => state.UserReducer);
  const confirm = (taiKhoan) => {
    dispatch(actDeleteAccount(taiKhoan))
  }
  const handleSearch = (e) => {
    const { value } = e.target;
    if (searchRef.current) {
      clearTimeout(searchRef.current)
    }
    searchRef.current = setTimeout(() => {
      dispatch(actFetchUsersList(value))
    }, 300)
  }
  const columns = [
    {
      title: 'Loại',
      dataIndex: 'maLoaiNguoiDung',
      key: 'maLoaiNguoiDung',
      filters: [
        {
          text: 'Khách Hàng',
          value: 'KhachHang',
        },
        {
          text: 'Quản Trị',
          value: 'QuanTri',
        },
      ],
      onFilter: (value, record) => record.maLoaiNguoiDung.startsWith(value),
    },
    {
      title: 'Tài Khoản',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      sorter: (a, b) => {
        if (a.taiKhoan.toLowerCase() < b.taiKhoan.toLowerCase()) { return -1; }
        if (a.taiKhoan.toLowerCase() > b.taiKhoan.toLowerCase()) { return 1; }
        return 0;
      },
      sortDirections: ['ascend'],
    },
    {
      title: 'Mật Khẩu',
      dataIndex: 'matKhau',
      key: 'matKhau',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => {
        if (a.email.toLowerCase() < b.email.toLowerCase()) { return -1; }
        if (a.email.toLowerCase() > b.email.toLowerCase()) { return 1; }
        return 0;
      },
      sortDirections: ['ascend'],
      key: 'email',
    },
    {
      title: 'Họ Tên',
      dataIndex: 'hoTen',
      sorter: (a, b) => {
        if (a.hoTen.toLowerCase() < b.hoTen.toLowerCase()) { return -1; }
        if (a.hoTen.toLowerCase() > b.hoTen.toLowerCase()) { return 1; }
        return 0;
      },
      sortDirections: ['ascend'],
      key: 'hoTen',
      
    },
    {
      title: 'Điện Thoại',
      dataIndex: 'soDt',
      key: 'soDt',
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (item) => {
        return <Fragment>
          <button className='px-4 py-2 bg-yellow-600 rounded text-white' onClick={() => { history.push(`/admin/users/edituser/${item.taiKhoan}`) }}><i class="fa fa-edit"></i></button>
          <Popconfirm placement="top" title='Bạn có chắc muốn xóa tài khoản này không?' onConfirm={() => { confirm(item.taiKhoan) }} okText="Đồng ý" cancelText="Không">
            <button className='mx-2 px-4 py-2 bg-red-700 rounded text-white'><i class="fa fa-trash-alt"></i></button>
          </Popconfirm>
        </Fragment>
      },
    },
  ];
  return (
    <div>
      <button className='text-white bg-sky-600 px-4 py-2 rounded mb-5' onClick={() => { history.push('/admin/users/adduser') }}>Thêm Người Dùng</button>
      <Search placeholder="input search user" onChange={handleSearch} />
      <Table columns={columns} dataSource={usersList} />
    </div>
  )
}

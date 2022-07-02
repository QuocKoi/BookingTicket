import React, { Fragment, useEffect, useRef } from 'react'
import { Popconfirm, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { actDeleteFilm, actFetchFilmList } from '../../../redux/actions/MovieManagerAction'
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import Search from 'antd/lib/transfer/search';
export default function Films() {
  const dispatch = useDispatch();
  const history = useHistory();
  const searchRef = useRef(null);
  useEffect(() => {
    dispatch(actFetchFilmList())
  }, [])
  const { arrFilmList } = useSelector(state => state.MovieManagerReducer);
  const confirm = (filmId) => {
    dispatch(actDeleteFilm(filmId))
  }
  const handleSearch = (e) => {
    const { value } = e.target;
    if (searchRef.current) {
      clearTimeout(searchRef.current)
    }
    searchRef.current = setTimeout(() => {
      dispatch(actFetchFilmList(value));
    }, 300)
  }
  const columns = [
    {
      title: 'Mã Phim',
      dataIndex: 'maPhim',
      key: 'maPhim',
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['ascend'],
      width: '12%',
    },
    {
      title: 'Tên Phim',
      dataIndex: 'tenPhim',
      sorter: (a, b) => {
        if (a.tenPhim.toLowerCase() < b.tenPhim.toLowerCase()) { return -1; }
        if (a.tenPhim.toLowerCase() > b.tenPhim.toLowerCase()) { return 1; }
        return 0;
      },
      sortDirections: ['ascend'],
      key: 'tenPhim',
      width: '20%',
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      render: (text) => {
        return <Fragment>
          <img src={text} className='w-10 h-10 rounded'></img>
        </Fragment>
      },
      width: '10%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
      render: (item) => {
        return _.truncate(item, { length: 100 })
      },
      width: '40%',
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (item) => {
        return <Fragment>
          <button className='px-4 py-2 bg-yellow-600 rounded text-white' onClick={() => { history.push(`/admin/films/editfilm/${item.maPhim}`) }}><i class="fa fa-edit"></i></button>
          <Popconfirm placement="top" title='Bạn có chắc muốn xóa phim này không?' onConfirm={() => { confirm(item.maPhim) }} okText="Đồng ý" cancelText="Không">
            <button className='mx-2 px-4 py-2 bg-red-700 rounded text-white'><i class="fa fa-trash-alt"></i></button>
          </Popconfirm>
          <button className='px-4 py-2 bg-blue-600 rounded text-white'><i class="fa fa-calendar-plus" onClick={()=>{history.push(`/admin/films/showtimes/${item.maPhim}/${item.tenPhim}`)}}></i></button>
        </Fragment>
      },
      width: '18%',
    },
  ];
  return (
    <div>
      <button className='text-white bg-sky-600 px-4 py-2 rounded mb-5' onClick={() => { history.push('/admin/films/addnews') }}>Thêm Phim</button>
      <Search placeholder="input search film" onChange={handleSearch} />
      <Table columns={columns} dataSource={arrFilmList} />
    </div>
  )
}

import React, { useState } from 'react'
import _ from 'lodash'
import { Tooltip } from 'antd';
import styled from 'styled-components';
import history from '../../util/libs/history'
const CardFilm = styled.div`
&.card{
        .overley{
            background: linear-gradient(to top,black,transparent);
            width: 100%;
            height: 100%;
            cursor: pointer;
                }
        .card__button{
            background: linear-gradient(to right,#d97706
                ,#f59e0b);
            &:hover{
                background: linear-gradient(to right,#c2410c
                    ,#ea580c);
            }
                 }
    &:hover{
        .card__icon-play{
            cursor: pointer;
            opacity:1
        }
        .overley{
            top:0
        }
    }
}
`
export default function Film(props) {
    const [toolTipVisible, setToolTipVisible] = useState(false);
    const { hinhAnh, trailer, tenPhim, danhGia, hot, ngayKhoiChieu, moTa,maPhim } = props.film;
    const date = new Date(ngayKhoiChieu);
    const ImageRegion=styled.div`
    background-image:url(${hinhAnh});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    `
    const renderDetail = () => {
        return <div className='p-2'>
            <h3 className='font-bold '>{tenPhim}</h3>
            <div className='my-1'>
                {hot ? <span className='text-white font-bold bg-red-700 rounded-lg px-2 py-1 mr-3'>HOT</span> : ''}
                <span className='text-lime-400 font-bold'><i class="fa fa-star"></i> {danhGia}</span>
            </div>
            <p className='text-gray-400'><i class="far fa-calendar-alt"></i> {date.getFullYear()}</p>
            <div className='desc text-gray-400'>
                <p>{moTa}</p>
            </div>
        </div>
    }
    return (
        <CardFilm className="card overflow-hidden rounded-lg shadow-lg shadow-black-900 bg-slate-800 max-w-sm" >
            <ImageRegion className='relative overflow-hidde h-80' onMouseEnter={() => { setToolTipVisible(true) }} onMouseLeave={() => { setToolTipVisible(false) }} >
                <a href={trailer} className='overley absolute -top-full transition-all duration-500'></a>
                <div className='absolute top-0 left-0 text-yellow-400 py-2 px-4 text-base bg-black/50'><i class="fa fa-star"></i> {danhGia}</div>
                <Tooltip zIndex={40} color='white' placement="right" title={renderDetail} visible={toolTipVisible}>
                    <a href={trailer} className='card__icon-play opacity-0 transition-all duration-500 text-white absolute top-1/2 left-1/2 w-10 h-10 text-center leading-10 border border-white rounded-circle text-base -translate-y-1/2 -translate-x-1/2'>
                        <i className="fa fa-play animate-ping"></i>
                    </a>
                </Tooltip>
            </ImageRegion>
            <div className="py-3 overflow-hidden card__desc">
                <button className='card__button py-3 px-8 w-full text-white rounded cursor-pointer font-bold transition-all duration-500' onClick={()=>{history.push(`detail/${maPhim}`)}}>Mua Vé</button>
            </div>
        </CardFilm>
    )
}

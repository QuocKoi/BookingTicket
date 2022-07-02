import React from 'react'
import Film from '../../../Components/Film/Film';
export default function HomeFilmCommingSoonList(props) {
    const { arrFilmList } = props;
    const renderFilmList = () => {
        return arrFilmList?.filter(film => film.sapChieu).map((film, index) => {
            return <Film key={index} film={film}></Film>
        })
    }
    return (
        <section className='pb-24'>
            <h1 className='mb-8 text-lg font-bold border-b-2 border-slate-700 pb-2 text-amber-500'><i class="fas fa-video-slash"></i> Sắp Chiếu</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {renderFilmList()}
            </div>
        </section>
    )
}

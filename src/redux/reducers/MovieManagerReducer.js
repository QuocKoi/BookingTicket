import { SET_FILMS_LIST, SET_FILM_INFOR_DETAIl } from "../constants/MovieManagerConstant"

const initialState={
    arrFilmList:[],
    filmInforDetail:{}
}

const MovieManagerReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_FILMS_LIST:
            return {...state,arrFilmList:action.data}
        case SET_FILM_INFOR_DETAIl:
            return {...state,filmInforDetail:action.filmInfor}
        default:return {...state}
    }
}
export default MovieManagerReducer
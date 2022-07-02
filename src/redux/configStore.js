import { applyMiddleware, combineReducers, createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import CarouselReducer from './reducers/CarouselReducer'
import MovieManagerReducer from './reducers/MovieManagerReducer'
import CinemaManagerReducer from './reducers/CinemaManagerReducer'
import LoadingReducer from './reducers/LoadingReducer'
import UserReducer from './reducers/UserReducer'
import TicketManagerReducer from './reducers/TicketManagerReducer'
import DrawerReducer from './reducers/DrawerReducer'
//***********************Đây là cấu hình redux**********************
// const rootReducer = combineReducers({
//     CarouselReducer,
//     MovieManagerReducer,
//     CinemaManagerReducer,
//     LoadingReducer,
//     UserReducer,
//     TicketManagerReducer
// })

// const store=createStore(rootReducer,applyMiddleware(thunk));
//***********************Đây là cấu hình redux toolkit**********************
const store = configureStore({
    reducer: {
        CarouselReducer,
        MovieManagerReducer,
        CinemaManagerReducer,
        LoadingReducer,
        UserReducer,
        TicketManagerReducer,
        DrawerReducer
    }
})
export default store
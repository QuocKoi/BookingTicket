import "./index.css";
import './App.css';
import { Route, Router, Switch } from 'react-router-dom'
import history from './util/libs/history'
import Home from "./Pages/Home/Home";
import Contact from './Pages/Contact/Contact'
import News from './Pages/News/News'
import Detail from "./Pages/Detail/Detail";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Loading from './Components/Loading/Loading'
import { Suspense, lazy } from "react";
import CheckoutPages from "./Pages/Checkout/Checkout";
import Profile from "./Pages/Profile/Profile";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Films from "./Pages/Admin/Films/Films";
import Users from "./Pages/Admin/Users/Users";
import Showtimes from "./Pages/Admin/Showtimes/Showtimes";
import AddNews from "./Pages/Admin/Films/AddNews/AddNews";
import EditFilm from "./Pages/Admin/Films/EditFilm/EditFilm";
import EditUser from "./Pages/Admin/Users/EditUser/EditUser";
import AddUser from "./Pages/Admin/Users/AddUser/AddUser";
import DrawerHOC from "./Components/DrawerHOC/DrawerHOC";
const HomeTemplate = lazy(() => import("./Templates/HomeTemplate/HomeTemplate"));
const CheckoutTemplate = lazy(() => import("./Templates/CheckoutTemplate/CheckoutTemplate"));
const UserTemplate = lazy(() => import("./Templates/UserTemplate/UserTemplate"));
const AdminTemplate = lazy(() => import("./Templates/AdminTemplate/AdminTemplate"))
function App() {
  return (
    <div>
      <Loading />
      <Router history={history}>
      <DrawerHOC />
        <Suspense fallback={<Loading />}>
          <Switch>
            <HomeTemplate path='/' exact Component={Home}></HomeTemplate>
            <HomeTemplate path='/home' exact Component={Home}></HomeTemplate>
            <HomeTemplate path='/contact' exact Component={Contact}></HomeTemplate>
            <HomeTemplate path='/news' exact Component={News}></HomeTemplate>
            <CheckoutTemplate path='/checkout/:filmCalendarId' exact Component={CheckoutPages}></CheckoutTemplate>
            <HomeTemplate path='/detail/:id' exact Component={Detail}></HomeTemplate>
            <HomeTemplate path='/profile/' exact Component={Profile}></HomeTemplate>
            <UserTemplate path='/login' exact Component={Login}></UserTemplate>
            <UserTemplate path='/register' exact Component={Register}></UserTemplate>
            <AdminTemplate path='/admin' exact Component={Users}></AdminTemplate>
            <AdminTemplate path='/admin/users' exact Component={Users}></AdminTemplate>
            <AdminTemplate path='/admin/films' exact Component={Films}></AdminTemplate>
            <AdminTemplate path='/admin/films/addnews' exact Component={AddNews}></AdminTemplate>
            <AdminTemplate path='/admin/films/editfilm/:filmId' exact Component={EditFilm}></AdminTemplate>
            <AdminTemplate path='/admin/films/showtimes/:filmId/:tenPhim' exact Component={Showtimes}></AdminTemplate>
            <AdminTemplate path='/admin/users/edituser/:account' exact Component={EditUser}></AdminTemplate>
            <AdminTemplate path='/admin/users/adduser' exact Component={AddUser}></AdminTemplate>
            <Route exact path='*' component={ErrorPage}></Route>
          </Switch>
        </Suspense>
      </Router>
    </div>



  );
}

export default App;

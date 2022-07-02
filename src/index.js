import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './redux/configStore'
import 'tw-elements'
import 'antd/dist/antd.css';
import { DOMAIN } from './util/settings/config';
import * as signalR from '@aspnet/signalr'
import './i18n'
export const connection = new signalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();
connection.start().then(()=>{
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
}).catch(err=>console.log(err))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

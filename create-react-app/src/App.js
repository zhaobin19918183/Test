/*
   App 应用总容器
*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Http from './httpRequest/http'
import Root from  './router/Router'
import {BrowserRouter} from 'react-router-dom';
import './httpRequest/axios'

// class App extends Component {

//     render() {
//         Http.init();
//         return <div>{this.props.children}</div>;
//     }
// }

const App = ({ history }) => (
    Http.init(),
    <BrowserRouter>
    <Root/>
   </BrowserRouter>

);

export default App;
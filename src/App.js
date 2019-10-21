import React from 'react';
import "./assets/reset.css"
import './App.css';
import "./assets/ico/iconfont.css"
import Index from "./component/Index"
import axios from "axios"
import Router from "./router/public"
import First from "./router/First"

import DatePicker from 'antd/es/date-picker'; // 加载 JS
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import { Drawer, List, NavBar, Icon } from 'antd-mobile';


class App extends React.Component{

    render(){
        return(
            <div>
                <Router routes={First} />
            </div>
        )
    }


}

export default App;

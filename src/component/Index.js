import React from "react"
import axios from "axios"
import Nav from "./Nav.js"
import {NavLink} from "react-router-dom"
import {Carousel} from 'antd';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import { Drawer, List, NavBar, Icon } from 'antd-mobile';
import moment from "moment"
// import '../../node_modules/moment/locale/zh-cn'
// moment.locale('zh-cn');

import img1 from "../assets/images/pic4.jpg"

class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            imgArr: [],
            contentArr: [],
            arr1014: [],
            arr1013: [],
            time:"",
            arr:[],
            story:[],
            title:"首页",
            date:"",
            display:"none",
            headImg:img1,
            open: false,

            fn:(tm)=>{
                let t = tm.replace('2019','').substr(0,2)+'月'+tm.replace('2019','').substr(2)+'日';
                let t1 = tm.substr(0,4)+','+tm.substr(4,2)+','+tm.substr(6)+','+'00:00:00';
                let t2 = new Date(t1).getDay();
                let week=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
                let day=week[t2];
                return t+' '+day;
            },

        };
        this.head = React.createRef();
        this.today = React.createRef();
        this.day = React.createRef()
    }


    render() {

        //22
        const sidebar = (<div>
            return (<div>
           <Nav data1={this.props} />
        </div>);
            }

        </div>);

        return (
            <div>

                {/*33*/}
                <NavBar icon={<Icon type="ellipsis" />} onLeftClick={this.onOpenChange}>Basic</NavBar>
                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    enableDragHandle
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                >
                </Drawer>

                {/**/}


                <div className="header_wrap" ref={this.head}>
                    <div className="header" >
                        <span className="iconfont icon-spread-h-bar nav_logo" onClick={this.onOpenChange}> </span>
                        {/*<span className="iconfont icon-spread-h-bar nav_logo" onClick={this.leftNav.bind(this)}> </span>*/}
                        <h1>{this.state.title}</h1>
                        <span className="iconfont icon-lingdang mess_logo"> </span>
                        <span className="iconfont icon-sandian set_logo"> </span>
                    </div>
                </div>

                <div className="auto_play" ref="auto">
                    <Carousel autoplay>
                        {
                            this.state.imgArr.map((val, i) => {
                                return <div key={i} className="img_box">
                                    <NavLink to={
                                        {
                                            pathname: "/detail",
                                            state: {
                                                id: val.id
                                            }
                                        }
                                    }>
                                        <h1 >{val.title} </h1>
                                        <img key={i} src={val.image} className="top_img"/>
                                    </NavLink>
                                </div>
                            })
                        }
                    </Carousel>,
                </div>

                <div className="index_content">
                    <div className="today_content" ref={this.today}>
                        <h4>今日热闻</h4>
                        <ul className="content_list">
                            {
                                this.state.contentArr.map((val, i) => {
                                    return <li key={i} onClick={this.toDetail.bind(this,val.id)}>
                                        <NavLink to={
                                            {
                                                pathname: "/detail",
                                                state: {
                                                    id: val.id
                                                }
                                            }
                                        }>
                                            <p className="content_text">{val.title}</p>
                                            <img src={val.images[0]} className="content_img"/>
                                        </NavLink>

                                    </li>
                                })
                            }
                        </ul>
                    </div>

                    {
                        this.state.arr.map((value,i)=>{
                            return  <div className="day_content" key={i} ref={this.day} id="day">
                                <h4>
                                    {this.state.fn(value.date)}
                                </h4>
                                {
                                    value.stories.map((val,i)=>{
                                        return <ul className="content_list"  key={i}>

                                            <li key={i}  onClick={this.toDetail.bind(this,val.id)}>
                                                <NavLink to={
                                                    {
                                                        pathname: "/detail",
                                                        state: {
                                                            id: val.id
                                                        }
                                                    }
                                                }>
                                                    <p className="content_text">{val.title}</p>
                                                    <img src={val.images} className="content_img"/>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    })
                                }
                            </div>
                        })
                    }
                 </div>


            </div>
        )
    }

    //11
    onOpenChange =(...args) => {
        //显示导航栏时溢出隐藏(禁止滚动屏幕)
        let flag = this.state.open;

        this.setState({ open: !this.state.open });
        if(flag===false){
            document.body.style.overflow = 'hidden'
        }else {
            document.body.style.overflow = ''
        }
    };


    componentDidMount() {

        window.addEventListener('scroll', this.handleScroll.bind(this));

        axios.get("/api/4/news/latest").then(res => {
            this.setState({
                imgArr: res.data.top_stories,
                contentArr: res.data.stories,
                time:res.data.date,
                date:res.data.date
            })
        });

    }

    componentWillUnmount() {
        // 卸载异步操作设置状态
        clearTimeout(this.timeouter)
        this.setState = (state, callback) => {
            return
        }
    }

    handleScroll(e) {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(this.today.current!== null){
            if(this.state.contentArr.length>0){
                if(scrollTop >=  this.today.current.offsetTop){
                    this.setState({
                        title: "今日热闻",
                    })
                }else{
                    this.setState({
                        title: "首页",
                    })
                }
            }

            let Day = document.getElementsByClassName("day_content");

            if(this.state.arr.length > 0){
                Array.from(Day).map((val,i)=>{
                    if(scrollTop >= val.offsetTop - this.head.current.offsetHeight){
                        this.setState({
                            title:val.innerText.substr(0,12)
                        })
                    }
                });
            }

            let arr = this.state.arr;

            if(scrollTop >= document.documentElement.scrollHeight-document.documentElement.clientHeight){

                axios.get("/api/4/news/before/" + this.state.time).then(res => {
                    arr.push(res.data);
                    this.setState({
                        arr:arr,
                        time:res.data.date,
                    });

                })
            }
        }
    }

    toDetail(x){

        this.props.history.push({
            pathname:"/detail",
            state:{
                id:x
            }
        })
    }

    toCollect(){
        this.props.history.push("/collect")
    }

    toIndex(){
        this.props.history.push("/index")
    }

    leftNav(){
        document.body.style.overflow = 'hidden';
        this.setState({
            display:"block"
        })
    }

    none(){
        document.body.style.overflow = '';
        this.setState({
            display:"none"
        })
    }

}

export default Index

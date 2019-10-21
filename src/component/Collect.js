import React from "react"
import {NavLink} from "react-router-dom"
import img1 from "../assets/images/pic4.jpg"
import Nav from "./Nav.js"
import 'antd-mobile/dist/antd-mobile.css';
import { Drawer, List, NavBar, Icon } from 'antd-mobile';
import Store from "../store/store"

class Collect extends React.Component{
    constructor(){
        super();
        this.state = {
            display:"none",
            dataArr:[],
            headImg:img1,
            h:"",
            open:false,
            data:Store.state.data
        }
    }

    render(){

        //22
        const sidebar = (<div>
            return (<div>
            <Nav data1={this.props} />
        </div>);
            }

        </div>);

        return(
            <div id="collect_wrap" style={{height:this.state.h}}>

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

                <div className="header_wrap_col">
                    <div className="header_col">
                        <span className="iconfont icon-spread-h-bar nav_logo" onClick={this.onOpenChange} style={{color:this.state.dataArr.color}}> </span>
                        {/*<span className="iconfont icon-spread-h-bar nav_logo" onClick={this.leftNav.bind(this)} style={{color:this.state.dataArr.color}}> </span>*/}
                        <span className="coll_num">{this.state.data.length} 条收藏</span>
                    </div>
                </div>

                <div className="coll_content">

                    <ul className="coll_list">
                        {
                            this.state.data.map((val, i) => {
                                return <li key={i}>
                                    <NavLink to={
                                        {
                                            pathname: "/detail",
                                            state: {
                                                id: val.id,
                                                // flag:true
                                            }
                                        }
                                    }>
                                        <p className="coll_text">{val.title}</p>
                                        <img src={val.image} className="coll_img"/>
                                    </NavLink>

                                </li>
                            })
                        }
                    </ul>
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
    componentDidMount(){
        //
        // let arr = this.state.dataArr;
        // for(var i=0;i<sessionStorage.length;i++){
        //     var keys = sessionStorage.key(i);
        //     var con = JSON.parse(sessionStorage.getItem(keys));
        //     arr.push(con)
        // }



        //监听
        Store.state.on("collected",()=>{
            this.setState({
                data:Store.state.data,

            })
        });

        this.setState({
            // dataArr:arr,
            h:document.documentElement.clientHeight +'px'
        });
        // console.log(this.state.dataArr);
    }

    toCollect(){
        this.props.history.push("/collect")
    }

    toIndex(){
        this.props.history.push("/index")
    }


    leftNav(){
        this.setState({
            display:"block"
        })
    }

    none(){
        this.setState({
            display:"none"
        })
    }

}

export default Collect

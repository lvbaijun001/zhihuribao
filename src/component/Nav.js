import React from "react"
import {NavLink} from "react-router-dom"
import img1 from "../assets/images/pic4.jpg"

class Nav extends React.Component{
    constructor(){
        super();
        this.state = {
            display:"block",
            dataArr:[],
            headImg:img1,
            h:""
        }
    }

    render(){
        // console.log(this.props);
        return(
            <div >
                <div className="trans_bg" style={{display:this.state.display}} onClick={this.none.bind(this)}> </div>
                <div className="leftNav" style={{display:this.state.display}} >
                    <div className="user_box">
                        <img src={this.state.headImg} className="head_img" />
                        <h3 className="userName">LBJ</h3>
                        <div className="col_box">
                            <span className="iconfont icon-star col_ico" onClick={this.toCollect.bind(this)}> </span>
                            <span className="col" onClick={this.toCollect.bind(this)} >我的收藏</span>
                            <span className="iconfont icon-xiazai down_ico"> </span>
                            <span className="down">离线下载</span>
                        </div>
                        <div className="col_index">
                            <span className="iconfont icon-yemian-copy-copy col_ico2"> </span>
                            <span className="index_txt" onClick={this.toIndex.bind(this)} >首页</span>
                        </div>
                    </div>
                </div>


            </div>
        )
    }

    componentDidMount(){

    }

    toCollect(){
        this.props.data1.history.push("/collect")
    }

    toIndex(){
        this.props.data1.history.push("/index")
    }


    leftNav(){
        this.setState({
            display:"block"
        })
    }

    none(){
        document.body.style.overflow = ''
        // this.setState({
        //     display:"none"
        // })
    }

}

export default Nav


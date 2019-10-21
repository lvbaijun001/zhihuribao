import React from "react"
import axios from "axios"
import {NavLink} from "react-router-dom"

import Store from "../store/store"

class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contentArr:[],
            css:"",
            display:"none",
            arr:[
                {
                    ico:"icon-weibo1",
                    bg:"#f13f19",
                    text:"新浪微博"
                },
                {
                    ico:"icon-weixin1",
                    bg:"#60c84f",
                    text:"微信"
                },
                {
                    ico:"icon-pengyouquan-copy",
                    bg:"#72cf29",
                    text:"微信朋友圈"
                },
                {
                    ico:"icon-fenxiang_yinxiangbiji",
                    bg:"#5ab540",
                    text:"印象笔记"
                },
                {
                    ico:"icon-youdaoyunbiji1",
                    bg:"#30a1ed",
                    text:"有道云笔记"
                },
                {
                    ico:"icon-0052",
                    bg:"#2369c8",
                    text:"QQ"
                },
                {
                    ico:"icon-sandian1",
                    bg:"#7f7f7f",
                    text:"更多平台"
                },
            ],
            id:"",
            count:[],
            color:"#fff",
            num:0,
            opacity:1,
            data:Store.state.data,
            flag:false,
        }
    }

    render(){

        setTimeout(()=>{
            var imgBox = document.getElementsByClassName("img-place-holder")[0];
            var img1 = document.createElement("img");
            img1.src = this.state.contentArr.image;
            if(imgBox!==undefined){
                imgBox.innerHTML=`<img src="${this.state.contentArr.image}" class="con_img" /> <h2>${this.state.contentArr.title}</h2> <div class="img_source">${this.state.contentArr.image_source}</div>`;
            }
        },0);

        // console.log(this.props);
        return(
            <div>
                <div className="header_wrap_d">
                    <div className="header_d" id="header_d" style={{opacity:this.state.opacity}}>
                        <span className="back_ico iconfont icon-arrow-left-lg-copy" onClick={this.back.bind(this)}> </span>
                        <span className="iconfont icon-fenxiang share_ico" onClick={this.share.bind(this)}> </span>
                        <span className="iconfont icon-star col_ico" onClick={this.collected.bind(this)} style={{color:this.state.flag==true?"yellow":"#fff"}}> </span>
                        <NavLink to={
                            {
                                pathname:"/comment",
                                state:{
                                    id:this.props.location.state.id
                                }
                            }

                        }>
                            <span className="iconfont icon-huifu replay_ico" > </span> <i>{this.state.count.comments}</i>
                        </NavLink>

                        <span className="iconfont icon-good_active-copy good_ico"> </span> <i>{this.state.count.popularity}</i>
                    </div>
                </div>

                {/*详情*/}
                <div className="detail_content">

                    {/*<div className="con_box">*/}
                        {/*<img src={this.state.contentArr.image} className="con_img" />*/}
                        {/*<h2>{this.state.contentArr.title}</h2>*/}
                        {/*<div className="img_source">{this.state.contentArr.image_source}</div>*/}
                    {/*</div>*/}


                    <div dangerouslySetInnerHTML={{ __html: this.state.contentArr.body }}  />

                    <link href={this.state.contentArr.css} rel="stylesheet" />

                </div>

                <div className="trans_bg" style={{display:this.state.display}} onClick={this.none.bind(this)}> </div>
                <div className="share_box" style={{display:this.state.display}} >
                    <h1>分享</h1>
                    <ul className="share_list" >
                        {
                            this.state.arr.map((val,i)=>{
                                return <li key={i}>
                                    <a href="#">
                                        <span className={"iconfont"+" "+`${val.ico}`+" "+"share_ico" } style={{background:`${val.bg}`}}> </span>
                                        <span className="share_text">{val.text}</span>
                                    </a>
                                </li>
                            })
                        }

                    </ul>
                </div>

            </div>
        )
    }

    componentDidMount(){

        Store.state.data.map((val,i)=>{
            console.log(val.id,111);
            console.log(this.props.location.state.id,2222);
            if(val.id === this.props.location.state.id){
                console.log(111111);
                this.state.flag = true
            }
        });
        this.setState({
            flag:this.state.flag
        });

        //监听
        Store.state.on("collected",()=>{
            this.setState({
                data:Store.state.data,

            })
        });


        window.addEventListener('scroll', this.handleScroll.bind(this));

        axios.get("/api/4/news/"+this.props.location.state.id).then(res=>{
            // console.log(res.data);
            this.setState({
                contentArr:res.data,
                css:res.data.css[0],
                id:res.data.id
            })
        });

        axios.get("/api/4/story-extra/"+this.props.location.state.id ).then(res=>{
            // console.log(res.data);
            this.setState({
                count:res.data
            })
        });

        //判断
        // for(var i=0;i<sessionStorage.length;i++){
        //     var keys = sessionStorage.key(i);
        //     var con = JSON.parse(sessionStorage.getItem(keys));
        //
        //     if(this.props.location.state.id===con['id']){
        //         this.setState({
        //             flag:true
        //         });
        //     }
        // }
    }

    handleScroll(){
        //向下滚动逐渐透明，向上滚动逐渐透明
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let n = 0.08;

        if(scrollTop > this.state.num){
            // console.log(scrollTop,"下");
            this.state.num = scrollTop;
            this.state.opacity -= n;
            if(this.state.opacity<=0){
                this.state.opacity=0
            }

        }else{
            // console.log(scrollTop,"上");
            this.state.num = scrollTop;

            this.state.opacity += n;
            if(this.state.opacity>=1){
                this.state.opacity=1
            }
        }

        this.setState({
            num:this.state.num,
            opacity:this.state.opacity
        })
    }

    collected(){

//flux
        console.log(this.state.flag,1111);

        if(this.state.flag===false){
            Store.dispatcher.dispatch({
                actionType:"collect",
                actionParams:{
                    title:this.state.contentArr.title,
                    image:this.state.contentArr.images[0],
                    flag:true,
                    id:this.props.location.state.id
                }
            });
            // this.state.flag=true
            this.setState({
                flag:true
            });
        }else {
            Store.state.data.map((val,i)=>{
                if(val.id === this.props.location.state.id){
                    Store.state.data.splice(i,1)
                }
            });
            // this.state.flag=false

            this.setState({
                flag:false
            });
        }
        // this.setState({
        //     flag:this.state.flag
        // });


    }


    // collected(){
    //
    //     this.setState({
    //         flag:!this.state.flag
    //     });
    //
    //     //判断
    //     if(this.state.flag===true){
    //         sessionStorage.removeItem(this.props.location.state.id);
    //     }else {
    //         sessionStorage.setItem(this.props.location.state.id,JSON.stringify({
    //             title:this.state.contentArr.title,
    //             image:this.state.contentArr.images[0],
    //             flag:true,
    //             id:this.props.location.state.id
    //         }));
    //     }
    //
    // }

    share(){
        this.setState({
            display:"block"
        })
    }

    none(){
        this.setState({
            display:"none"
        })
    }

    back(){
        this.props.history.go(-1)
    }

}


export default Detail
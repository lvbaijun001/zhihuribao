import React from "react"
import axios from "axios"
import {NavLink} from "react-router-dom"
import moment from "moment"
import img1 from "../assets/images/长评论_03.png"

var timer=undefined;
class Comment extends React.Component{
    constructor(){
        super();
        this.state = {
            long:[],
            short:[],
            display1:"block",
            display2:"none",
            empty:img1,
            flag:false,
            tag:false,
            display:true,
        };
        this.up = React.createRef();
        this.head = React.createRef();
        this.long = React.createRef();
        this.all = React.createRef();
    }

    render(){
        // console.log(this.props);
        return(
            <div ref={this.all}>
               <div className="header_wrap_c" >

                   <div className="header_c" ref={this.head}>
                       <span className="back_ico iconfont icon-arrow-left-lg-copy" onClick={this.back.bind(this)}> </span>
                       <span className="comment_num">{this.state.long.length+this.state.short.length} 条点评</span>
                       <span className="iconfont icon-bianji edit_ico"> </span>
                   </div>

               </div>

                <div className="long_content"  ref={this.long}>

                    {/*长评论数*/}
                    <div className="long_head">
                        <div className="long_num">{this.state.long.length} 条长评</div>
                    </div>

                    {/*空*/}
                    <div className="empty_content" style={{display:this.state.long.length===0?"block":"none"}}>
                        <img src={this.state.empty} className="empty_img" />
                    </div>


                    {/*长*/}
                    <ul className="long_list">
                        {
                            this.state.long.map((val,i)=>{
                                return <li key={i}>
                                    <div className="user_mess">
                                        <img src={val.avatar} className="user_img" />
                                        <span className="user_name">{val.author}</span>
                                        <div className="likes_count">
                                            <span className="iconfont icon-good_active-copy likes_ico"> </span>
                                            <span className="likes_num">{val.likes}</span>
                                        </div>
                                    </div>

                                    <div className="comment_txt">
                                        {val.content}
                                    </div>
                                            {/*回复*/}
                                            {
                                                (()=> {
                                                    if (val.reply_to !== undefined) {
                                                        return <div className="replay_box">

                                                            <p className={this.state.flag===false?"short_replay":"replay_txt"}>
                                                                <i className="author">//{val.reply_to.author}：</i>
                                                                {val.reply_to.content}
                                                            </p>
                                                        </div>


                                                    }
                                                })()
                                            }

                                    <div className="comment_time">
                                        <div className="time">
                                            {moment(parseInt(`${val.time*1000}`)).format("YYYY-MM-DD HH:mm:ss").substr(5,11)}
                                        </div>

                                        {/*展开收起*/}
                                        <div className="up_btn" onClick={this.upreplay.bind(this)}
                                             style={{display:val.reply_to === undefined?"none":"block"}} >
                                            {this.state.flag===false?"展开":"收起"}
                                        </div>

                                    </div>

                                </li>
                            })
                        }
                    </ul>

                </div>


                {/*展开短评*/}
                <div className="short_wrap"  ref={this.up} onClick={this.upload.bind(this)}>
                    <div className="short_head" >
                        {/*<div className="long_head" onClick={this.upload.bind(this)} style={{display:this.state.display1}} >*/}
                        <div className="short_num">
                            <h2>{this.state.short.length} 条短评</h2>
                            <span className={`iconfont ${this.state.display===true?'icon-shuangjiantouxia':'icon-jiantou2'} more_ico`} > </span>
                        </div>
                    </div>
                </div>


                {/*短评论*/}
                <div className="short_content"  style={{display:this.state.display2}}>

                    {/*短*/}
                    <ul className="long_list"   >
                        {
                            this.state.short.map((val,i)=>{
                                return <li key={i}>
                                    <div className="user_mess">
                                        <img src={val.avatar} className="user_img" />
                                        <span className="user_name">{val.author}</span>
                                        <div className="likes_count">
                                            <span className="iconfont icon-good_active-copy likes_ico"> </span>
                                            <span className="likes_num">{val.likes}</span>
                                        </div>
                                    </div>

                                    <div className="comment_txt">
                                        {val.content}
                                    </div>

                                    {/*回复*/}
                                    {
                                        (()=> {
                                            if (val.reply_to !== undefined) {
                                                return <div className="replay_box">

                                                    <p className={this.state.flag===false?"short_replay":"replay_txt"}>
                                                        <i className="author">//{val.reply_to.author}：</i>
                                                        {val.reply_to.content}
                                                    </p>
                                                </div>


                                            }
                                        })()
                                    }

                                    <div className="comment_time">
                                        <div className="time">
                                            {moment(parseInt(`${val.time*1000}`)).format("YYYY-MM-DD HH:mm:ss").substr(5,11)}
                                        </div>

                                        {/*展开收起*/}
                                        <div className="up_btn" onClick={this.upreplay.bind(this)}
                                             style={{display:val.reply_to === undefined?"none":"block"}} >
                                            {this.state.flag===false?"展开":"收起"}
                                        </div>

                                    </div>

                                </li>
                            })
                        }
                    </ul>

                </div>

            </div>
        )
    }

    componentDidMount(){

        //长
        axios.get("/api/4/story/"+this.props.location.state.id+"/long-comments").then(res=>{
            // console.log(res.data.comments);
            this.setState({
                long:res.data.comments
            })
        });

        //短
        axios.get("/api/4/story/"+this.props.location.state.id+"/short-comments").then(res=>{
            // console.log(res.data.comments);
            this.setState({
                // short:res.data.comments
                short:res.data.comments

            })

        })
    }

    componentWillUnmount() {
        // 卸载异步操作设置状态
        clearInterval(timer);
        clearTimeout(this.timeouter);
        this.setState = (state, callback) => {
            return
        }
    }


    upreplay(){
        this.setState({
          flag:!this.state.flag
        })
    }

//展开短评
    upload(){
// setTimeout setInterval异步操作，最后执行
//         setTimeout(()=>{
//             document.documentElement.scrollTop = this.up.current.offsetTop - 50;
//         },0);

        clearInterval(timer);

        if(this.state.display===true){

            if(this.up.current.offsetTop !== null){

                timer = setInterval(()=>{

                    document.documentElement.scrollTop += 6;
                    if(document.documentElement.scrollTop >= this.up.current.offsetTop){
                        clearInterval(timer)
                    }

                    if(document.documentElement.scrollTop >= this.all.current.clientHeight - document.documentElement.clientHeight){
                        clearInterval(timer)
                    }
                },0.1);
            }

            this.setState({
                display:false,
                display2:"block",
            })
        }else {

            if(this.up.current.offsetTop !== null){
                timer = setInterval(()=>{

                    document.documentElement.scrollTop -= 6;

                    if(document.documentElement.scrollTop <= 0){
                        console.log(2222);
                        clearInterval(timer);
                        setTimeout(()=>{
                            this.setState({
                                display:true,
                                display2:"none",
                            })
                        })
                    }
                },0.1);
            }


        }

    }

//收起短评
    pack(){

    }

    back(){
        this.props.history.go(-1)
    }

}


export default Comment

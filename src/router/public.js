import React from "react"

import {Route,Switch,Redirect} from "react-router-dom"

//一般建议使用 函数的方法 创建路由
// 路由封装
// 将一二级路由(index.js , second.js)中的重复创建路由的部分(const Router=(props)=>{...})放入一个路由文件(public.js)中,
// 删除一二级路由中重复的部分，在App.js中引入封装的public.js中暴露的路由(Router)，使用public.js中暴露的路由组件(Router)，
// 将一级路由文件(index.js)中的 配置组件路径部分 const First = [{},{}...] 暴露在App.js中 (import First from "./router/index")，
// 将 First 作为自定义属性中的参数，通过父传子的方式(props)传入public.js中 ( <Router routes={First} /> ) ，
// 在包含导航组件的Index.js组件中引入 封装的public.js中暴露的路由(Router)，
// 将二级路由文件(second.js)中的 配置组件路径部分 const Second = [{},{}...] 暴露在Index.js中 (import Second from "../router/one") ，
// 将 Second 作为自定义属性中的参数，通过父传子的方式(props)传入public.js中 ( <Router routes={Second} /> ) ，
// 在public.js中通过props配置路由路径  props.routes.map
const Router=(props)=>{
    // console.log(props);
    return(
        <div>
            <Switch>
                {/*<Route path="/home" component={Home} />*/}
                {/*<Route path="/new" component={New} />*/}
                {/*<Route path="/movie" component={Movie} />*/}
                {/*<Redirect to="/home" />*/}
                {
                    props.routes.map((val,i)=>{
                        if(val.path==="*"){
                            return <Redirect key={i}  to={val.redirect} />
                        }else {
                            return <Route key={i} path={val.path} component={val.component} />
                        }

                    })
                }
            </Switch>
        </div>
    )
};

export default Router

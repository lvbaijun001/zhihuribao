import React from "react"
import {Route,Switch,Redirect} from "react-router-dom"

import Index from "../component/Index"
import Detail from "../component/Detail"
import Comment from "../component/Comment"
import Collect from "../component/Collect"
import Nav from "../component/Nav"

const First = [
    {
        path:"/index",
        component:Index
    },
    {
        path:"/detail",
        component:Detail
    },
    {
        path:"/comment",
        component:Comment
    },
    {
      path:"/collect",
      component:Collect
    },
    {
        path:"/nav",
        component:Nav
    },
    {
        path:"*",
        redirect:"/index"
    }
];



export default First

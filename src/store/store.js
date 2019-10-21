//1.从 flux 中引入 Dispatcher
import {Dispatcher} from 'flux';

//引入事件触发器
import EventEmitter from "events";

class State extends EventEmitter{
    data =[]
}

var state = new State();

//2.创建一个数据
// let state = {
//     name:"小明"
// };

//3.实例化派发器
var dispatcher = new Dispatcher();

//4.注册派发器
dispatcher.register((action)=>{
    switch (action.actionType){
        case 'collect':
            state.data.push(action.actionParams);
            state.emit('collected');
            break;

    }
});


export default {
    state,
    dispatcher
}


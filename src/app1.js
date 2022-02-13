import $ from 'jquery'
import './app1.css'
const eventBus = $(window)
//数据相关的：M
const M = {
    data : {
        n : parseInt(localStorage.getItem('n')) || 100,
    },
    create(){},
    update(data){
        Object.assign(M.data,data)
        //事件名字 'm.updated' 中间不能有空格，‘m updated’就不行。
        //监听数据 data 是否改变,改变就触发 m.updated,
        eventBus.trigger('m.updated')
        localStorage.setItem('n',M.data.n)
    },
    delete(){},
    get(){}
}
//视图相关的：V
const V = {
    el:null,
    //初始化结构
    html : `       
    <div>
        <div id="output">
            <span id="number">{{n}}</span>
        </div>
        <div>
            <button id="add1">+1</button>
            <button id="minus1">-1</button>
            <button id="mul2">*2</button>
            <button id="divide2">/2</button>
        </div>
    </div>
    `,
    init(container){
        //为了C.bindEvents 能拿到 container
        V.el = $(container)
        //V.render(M.data.n)
    },
    render(n){
        if(V.el.children.length !== 0) V.el.empty()
        V.el = $(V.html.replace('{{n}}',n)).appendTo(V.el)
    },
}

//其它的：C
const C = {
    init(container){
        V.init(container),
        V.render(M.data.n),
        // 为button 绑定事件
        C.autoBindEvents()
        //监听 m.updated 事件，执行render() 渲染页面
        eventBus.on('m.updated',()=>{
            V.render(M.data.n)
        })
    },
    events:{
        'click #add1': 'add',
        'click #minus1': 'minus',
        'click #mul2': 'mul',
        'click #divide2': 'div',
    },
    add(){
        M.update({n:M.data.n+1})
    },
    minus(){
        M.update({n:M.data.n-1})
    },
    mul(){
        M.update({n:M.data.n*2})
    },
    div(){
        M.update({n:M.data.n/2})
    },
    autoBindEvents(){
        for(let key in C.events){
            const spaceIndex = key.indexOf(' ')
            const value = C[C.events[key]]
            const part1 = key.slice(0,spaceIndex)
            const part2 = key.slice(spaceIndex+1)
            V.el.on(part1,part2,value)
        }
    }  
}
export default C
import './app2.css'
import $ from 'jquery'

const eventBus = $(window)
const localIndex = 'app2.index'
const m = {
    data : {
        index : parseInt(localStorage.getItem(localIndex)) || 0
    },
    create(){},
    update(data){
        Object.assign(m.data,data)
        console.log(data)  
        eventBus.trigger('m.updated')
        localStorage.setItem('app2.index',m.data.index)
        console.log(m.data.index) 
    },
    delete(){},
    get(){},

}

const v = {
    el:null,
    //用data-index 在dom元素上做标记
    html : (index) => {
        return `
    <div>
    <ol class='tab-bar'>
        <li class="${index === 0 ? 'selected' : ''}" data-index="0"><span>1111</span></li>
        <li class='${index === 1 ? 'selected' : ''}' data-index='1'><span>2222</span></li>
    </ol>
      <ol class="tab-content">
        <li class='${index === 0 ? 'active' : ''}'>内容1</li>
        <li class='${index === 1 ? 'active' : ''}'>内容2</li>
      </ol>
    </div>
    `
    },
    init(container){
        v.el = $(container)
    },
    render(index){
        if(v.el.children.length !== 0) v.el.empty()
        $(v.html(index)).appendTo(v.el)
    },
}

const c = {
    init(container){
        v.init(container),
        v.render(m.data.index),
        c.autoBindEvents()
        eventBus.on('m.updated',()=>{
            v.render(m.data.index)
        })
    },
    events:{
        'click .tab-bar li': 'x',
    },
    x(e){
        const index = parseInt(e.currentTarget.dataset.index)
        m.update({index : index})
    },
    autoBindEvents(){
        for(let key in c.events){
            const spaceIndex = key.indexOf(' ')
            const value = c[c.events[key]]
            const part1 = key.slice(0,spaceIndex)
            const part2 = key.slice(spaceIndex+1)
            v.el.on(part1,part2,value)
        }
    }  
}
export default c


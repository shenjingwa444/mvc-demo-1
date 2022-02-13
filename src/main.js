import './global.css'
import './reset.css'
//x就是app1.js中默认导出的c ，x 可以改为c;
import x from './app1.js'
import './app2.js'
import y from './app2.js'
import './app3.js'
import './app4.js'
//将页面中的#app1 传给app1.js的 C.init()函数，进行初始化；
x.init('#app1')
y.init('#app2')

import $ from 'jquery'
import './app1.css'
const $output = $('#output')
const $add = $('#add')
const $minus = $('#minus')
const $mul = $('#mul')
const $divide = $('#divide')
const $number = $('#number')
const n = localStorage.getItem('n')
$number.text(n || 100)
$add.on('click',()=>{
    let n = parseInt($number.text())
    n += 1
    localStorage.setItem('n',n)
    $number.text(n);
})
$minus.on('click',()=>{
    let n = parseInt($number.text())
    n -= 1
    localStorage.setItem('n',n)
    $number.text(n);
})
$mul.on('click',()=>{
    let n = parseInt($number.text())
    n *= 2
    localStorage.setItem('n',n)
    $number.text(n);
})
$divide.on('click',()=>{
    let n = parseInt($number.text())
    n /= 2
    localStorage.setItem('n',n)
    $number.text(n);
})
import $ from 'jquery'
import './app3.css'
const $app3 = $('#app3')
const $square = $('.square')
$square.on('click',()=>{
    $square.toggleClass('active')
})

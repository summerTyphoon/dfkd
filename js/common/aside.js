/**
 * Created by 11070 on 2017/5/11.
 */

define(['jquery','jquery_cookie'],function($,ud){
    // 显示用户信息
    //console.log(JSON.parse($.cookie('courierInfo')))
    // cookie存在时用cookie传入的信息，否则不变，用默认的
    $.cookie('courierInfo') && $('.aside .avatar img').attr('src', JSON.parse($.cookie('courierInfo') || {}).tc_avatar);
    $.cookie('courierInfo') && $('.profile h4').text(JSON.parse($.cookie('courierInfo') || {}).tc_name);
    $('#kechengguanli').on('click',function(){
        $('#kechengguanliul').slideToggle();
    })
});
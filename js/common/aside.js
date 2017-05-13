/**
 * Created by 11070 on 2017/5/11.
 */

define(['jquery','jquery_cookie'],function($,ud){
    // 显示用户信息
    //console.log(JSON.parse($.cookie('courierInfo')))
    // cookie存在时用cookie传入的信息，否则不变，用默认的
    $.cookie('courierInfo') && $('.aside .avatar img').attr('src', JSON.parse($.cookie('courierInfo') || {}).tc_avatar);
    $.cookie('courierInfo') && $('.profile h4').text(JSON.parse($.cookie('courierInfo') || {}).tc_name);

    // 左侧导航下拉列表
    // 用类名可以在多个导航列表上使用
    $('.kechengguanli').on('click',function(){
        $(this).next().slideToggle();
    });

    // 左侧导航焦点定位
    /**
     * 因为左侧导航是主菜单，有多个子页面，这些子页面也是要焦点定位到主菜单上，所以这不是有规律的一一对应关系
     * 在这用类似main.js中根据html加载js的方法来进行匹配
     *
     * */
    var pathName = location.pathname;
    var pathToHref = {
        '/':'/index.html',
        '/index.html':'/index.html',
        '/html/user/list.html':'/html/user/list.html',
        '/html/user/profile.html':'/html/user/list.html',
        '/html/teacher/edit.html':'/html/teacher/list.html',
        '/html/teacher/list.html':'/html/teacher/list.html',
        '/html/home/repass.html':'/index.html',
        '/html/home/settings.html':'/index.html',
        '/html/course/add.html':'/html/course/add.html',
        '/html/course/category_add.html':'/html/course/category_list.html',
        '/html/course/category_list.html':'/html/course/category_list.html',
        '/html/course/course_add_step1.html':'/html/course/add.html',
        '/html/course/course_add_step2.html':'/html/course/add.html',
        '/html/course/course_add_step3.html':'/html/course/add.html',
        '/html/course/list.html':'/html/course/list.html',
    }

    var href = pathToHref[pathName];
    $('.aside .navs a').removeClass('active').filter('[href="'+href+'"]').addClass('active');


    // 如果焦点在下拉列表中，则下拉列表是展开状态
    //if(!$('.aside .navs a').filter(function(index){if(index>=0&&index<=2){return true}}).is('.active')){
    //    $('.kechengguanli').next().slideDown();
    //}
    if(!$('.aside .navs a:lt(3)').is('.active')){
        $('.kechengguanli').next().slideDown();
    }
});
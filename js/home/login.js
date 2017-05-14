/**
 * Created by 11070 on 2017/5/11.
 */
define(['bootstrap','jquery','jquery_form','jquery_cookie','util'],function(ud,$,ud,ud,util){
    // 公共方法的调用
    var result = util({'nprogress':[],'loading':[]});

    // 点击登录
    $('#login-form').ajaxForm({
        success: function (data) {
            // jquery_cookie 依赖于jquery，没有输出值
            // cookie的键值是对象时，会调用toString方法，不符合我们的要求，所以调用JSON.stringify
            $.cookie('courierInfo',JSON.stringify(data.result),{path:'/'});
            location.href = '/';
        },
        error:function(){
            alert('登录失败，请稍后再试!');
        }
    });

    // 判断是否登录，已登录跳转到主页
    if($.cookie('PHPSESSID')){
        location.href = '/';
    }
});
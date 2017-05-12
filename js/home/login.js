/**
 * Created by 11070 on 2017/5/11.
 */
define(['bootstrap','jquery','jquery_form'],function(ud,$,ud){
    $('#login-form').ajaxForm({
        success: function () {
            location.href = '/';
        },
        error:function(){
            alert('登录失败，请稍后再试!');
        }
    });
});
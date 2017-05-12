/**
 * Created by 11070 on 2017/5/11.
 */

define(['jquery'],function($){
    $('#logout').on('click',function() {
        // 退出没有jquery-form模块，就自己调用ajax方法
        $.ajax({
            url: '/v6/logout',
            type: 'post',
            success: function (data) {
                console.log(data)
                location.href = '/html/home/login.html'
            },
            error:function(){
                alert('网路不给力，退出失败')
            }
        })
    })
})
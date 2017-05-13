/**
 * Created by 11070 on 2017/5/11.
 */
define(['jquery_cookie','nprogress'],function(ud,NProgress){
    return {
        // 非登录界面判断是否登录
        checkLoginStatus:function(){
            if(!$.cookie('PHPSESSID')){
                location.href = '/html/home/login.html';
            }
        },
        nprogress:function(){
            // 进度条
            NProgress.start();
            $(function(){
                NProgress.done();
            })
        },
        // 正在加载的动画
        loading:function(){
            $(document).on('ajaxStart',function(){
                $('.overlay').show();
            }).on('ajaxStop',function(){
                $('.overlay').hide();
            })
        }

    }

});
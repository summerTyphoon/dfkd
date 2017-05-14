/**
 * Created by 11070 on 2017/5/11.
 */
define(['jquery_cookie','nprogress'],function(ud,NProgress){
    //return {
    //    // 非登录界面判断是否登录
    //    checkLoginStatus:function(){
    //        if(!$.cookie('PHPSESSID')){
    //            location.href = '/html/home/login.html';
    //        }
    //    },
    //    nprogress:function(){
    //        // 进度条
    //        NProgress.start();
    //        $(function(){
    //            NProgress.done();
    //        })
    //    },
    //    // 正在加载的动画
    //    loading:function(){
    //        $(document).on('ajaxStart',function(){
    //            $('.overlay').show();
    //        }).on('ajaxStop',function(){
    //            $('.overlay').hide();
    //        })
    //    }
    //}

    // 用以上方法返回一个对象时，要在调用的地方按个调用每个方法，不是很方便
    // 那么可以直接返回一个函数，在调用的地方输入需要调用的方法，在这个函数中调用
    var util = {
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
    // [] 为可能传入的参数，在这里不需要参数
    //methods = {checkLoginStatus:[],nprogress:[],loading:[]}
    return function(methods){
        // result为可能的返回值
        var result = {};
        for(var key in methods){
            //result[key] = util[key]();
            result[key] = util[key].apply(util,methods[key]);// 用apply方法遍历传入的参数
        }
    }

});
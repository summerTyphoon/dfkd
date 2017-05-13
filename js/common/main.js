/**
 * Created by 11070 on 2017/5/11.
 */
(function(){
    /**
     * 因为是所有页面公用的入口模块，
     * 所以这里面会对所有的模块都进行paths配置。
     * */
    require.config({
        // 基本路径，根目录
        baseUrl:'/',
        // 路径别名
        paths:{
            // 公共模块
            aside:'js/common/aside',
            header:'js/common/header',
            util:'js/common/util',
            // course 模块
            csAdd:'js/course/add',
            csList:'js/course/list',
            cgAdd:'js/course/category_add',
            cgList:'js/course/category_list',
            csAdd1:'js/course/course_add_step1',
            csAdd2:'js/course/course_add_step2',
            csAdd3:'js/course/course_add_step3',
            // home 模块
            index:'js/home/index',
            login:'js/home/login',
            repass:'js/home/repass',
            settings:'js/home/settings',
            // teacher 模块
            tcEdit:'js/teacher/edit',
            tcList:'js/teacher/list',
            // user 模块
            usList:'js/user/list',
            usProfile:'js/user/profile',


            // 第三方模块
            // 依赖jQuery的模块
            jquery:'lib/jquery/jquery.min',
            bootstrap:'lib/bootstrap/js/bootstrap.min',
            jquery_form:'lib/jquery-form/jquery.form',
            jquery_cookie:'lib/jquery-cookie/jquery.cookie',

            // 不依赖jQuery的模块
            template:'lib/artTemplate/template'
        },

        shim:{
            // bootstrap 是普通模块，配置对jQuery的依赖
            bootstrap:{
                deps:['jquery']
            },
            // template 是普通模块，配置输出参数
            template:{
                exports:'template'
            }
        }
    });

// 判断加载的页面需要加载什么js模块
    var obj = {
        '/':'index',
        '/index.html':'index',
        '/html/user/list.html':'usList',
        '/html/user/profile.html':'usProfile',
        '/html/teacher/edit.html':'tcEdit',
        '/html/teacher/list.html':'tcList',
        '/html/home/login.html':'login',
        '/html/home/repass.html':'repass',
        '/html/home/settings.html':'settings',
        '/html/course/add.html':'csAdd',
        '/html/course/category_add.html':'cgAdd',
        '/html/course/category_list.html':'cgList',
        '/html/course/course_add_step1.html':'csAdd1',
        '/html/course/course_add_step2.html':'csAdd2',
        '/html/course/course_add_step3.html':'csAdd3',
        '/html/course/list.html':'csList',
    }
// 根据加载页面的location.pathname确定加载的是什么页面，到obj中找到需要加载的js模块别名
    require([obj[location.pathname]]);

})();
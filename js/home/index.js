/**
 * Created by 11070 on 2017/5/11.
 */

define(['bootstrap','jquery','jquery_form','template','aside','header','util'],function(ud,$,ud,template,un,ud,util) {
    // 判断是否登录，没有登录传到登录页面
    util.checkLoginStatus();

    // 进度条
    util.nprogress();

    // 正在加载的动画
    util.loading();
})
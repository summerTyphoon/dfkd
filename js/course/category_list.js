/**
 * Created by 11070 on 2017/5/11.
 */
define(['bootstrap','jquery','jquery_form','template','aside','header','util'],function(ud,$,ud,template,un,ud,util) {
    // 公共方法的调用
    var result = util({'checkLoginStatus':[],'nprogress':[],'loading':[]});

    // 课程列表的回显
    $.get('/v6/category',function(data){
        $('tbody').html(template('cgListTemp',data));

        // 点击编辑进入添加分类的页面,有a标签实现

    })

})
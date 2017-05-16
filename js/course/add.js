/**
 * Created by 11070 on 2017/5/11.
 */
define(['bootstrap','jquery','jquery_form','template','aside','header','util'],function(ud,$,ud,template,un,ud,util) {
    // 公共方法的调用
    var result = util({'checkLoginStatus':[],'nprogress':[],'loading':[]});

    // 课程添加
    $('.create form').ajaxForm(function(data){
        location.href = '/html/course/course_add_step1.html#'+data.result.cs_id;
    })

})
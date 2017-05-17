/**
 * Created by 11070 on 2017/5/11.
 */
define(['bootstrap','jquery','jquery_form','template','aside','header','util'],function(ud,$,ud,template,un,ud,util) {
    // 公共方法的调用
    var result = util({'checkLoginStatus':[],'nprogress':[],'loading':[],'getSearchInfo':[location.search]});

    var cs_id = result.getSearchInfo['cs_id'];
    console.log(cs_id)
    // 课程基本信息的回显
    $.get('/v6/course/basic',{cs_id:cs_id},function(data){
        $('.steps').html(template('step1Temp',data.result));
        // 选择顶级分类，显示其子分类
        topcg();
        // 更新基本信息
        $('form').ajaxForm({
            data:{cs_id:cs_id},
            success:function(){
                location.href = '/html/course/course_add_step2.html?cs_id='+cs_id;
            }
        })
    })

    function topcg(){
        // 顶级分类变化时，请求新的顶级分类的子分类
        $(document).on('change','#topcg',fn);
        // 页面初始化时，为默认的显示的顶级分类请求子分类
        fn();
        function fn(){
            $.get('/v6/category/child',{cg_id:$('#topcg').val()},function(data){
                var str = '';
                if(data){
                    for(var i = 0;i<data.result.length;i++){
                        str += '<option value="'+data.result[i].cg_id+'" >'+data.result[i].cg_name+'</option>';
                    }
                }
                $('#subcg').html(str);
            })
        }
    }

})
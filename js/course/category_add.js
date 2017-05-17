/**
 * Created by 11070 on 2017/5/11.
 */
define(['bootstrap','jquery','jquery_form','template','aside','header','util'],function(ud,$,ud,template,un,ud,util) {
    // 公共方法的调用
    var result = util({'checkLoginStatus':[],'nprogress':[],'loading':[],'getSearchInfo':[location.search]});


    var cg_id = result.getSearchInfo['cg_id'];
    if(cg_id){
        // 传入id，编辑分类时，初始化
        $.get('/v6/category/edit',{cg_id:cg_id},function(data){
            $('form').html(template('cgAdd_temp',data.result));

            // 修改分类
            $('form').ajaxForm({
                url:'/v6/category/modify',
                data:{cg_id:cg_id},
                success:function(){
                    location.href = '/html/course/category_list.html';
                }
            })
        })
    }else{
        // 添加分类时，初始化，顶级分类的回显
        $.get('/v6/category/top',function(data){
            // 两种情况公用一个模板，而两种情况的数据结构不同，所以对新建分类的数据改一下
            data.result.top = data.result;
            $('form').html(template('cgAdd_temp',data.result));
            // 添加分类
            $('form').ajaxForm({
                // 因为两种情况公用一个模板，所以提交的地址不同，要手动填写
                url:'/v6/category/add',
                success:function(){
                    location.href = '/html/course/category_list.html';
                }
            })
        })
    }

})
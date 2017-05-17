/**
 * Created by 11070 on 2017/5/11.
 */
define(['bootstrap','jquery','jquery_form','template','aside','header','util'],function(ud,$,ud,template,un,ud,util) {
    // 公共方法的调用
    var result = util({'checkLoginStatus':[],'nprogress':[],'loading':[],'getSearchInfo':[location.search]});
    var cs_id = result.getSearchInfo['cs_id'];

    // 课时管理的初始化回显
    $.get('/v6/course/lesson',{cs_id:cs_id},function(data){
        $('.steps').html(template('step3Temp',data.result));
    })

    // 添加或修改课时
    $(document).on('click','#addct , #editct',function(){
        var ct_id = $(this).attr('data-ct-id');
        // ct_id 存在时是修改课时
        if(ct_id){
            $.get('/v6/course/chapter/edit',{ct_id:ct_id},function(data){
                // 添加和修改课时公用一个模板，不同的是action，以及修改要回显，添加需要空白的模态框
                data.result.action = '/v6/course/chapter/modify';
                $('#chapterModal').html(template('modalTemp',data.result));
            })
        }else{
            //ct_id 不存在时是添加课时
            $('#chapterModal').html(template('modalTemp',{action : '/v6/course/chapter/add'}));
        }
    })

    // 当点击添加按钮时，进行提交
    $(document).on('click','#tianjia',function(){
        $('.modal-body form').ajaxSubmit({
            data:{
                ct_id:$(this).attr('data-ct-id'),
                ct_cs_id:cs_id,
                ct_is_free:$('.checkbox input[type=checkbox]').prop('checked')?1:0
            },
            success:function(){
                location.reload();
            }
        })
    })

})
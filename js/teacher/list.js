/**
 * Created by 11070 on 2017/5/11.
 */
define(['bootstrap','jquery','jquery_form','template','aside','header','util'],function(ud,$,ud,template,un,ud,util) {
    // 公共方法的调用
    var result = util({'checkLoginStatus':[],'nprogress':[],'loading':[]});

    // 进入页面的初始化
    // 讲师列表
    loadTcList();
    // 编辑讲师直接在a标签的href上加入id，并实现跳转


    // 查看讲师信息
    $('#tcListTbody').on('click', '.tcViewBtn', function (event) {
        var id = $(this).parent().parent().children(0).attr('data-id');
        $.ajax({
            url:'/v6/teacher/view',
            type:'get',
            data:{'tc_id':id},
            success:function(data){
                console.log(data)
                var result = template('tcViewTemp',data);
                $('#tcViewTbody').html(result)
            }
        })
    })

    // 注销/启用讲师
    $('#tcListTbody').on('click', '.tcLogoutBtn', function (event) {
        var id = $(this).parent().parent().children(0).attr('data-id');
        var status = event.target.innerHTML=='注销'?0:1;
        $.ajax({
            url:'/v6/teacher/handle',
            type:'post',
            data:{
                'tc_id':id,
                'tc_status':status
            },
            success:function(data){
                if(data.code==200){
                    event.target.innerHTML=status==0?'启用':'注销';
                }
            }
        })
    })


    function loadTcList() {
        $.ajax({
            url: '/v6/teacher',
            type: 'get',
            success: function (data) {
                //data.result.forEach(function (value) {
                    //value.tc_gender = value.tc_gender == 1 ? '男' : '女';
                    //var date = new Date();
                    //value.tc_birthday = date.getFullYear() - value.tc_birthday.slice(0, 4);
                //})

                // 模板筛选helper
                template.helper('gender',function(n){
                    return ""+n === '0' ? '男' : '女';
                });
                template.helper('age',function(n){
                    return new Date().getFullYear() - n.slice(0, 4);
                });
                var result = template('tcListTemp', data);
                $('#tcListTbody').html(result);
            }
        })
    }
});


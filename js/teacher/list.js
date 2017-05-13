/**
 * Created by 11070 on 2017/5/11.
 */
define(['bootstrap','jquery','jquery_form','template','aside','header','util'],function(ud,$,ud,template,un,ud,util) {
    // 进度条
    util.nprogress();

    // 正在加载的动画
    util.loading();

    // 进入页面的初始化
    loadTcList();
    // 编辑讲师
    $('#tcListTbody').on('click', '.tcEditBtn', function (event) {
        var id = event.target.parentNode.parentNode.firstElementChild.innerHTML;
        location.href = '/html/teacher/edit.html?tc_id=' + id;
    })

    // 查看讲师信息
    $('#tcListTbody').on('click', '.tcViewBtn', function (event) {
        var id = event.target.parentNode.parentNode.firstElementChild.innerHTML;
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
        var id = event.target.parentNode.parentNode.firstElementChild.innerHTML;
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
                data.result.forEach(function (value) {
                    value.tc_gender = value.tc_gender == 1 ? '男' : '女';
                    var date = new Date();
                    value.tc_birthday = date.getFullYear() - value.tc_birthday.slice(0, 4);
                })
                var result = template('tcListTemp', data);
                $('#tcListTbody').html(result);
            }
        })
    }
});


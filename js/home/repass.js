/**
 * Created by 11070 on 2017/5/11.
 */
define(['bootstrap','jquery','jquery_form','template','aside','header','util','jquery_cookie'],function(ud,$,ud,template,un,ud,util,ud) {
    // 公共方法的调用
    var result = util({'checkLoginStatus':[],'nprogress':[],'loading':[]});


    $('input[name="tc_new_pass"]').eq(1).on('keyup ',function(){
        if($('input[name="tc_new_pass"]').eq(1).val()===$('input[name="tc_new_pass"]').eq(0).val()){
            $(this).parent().next().removeClass('text-danger').addClass('text-success').html('密码一致');
        }else{
            $(this).parent().next().removeClass('text-success').addClass('text-danger').html('密码不一致');
        }
    })
    $('#changepassword').ajaxForm({
        success:function(data){
            console.log(data);
            // 在全域删除cookie
            $.removeCookie('PHPSESSID',{path:'/'});
            alert('密码修改成功，请重新登录');
            location.href = '/html/home/login.html';
        }
    })

})
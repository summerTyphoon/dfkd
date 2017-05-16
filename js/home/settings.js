/**
 * Created by 11070 on 2017/5/11.
 */
define(['bootstrap','jquery','jquery_form','template','aside','header',
        'util','jquery_uploadify','jquery_cookie','jquery_region','jquery_datepicker','jquery_datepicker_CN'],
    function(ud,$,ud,template,un,ud,util,ud,ud,ud,ud,ud) {
    // 公共方法的调用
    var result = util({'checkLoginStatus':[],'nprogress':[],'loading':[]});

    // 个人资料的回显
    $.ajax({
       url:'/v6/teacher/profile',
        success:function(data){
            var resultText = template('settingsTemp',data);
            $('#settingsForm').html(resultText);

            // 省市联动插件
            $('#region-container').region({
                url: '/lib/jquery-region/region.json'
            });




            //// 修改头像
            // 原始而不成功的方法
            //var filereader = new FileReader();
            //var imgfile = document.querySelector('#upfile');
            //imgfile.onchange = function(){
            //    filereader.readAsDataURL(imgfile.files[0]);
            //    filereader.onload=function(){
            //        imgresult=filereader.result;
            //        console.log(imgresult)
            //        imgfile.parentNode.querySelector('img').src=imgresult;
            //    }
            //}

            // 用插件修改头像
            $('#upfile').uploadify({
                swf: '/lib/uploadify/uploadify.swf',
                uploader: '/v6/uploader/avatar',
                fileTypeExts: '*.gif; *.jpg; *.png',
                fileObjName:'tc_avatar',
                buttonText:'点击上传',
                //auto:false,//还是自动上传比较方便
                onUploadSuccess:function(fileobj,data){
                    console.log('上传图片成功')
                    var path = JSON.parse(data).result.path;
                    // 上传成功后图片的地址改变。
                    $('#upfile').prev().attr('src',path);
                    // 上传成功后cookie中保存的头像地址改变，以便在再次加载时改变头像
                    // 为什么在别人改了之后，我再进设置页面，左上角的头像不是别人改的图片？而是我之前设置的？
                    $.removeCookie('courierInfo');
                    var obj = JSON.parse($.cookie('courierInfo'));
                    obj.tc_avatar = path;
                    $.cookie('courierInfo',JSON.stringify(obj));


                    //// 在头像不自动上传时，点击保存才提交，图片请求的速度一般慢于文本，所以跳转页面在图片上传完成后
                    //location.href = '/html/home/settings.html';
                }
            });



            // 修改资料
            $(document.body).on('click','#baocun',function(){
                var id = $("#baocun")[0].dataset.id;
                var hometown = $("select[name='tc_province'] option[selected]").text()+'-'+$("select[name='tc_city'] option[selected]").text()+'-'+$("select[name='tc_district'] option[selected]").text();

                $('#settingsForm').ajaxSubmit({
                    data:{
                        'tc_id':id,
                        'tc_hometown':hometown
                    },
                    success:function(){
                        //console.log('修改文字成功')
                        location.href = '/html/home/settings.html'
                    }
                });

                //// 点击保存时上传头像，不自动上传时使用以下代码启动上传
                //$('#upfile').uploadify('upload');

                // 原始而不成功的方法
                //console.log($('#upfile').prev().attr('src'))
                //$.ajax({
                //url:'/v6/uploader/avatar',
                //type:'post',
                //data:{
                //    'tc_avatar':$('#upfile').prev().attr('src')
                //},
                //success:function(data){
                //    console.log(data)
                //    console.log('修改头像成功')
                //}
                //})
            })

            // 日期插件的调用
            $('input[name="tc_birthday"]').datepicker({
                language: 'zn-CN',
                format: 'yyyy-mm-dd',
                startDate:new Date('1949-10-1'),
                endDate:new Date('1999-12-31')
            });
            $('input[name="tc_join_date"]').datepicker({
                language: 'zn-CN',
                format: 'yyyy-mm-dd',
                startDate:new Date('2008-1-1'),
                endDate:new Date()
            });


        }
    });








})
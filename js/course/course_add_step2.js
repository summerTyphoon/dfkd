/**
 * Created by 11070 on 2017/5/11.
 */
define(['bootstrap','jquery','jquery_form','template','aside','header','util','jquery_uploadify'],function(ud,$,ud,template,un,ud,util,ud) {
    // 公共方法的调用
    var result = util({'checkLoginStatus':[],'nprogress':[],'loading':[],'getSearchInfo':[location.search]});
    var cs_id = result.getSearchInfo['cs_id'];
    // 课程图片初始化
    $.get('/v6/course/picture',{cs_id:cs_id},function(data){
        $('.steps').html(template('step2Temp',data.result));

        // 上传图片
        initpicture();

        // 图片剪切
        // 明天再写
    })

    function initpicture(){
        $('#uploadify').uploadify({
            swf: '/lib/uploadify/uploadify.swf',
            uploader: '/v6/uploader/cover',
            fileTypeExts: '*.gif; *.jpg; *.png',
            fileObjName:'cs_cover_original',
            formData:{cs_id:cs_id},
            buttonText:'上传图片',
            buttonClass:'btn btn-success btn-sm btn-uploadify',
            width:80,
            height:30,
            itemTemplate:'<i></i>', // 覆盖默认的提示信息
            onUploadSuccess:function(file,data){ // 这里data是第二个参数....
                console.log(111)
                var data = JSON.parse(data);
                $('.preview img').attr('src',data.result.path);
                $('.thumb img').attr('src',data.result.path);
                location.href = '/html/course/course_add_step3.html?cs_id='+cs_id;
            }
        });
    }


})
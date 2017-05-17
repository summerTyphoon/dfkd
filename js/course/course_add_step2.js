/**
 * Created by 11070 on 2017/5/11.
 */
define(['bootstrap', 'jquery', 'jquery_form', 'template', 'aside', 'header', 'util', 'jquery_uploadify', 'jquery_jcrop'], function (ud, $, ud, template, un, ud, util, ud, ud) {
    // 公共方法的调用
    var result = util({'checkLoginStatus': [], 'nprogress': [], 'loading': [], 'getSearchInfo': [location.search]});
    var cs_id = result.getSearchInfo['cs_id'];
    // 课程图片初始化
    $.get('/v6/course/picture', {cs_id: cs_id}, function (data) {
        $('.steps').html(template('step2Temp', data.result));
        // 上传图片
        initpicture();
        // 裁剪图片
        cropImg();
    })

    function cropImg() {

        var api;
        $(document).on('click', '#jcropbtn', function () {
            // 图片剪切
            if($(this).html()=='裁切图片'){
                api = $.Jcrop('#bigimg', {
                    aspectRatio: 2,
                    setSelect: [10, 10, 300, 300],
                    bgColor: 'block',
                    edge: {n: 10, s: 10, e: 10, w: 10},
                });
                $(this).html('保存图片');
            }else{
                console.log(api.tellSelect());
                $(this).html('裁切图片');
                $.post('/v6/course/update/picture',{
                    cs_id:cs_id,
                    x:api.tellSelect().x,
                    y:api.tellSelect().y,
                    w:api.tellSelect().w,
                    h:api.tellSelect().h
                },function(data){
                    console.log(data)
                    location.href = '/html/course/course_add_step3.html?cs_id=' + cs_id;
                });
            }
        })
    }

    function initpicture() {
        $('#uploadify').uploadify({
            swf: '/lib/uploadify/uploadify.swf',
            uploader: '/v6/uploader/cover',
            fileTypeExts: '*.gif; *.jpg; *.png',
            fileObjName: 'cs_cover_original',
            formData: {cs_id: cs_id},
            buttonText: '上传图片',
            buttonClass: 'btn btn-success btn-sm btn-uploadify',
            width: 80,
            height: 30,
            itemTemplate: '<i></i>', // 覆盖默认的提示信息
            onUploadSuccess: function (file, data) { // 这里data是第二个参数....
                console.log(111)
                var data = JSON.parse(data);
                $('.preview img').attr('src', data.result.path);
                $('.thumb img').attr('src', data.result.path);
                location.href = '/html/course/course_add_step3.html?cs_id=' + cs_id;
            }
        });
    }


})
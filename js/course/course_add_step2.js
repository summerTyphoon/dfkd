/**
 * Created by 11070 on 2017/5/11.
 */
//define(['bootstrap', 'jquery', 'jquery_form', 'template', 'aside', 'header', 'util', 'jquery_uploadify', 'jquery_jcrop'], function (ud, $, ud, template, un, ud, util, ud, ud) {
    define(['bootstrap', 'jquery', 'jquery_form', 'template', 'aside', 'header', 'util', 'jquery_uploadify', 'jquery_jcrop2'], function (ud, $, ud, template, un, ud, util, ud, ud) {
    // 公共方法的调用
    var result = util({'checkLoginStatus': [], 'nprogress': [], 'loading': [], 'getSearchInfo': [location.search]});
    var cs_id = result.getSearchInfo['cs_id'];
    // 课程图片初始化
    $.get('/v6/course/picture', {cs_id: cs_id}, function (data) {
        $('.steps').html(template('step2Temp', data.result));
        // 上传图片
        initpicture();
        // 裁剪图片
        //cropImg();

        Jcrop();
    })

    function cropImg() {
        var J;
        $(document).on('click', '#jcropbtn', function () {
            // 图片剪切
                J = $.Jcrop('#bigimg', {
                    aspectRatio: 2,
                    setSelect: [0, 0, 300, 150],
                    bgColor: 'block',
                    //edge: {n: 10, s: 10, e: -10, w: -10},
                });
                // 用自己下载的0.9.12的插件不能调用老师给的方法
                //J.initComponent('Thumbnailer', { width: $('.thumb').width, height: $('.thumb').height ,thumb:'.thumb'})
        })
        $(document).on('click','#save',function(){
            $.post('/v6/course/update/picture',{
                cs_id:cs_id,
                x:J.tellSelect().x,
                y:J.tellSelect().y,
                w:J.tellSelect().w,
                h:J.tellSelect().h
            },function(data){
                console.log(data)
                location.href = '/html/course/course_add_step3.html?cs_id=' + cs_id;
            });
        })
    }

    function Jcrop(){
        var J = null;
        $(document).on('click','#jcropbtn',function(){
            $('#bigimg').Jcrop({
                aspectRatio: 2,                    // 设置选取图片的宽高比
                setSelect: [ 0, 0, 600, 300 ],     // 设置默认的选区
                bgColor: 'skyblue',
                minSize: [300, 150],               // 限制选取图片的最小宽高
                //maxSize:[$('.preview').width(),$('.preview').height()],
                boxWidth:$('.preview').width(),
            },function(){
                J = this;

                J.initComponent('Thumbnailer', { width: $('.thumb').width(), height: $('.thumb').height(), thumb:'.thumb' })
                //thumbnail = this.initComponent('Thumbnailer', { width: $('.thumb').width, height: $('.thumb').height });
                // 添加缩略图，会自动生成一个.jcrop-thumb的div，用来展示缩略图，把该div手动放到.thumb中。
                $('.thumb').empty().append($('.jcrop-thumb'));
            });
        })

        $(document).on('click','#save',function(){
            var result = J.getSelection();
            $.post('/v6/course/update/picture', {
                cs_id: cs_id,
                x: result.x,
                y: result.y,
                w: result.w,
                h: result.h
            }, function() {
                location.href = '/html/course/course_add_step3.html?cs_id=' + cs_id;
            });
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
/**
 * Created by 11070 on 2017/5/11.
 */
define(['bootstrap','jquery','jquery_form','template','aside','header','util'],function(ud,$,ud,template,un,ud,util) {
    // 公共方法的调用
    var result = util({'checkLoginStatus':[],'nprogress':[],'loading':[],'getSearchInfo':[location.search]});
    var cs_id = result.getSearchInfo['cs_id'];

    // 缓存的数据
    var resultData;
    // 课时管理的初始化回显
    $.get('/v6/course/lesson',{cs_id:cs_id},function(data){
        $('.steps').html(template('step3Temp',data.result));
        resultData = data.result;
    })

    // 添加或修改课时
    var ct_id;
    $(document).on('click','#addct , .editct',function(){
        ct_id = $(this).attr('data-ct-id');
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
            success:function(data){
                // 1. 用reload会重新加载整个页面，影响性能。不建议这么做
                //location.reload();
                // 2. 只改变修改的那个
                //changeData();
                function changeData(){
                    if(ct_id){
                        // ct_id存在时，修改
                        // 标题
                        $('a[data-ct-id='+ct_id+']').parent().prevAll('span[class=name]').html($('input[name=ct_name]').val());
                        // 时长
                        $('a[data-ct-id='+ct_id+']').parent().prevAll('span[class=duration]').html($('input[name=ct_minutes]').val()+':'+ $('input[name=ct_seconds]').val());
                    }else{
                        // 添加

                        var str = '<li>' +
                            '<i class="fa fa-file-video-o"></i>' +
                            '<span class="order">课时：'+ ($(".list-unstyled li").length +1) +'</span>' +
                            '<span class="name">'+ $('input[name=ct_name]').val() +'</span>' +
                            '<span class="duration">'+ $('input[name=ct_minutes]').val()+':'+ $('input[name=ct_seconds]').val() +'</span>' +
                            '<div class="action pull-right">' +
                            '<a href="javascript:;" class="btn btn-info btn-xs editct" data-toggle="modal"      data-target="#chapterModal" data-ct-id="'+ data.result +'">编辑</a>' +
                            ' <a href="javascript:;" class="btn btn-info btn-xs">预览</a>' +
                            '<a href="javascript:;" class="btn btn-danger btn-xs">删除</a>' +
                            '</div>' +
                            '</li>';

                        $(".list-unstyled").append(str);

                    }
                }
                // 3. 或者用缓存

                cacheData();
                function cacheData(){
                    if(ct_id){
                       // 修改数据
                        var text = $('a[data-ct-id='+ct_id+']').parent().prevAll('span[class=order]').text();
                        var i = text.slice(text.indexOf('：')+1) - 1;
                        resultData.lessons[i].ct_id=data.result;
                        resultData.lessons[i].ct_name=$('input[name=ct_name]').val();
                        resultData.lessons[i].ct_video_duration=$('input[name=ct_minutes]').val()+':'+ $('input[name=ct_seconds]').val();

                        // 缓存回显
                        $('.lessons ul.list-unstyled').html(template('lessonTemp',resultData));
                    }else{
                        // 向缓存中添加数据
                        var obj = {};
                        obj.index = $(".list-unstyled li").length +1;
                        obj.ct_id=data.result;
                        obj.ct_name=$('input[name=ct_name]').val();
                        obj.ct_video_duration=$('input[name=ct_minutes]').val()+':'+ $('input[name=ct_seconds]').val();
                        resultData.lessons.push(obj);
                        // 缓存回显
                        $('.lessons ul.list-unstyled').html(template('lessonTemp',resultData));
                    }

                }

                // 隐藏模态框
                $('#chapterModal').modal('hide');
            }
        })
    })

})
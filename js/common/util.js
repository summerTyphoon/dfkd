/**
 * Created by 11070 on 2017/5/11.
 */
define(['jquery_cookie'],function(){
    return {
        checkLoginStatus:function(){
            if(!$.cookie('PHPSESSID')){
                location.href = '/html/home/login.html';
            }
        }
    }

});
!function (e) {
    'use strict';
    var tools = {
        /*用户名验证,包括以邮箱和手机号作为用户名*/
        __changeUserName:function(of){
            var username=$('.'+of).val();
            if(of=='email'){
                if (username.search(/^[\w\.+-]+@[\w\.+-]+$/) == -1) {
                    tools.showTooltips('email_input','请输入正确的Email地址');
                    return;
                }
            }
            else{
                if(username=='' || !tools.isMobilePhone(username)) {
                    tools.showTooltips('mobile_input','请输入真实在网的手机号');
                    return;
                }
            }
        },
        /*密码输入验证*/
        checkPwd1:function (pwd1) {
            if (pwd1.search(/^.{6,20}$/) == -1) {
                tools.showTooltips('password1_input','密码为空或位数太少');
            }else {
                tools.hideTooltips('password1_input');
            }
        },
        /*密码再次输入验证*/
        checkPwd2:function (pwd2) {
            var password = $(".password").val()||$(".password").last().val();
            if (pwd2!==password) {
                tools.showTooltips('passwordagain_input','两次密码输入不一致');
            }else {
                tools.hideTooltips('passwordagain_input');
            }
        },
        checkEmail: function (email) {
            if (email.search(/^.+@.+$/) == -1) {
                tools.showTooltips('email_input','邮箱格式不正确');
            }else {
                tools.hideTooltips('email_input');
            }
        },
        /*验证码位数验证*/
        checkAuthCode:function (authcode) {
            if (authcode == '' || authcode.length != 6) {
                tools.showTooltips('code_input','验证码不正确');
            }else {
                tools.hideTooltips('code_input');
            }
        },
        /*form表单提交前的验证*/
        check:function () {
            tools.hideAllTooltips();
            var ckh_result = true;
            if ($('#email').val() == '') {
                tools.showTooltips('email_input','邮箱不能为空');
                ckh_result = false;
            }
            if ($('#password1').val() == '') {
                tools.showTooltips('password1_input','密码不能为空');
                ckh_result = false;
            }
            if($('#mobile').val()=='' || !tools.isMobilePhone($('#mobile').val())) {
                tools.showTooltips('mobile_input','手机号码不正确');
                ckh_result = false;
            }
            if ($('#code').val() == '' || $('#code').val().length !=6) {
                tools.showTooltips('code_input','验证码不正确');
                ckh_result = false;
            }
            if ($('#verify').attr('checked') == false){
                tools.showTooltips('checkbox_input','对不起，您不同意Webluker的《使用协议》无法注册');
                ckh_result = false;
            }
            return ckh_result;
        },
        checkMobilePhone:function (telphone) {
            if(telphone=='' || !tools.isMobilePhone(telphone)) {
                tools.showTooltips('mobile_input','请输入正确的手机号码');
            }else{
                tools.hideTooltips('mobile_input');
            }
        },
        trim:function (str){
            return str.replace(/(^\s*)|(\s*$)/g, "");
        },

        /**** 是否为合法Email地址 ****/
        isEmail:function (value) {
            if(value.search(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/) == -1)
                return false;
            else
                return true;
        },

        /**** 是否为合法的国内电话号码 ****/
        isTelphone:function (value) {
            if(value.search(/^(\d{3}-\d{8}|\d{4}-\d{7}|\d{4}-\d{8})$/) == -1)
                return false;
            else
                return true;
        },

        /**** 是否为合法的手机号码，为了兼容国际写法，目前只判断了是否是+数字 ****/
        isMobilePhone:function (value) {
            if(value.search(/^(\+\d{2,3})?\d{11}$/) == -1)
                return false;
            else
                return true;
        },

        /**** 是否为合法的QQ号 ****/
        isQQ:function isQQ(value) {
            if(value.search(/^[1-9][0-9]{4,}$/) == -1)
                return false;
            else
                return true;
        },

        /**** 是否为数字串，length等于0不限制长度 ****/
        isNumber:function isNumber(value, length) {
            var regx;
            if(length==0)
                regx = new RegExp("^\\d*$");
            else
                regx = new RegExp("^\\d{" + length + "}$");
            if(value.search(regx) == -1)
                return false;
            else
                return true;
        },

        /*
         *msgclass:想让tooltips出现的地方的id
         *msg:提示的内容
         *time:自动消失的时间，如果不想让提示自动消失，则此参数不写
         */
        showTooltips:function (msgclass,msg,time){
            if (msgclass==''){ return; }
            if (msg==''){ msg='Error!'; }
            $('.'+msgclass).append("<div class='for_fix_ie6_bug' style='position:relative;'>\n" +
                "    <div class='tooltips_main'>\n" +
                "        <div class='tooltips_box'>\n" +
                "            <div class='tooltips'>\n" +
                "                <span class=\"tooltips_icon\"></span>\n" +
                "                <span class='msg'>"+msg+"</span>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>");
            $('.'+msgclass+' .tooltips_main').fadeIn("slow").animate({ marginTop: "2px"}, {queue:true, duration:400});
            try{
                if(typeof time != "undefined"){
                    setTimeout('hideTooltips("'+msgclass+'")',time);
                }
            }catch(err){}

        },
        hideTooltips:function (me){
            try{
                $(me).find('.tooltips_main').fadeOut("slow");
                $(me).find('.tooltips_main').parent().remove();
            }catch(e){}
        },
        hideAllTooltips:function (){
            $('.tooltips_main').fadeOut("slow");
            $('.tooltips_main').remove();
        },
        clearAllInput:function (){
            $("input").not("[type=submit]").val("");
        },
        /*tab切换功能函数*/
        Tabs:{
            btTabs:null,
            uiTabs:null,
            init:function(obj,index){//obj为对象键值对的传参形式,demo:obj:{"#btTab0":"uiTab0","#btTab1":"uiTab1"}

                var btTabsArr = [];
                var uiTabsArr = [];
                var key;
                for (key in obj){
                    btTabsArr.push(key);
                    uiTabsArr.push(obj[key]);
                }
                this.btTabs = $(btTabsArr.join(","));
                this.uiTabs = $(uiTabsArr.join(","));

                var ta=this;
                $.each(this.btTabs,function(index,item){
                    $(item).on("click",function(e){
                        ta.switchItem(index);
                    });
                });
                this.switchItem(index);
            },
            switchItem:function(idx){
                this.btTabs.removeClass("ui_on");
                this.btTabs.eq(idx).addClass("ui_on");
                this.uiTabs.hide();
                this.uiTabs.eq(idx).show();
            }
        },
        /*输入框中字数变化实时显示*/
        wordStatic:{
            inputs:null,
            shows:null,
            init:function(obj){//obj为对象键值对的传参形式,demo:obj:{"#input0":"show0","#input1":"show1"}
                var inputsArr = [];
                var showsArr = [];
                var key;
                for (key in obj){
                    inputsArr.push(key);
                    showsArr.push(obj[key]);
                }
                this.inputs = $(inputsArr.join(","));
                this.shows = $(showsArr.join(","));

                var ta=this;
                $.each(this.inputs,function(index,item){
                    ta.switchItem(index);
                    $(item).on("input",function(e){
                        ta.switchItem(index);
                    });
                    $(item).bind("input porpertychange",function(e){
                        ta.switchItem(index);
                    });
                });
            },
            switchItem:function(idx){
                var number;
                // 获取input的value值
                number = this.inputs.eq(idx).val();
                // 将换行符不计算为单词数
                number = number.replace(/\n|\r/gi,"");
                // 将值得长度赋值给对应的标签进行显示
                this.shows.eq(idx).text(number.length);
            }

        }
        /*设置"站内统计数据均会有10分钟左右延迟，请您知晓"页脚的位置*/
        ,setUiFooterLocation: function () {
            var mainHeight = $(".content-main").height();
            var maxHeight;

            var ftEle = $(".ui_ft");
            var positionType = ftEle.css("position");
            switch (positionType) {
                case "static":
                    maxHeight = window.innerHeight - 70;
                    break;
                case "fixed":
                    maxHeight = window.innerHeight - 130;
                    break;
                default:
                    break;
            }
            if(mainHeight > maxHeight){
                ftEle.css({
                    'position':'static',
                })
            }else{
                ftEle.css({
                    'position':'fixed',
                })
            }
        }
        // /*设置导航选中状态*/
        // ,showNavChecked:function () {
        //     var pathname = window.location.pathname;//获取文件路径
        //     var aEle =$(".fun_nav_list a");
        //     $.each(aEle,function(index,item){
        //         var href = $(item).attr("href");
        //         if(href === pathname){
        //             $(".fun_nav_list li").eq(index).addClass("checked");
        //         }
        //     });
        // }
    };
    e.tools = tools;
}(window);

/*窗口尺寸改变触发事件*/
$(window).resize(function() {
    tools.setUiFooterLocation();//设置页脚位置
});
tools.setUiFooterLocation();//设置页脚位置
// tools.showNavChecked();//设置导航选中状态


/*Error message Tooltips*/
// $(document).ready(function(){
//     /*点击隐藏错误提示,如果不想让提示点击消失,需要加上class='not_click_hide'*/
//     $('.control-group input').not('.not_click_hide').focus(function(){
//         tools.hideTooltips($(this).parent().attr('class'));
//     });
// });


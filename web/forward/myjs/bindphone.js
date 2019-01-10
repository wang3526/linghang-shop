var path = "/" + location.pathname.split("/")[1];

var countdown=60;  // 时长 s
// 获取验证码按钮点击事件
$("#sendMobileCode").click(function () {
    if(phone()){
        $("#secondShow").css('display','block');
        $("#sendMobileCode").css('display','none');
        $("#secondShow").html('<div class="am-btn am-btn-danger">重新发送'+countdown+'s</div>');
        $("#secondShow").css('opacity','0.2');
        var timer = setInterval(function () {
            if (countdown == 0) {
                clearInterval(timer);
                $("#secondShow").css('display','none');
                $("#sendMobileCode").css('display','block');
                countdown = 60;
                console.log(countdown);
            }
            $("#secondShow").html('<div class="am-btn am-btn-danger">重新发送'+(countdown-1)+'s</div>');
            $("#secondShow").css('opacity','0.3');
            countdown--;
        }, 1000);
        $.get(path+"/user/sendCode.do",{"phone":$("#user-new-phone").val()},function (data) {
            if(data!="000000"){
                $("#span1").html("发送失败！").css("color","red");

            }
        },"json")
    }
})

//手机号验证
function phone() {
    if (/^1[34578]\d{9}$/.test($("#user-new-phone").val())) {
        $("#span").html("手机号符合要求").css("color","green");
        return true;
    }else {
        $("#span").html("手机号不符合要求").css("color","red");
        return false;
    }
}

//验证码验证
function code() {
    if(/^\d{4}$/.test($("#user-new-code").val())){
        $("#span1").html("验证码符合要求").css("color","green");
        return true;
    }else {
        $("#span1").html("验证码不符合要求").css("color","red");
        return false;
    }
}

//保存
$("#submit").click(function () {
    if(phone()&&code()){
        $.post(path+"/user/updatePhone.do",
            {
                "phone":$("#user-new-phone").val(),
                "code":$("#user-new-code").val()
            },
            function (data) {
                if(data=="true"){
                    $("#span2").html("绑定成功").css("color","green");
                    $(".step-2 .u-stage-icon-inner .bg").css("opacity",1);
                }else {
                    $("#span2").html("绑定失败").css("color","red");
                }
            },"json")
    }else {
        $("#span2").html("请填完信息").css("color","red");
    }
})

$("#ai-topsearch").click(function () {
    var keyword=$("#searchInput").val();
    window.location.href="../home/search.html?keyword="+encodeURI(encodeURI(keyword));
})
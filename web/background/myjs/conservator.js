var path = "/" + location.pathname.split("/")[1];
$(function () {
//管理员登录

    $("#btn").click(function () {
        if (uname()==true&&pass()==true&&code1()==true) {
            var tologin = $.get(path+"/administrator/login.do", {
                "name": $("#account").val(),
                "password": $("#password").val(),
                "code": $("#codes").val()
            }, function (data) {
                for (var key in data[0]) {
                    if (key == "1000") {
                        alert(data[0][key]);
                    } else if (key == "1001") {
                        alert(data[0][key]);
                    } else if (key == "1002") {
                        //用户名密码正确，跳转页面
                        window.location.href = "index.html";
                    } else if (key == "1003") {
                        alert(data[0][key]);
                    }
                }
            }, "json");
        } else {
            $("#span").html("请输入正确的信息").css("color","red");
        }
    });

});
function uname() {
    if (/^[0-9a-zA-Z_]{5,15}$/.test($("#account").val())) {
        $("#span").html("用户名符合要求").css("color","green");
        return true;
    }else {
        $("#span").html("用户名不符合要求").css("color","red");
        return false;
    }
}
//密码验证
function pass() {
    if (/^[0-9a-zA-Z_]{6,15}$/.test($("#password").val())) {
        $("#span").html("密码符合要求").css("color","green");
        return true;
    }else {
        $("#span").html("密码不符合要求").css("color","red");
        return false;
    }
}
// 验证码验证
function code1() {
    if (/^[0-9a-zA-Z_]{4}$/.test($("#codes").val())) {
        $("#span").html("验证码符合要求").css("color","green");
        return true;
    }else {
        $("#span").html("验证码不符合要求").css("color","red");
        return false;
    }
}

$(function () {
    $.get(path+"/administrator/getName.do",function (data) {
        $("#a-name").val(data);
    },"json")
})

function testPwd() {
    if($("#a-o-pwd").val().length>0){
        $.post(path+"/administrator/testPwd.do",{"password":$("#a-o-pwd").val()},function (data) {
            if(data=="true"){
                $("#span1").html("密码正确").css("color","green");
            }else {
                $("#span1").html("密码错误").css("color","red");
            }
        },"json")
    }
}

function testNewPwd() {
    var nPwd=$("#a-n-pwd").val();
    if (/^[0-9a-zA-Z_]{6,15}$/.test(nPwd)) {
        if(nPwd!=($("#a-o-pwd").val())){
            $("#span2").html("密码符合要求").css("color","green");
            return true;
        }else {
            $("#span2").html("新密码与旧密码一致").css("color","red");
            return false;
        }
    }else {
        $("#span2").html("密码不符合要求").css("color","red");
        return false;
    }
}

function testRep() {
    var rPwd=$("#a-n-rpwd").val();
    if (/^[0-9a-zA-Z_]{6,15}$/.test(rPwd)) {
        if(rPwd==($("#a-n-pwd").val())){
            $("#span3").html("密码符合要求").css("color","green");
            return true;
        }else {
            $("#span3").html("新密码与确认密码不一致").css("color","red");
            return false;
        }
    }else {
        $("#span3").html("密码不符合要求").css("color","red");
        return false;
    }
}

function updatePwd() {
    var str=$("#span1").text();
    if(str=="密码正确"&&testNewPwd()&&testRep()){
        $.post(path+"/administrator/update.do",{"name":$("#a-name").val(),"password":$("#a-n-rpwd").val()},function (data) {
            if(data=="true"){
                $("#msg3").html("修改成功").css("color","green");
            }else {
                $("#msg3").html("修改失败").css("color","red");
            }
        },"json")
    }else {
        $("#msg3").html("请填写完信息").css("color","red");
    }
}
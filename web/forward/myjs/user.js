var path = "/" + location.pathname.split("/")[1];

//登录
$(function () {
    $("#btn").click(function () {
        $.get(path+"/user/login.do",
            {"username": $("#username").val(), "password": $("#password").val()},
            function(data){
                for (var key in data[0]){
                    console.log(key);
                    console.log(data[0]);
                    if (key=="1001") {
                        alert(data[0][key]);
                    } else if (key == "1002") {
                        alert(data[0][key]);
                    } else if (key == "1000") {
                        //用户名密码正确，跳转页面
                        window.location.href = "home.html";
                    }else if (key == "1003") {
                        alert(data[0][key]);
                    }
                }
        },"json")
    });
});

//注册
$(function () {
    $("#rbtn").click(function () {
        if (uname()==true&&pass()==true&&repass()==true){
            $.get(path+"/user/register.do",{"username":$("#username").val(),"password":$("#password").val()},function (data) {
                if(data=="true"){
                    window.location.href="login.html";
                }else {
                    alert("注册失败！");
                }
            },"json");
        }else {
            alert("请输入正确的信息");
        }
    });
})

//用户名验证
function uname() {
    if (/^[0-9a-zA-Z_]{6,15}$/.test($("#username").val())) {
        $.get(path+"/user/getUserName.do",{"username":$("#username").val()},function (data) {
            if(data=="true"){
                $("#span").text("用户名可以使用");
                $("#span").css("color","green");
                $("#rbtn").attr("disabled",false);
            }else {
                $("#span").text("用户名已存在，请重新输入");
                $("#span").css("color","red");
                $("#rbtn").attr("disabled",true);
                return;
            }
        },"json")
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
};

//确认密码
function repass() {
    if (($("#password").val())==($("#passwordRepeat").val())) {
        $("#span").html("密码相同").css("color","green");
        return true;
    }else {
        $("#span").html("密码不相同").css("color","red");
        return false;
    }
};
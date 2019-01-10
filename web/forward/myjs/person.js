var path = "/" + location.pathname.split("/")[1];

$(function () {
    $.get(path+"/user/getUser.do",function (data) {
        if(data!="false"){
            $("#img-user").attr("src",path+data.imgPath);
            $("#s-name").text(data.username);
        }
    },"json")
})

$(function () {
    $.get(path+"/user/getUser.do",function (data) {
        if(data!="false"){
            $("#img-user").attr("src",path+data.imgPath);
            $("#s-name").text(data.username);
            $("#user-name2").val(data.name);
            $("#man:checked").val(data.sex);
            if (data.sex == 0) {
                $("#man").attr("checked", "checked");
            } else if (data.sex == 1) {
                $("#women").attr("checked", "checked");
            }

            var date=new Date(data.birthday);
            var time=formatDate1(date);
            $("#u-birthday").val(time);
            $("#user-email").attr("value", data.email);
        }
    },"json")
})

function formatDate1(times) {
    var year=times.getFullYear();
    var month=times.getMonth()+1;
    var date=times.getDate();
    if(date.valueOf()>0&&date.valueOf()<10){
        date="0"+date;
    }
    return year+"-"+month+"-"+date;
}

$(function(){
    $("#imgPath").on("change",function(){
        var username=$("#s-name").text();
        var data=new FormData($("#imgfile")[0]);
        $.ajax({
            type:"POST",
            url:path+"/user/updateUserImg.do",
            data:data,
            dataType:"json",
            cache:false,
            processData:false,
            contentType:false,
            success:function(){
                window.location.href = "index.html?username="+username;
            },
            error:function(){

            }
        });
    });
});


$("#am-updatuser").click(function () {
    $.post(path+"/user/updateUser.do",
        {
            "name": $("#user-name2").val(),
            "sex": $('input[name="radio10"]:checked').val(),
            "birthday": $("#u-birthday").val(),
            "email": $("#user-email").val()
        },
        function (data) {
            if (data == "true") {
                window.location.href = "index.html";
            } else {
                alert("添加失败");
            }
        },"json");
});

$("#ai-topsearch").click(function () {
    var keyword=$("#searchInput").val();
    window.location.href="../home/search.html?keyword="+encodeURI(encodeURI(keyword));
})

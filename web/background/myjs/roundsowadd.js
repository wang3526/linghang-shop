var path = "/" + location.pathname.split("/")[1];

$(function () {
    $.get(path+"/itemCategory/getRoot.do",function (data) {
        if(data!="false"){
            for (var i in data) {
                $("#p-a-root").append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
            }
        }
    },"json");
});
//获取二级目录
$(function () {
    $("#p-a-root").on("change",function () {
        $.get(path+"/itemCategory/getPro.do",{"parentId":$("#p-a-root").val()},function (data) {
            if(data!="false"){
                $("#p-a-second").empty();
                $("#p-a-second").append("<option value='0'>--二级目录--</option>");
                $("#p-a-item").empty();
                $("#p-a-item").append("<option value='0'>--商品--</option>");
                for (var i in data) {
                    $("#p-a-second").append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
                }
            }else {
                $("#p-a-second").empty();
                $("#p-a-second").append("<option value='0'>--二级目录--</option>");
            }
        },"json")
    })
});

//获取商品
$(function () {
    $("#p-a-second").on("change",function () {
        $.get(path+"/item/getItemByCid.do",{"cId":$("#p-a-second").val()},function (data) {
            if(data!="false"){
                $("#p-a-item").empty();
                $("#p-a-item").append("<option value='0'>--商品--</option>");
                for (var i in data) {
                    $("#p-a-item").append("<option value='" + data[i].id + "'>" + data[i].title + "</option>");
                }
            }else {
                $("#p-a-item").empty();
                $("#p-a-item").append("<option value='0'>--商品--</option>");
            }
        },"json")
    })
})
$(function () {
    //添加图片
    $("#save").click(function () {
        if ($("#p-a-item").val()!=0&&$("#sort").val().length!=0&&$("#imgUpload").val().length!=0){
            var formData=new FormData();
            formData.append("iId",$("#p-a-item").val());
            formData.append("sort",$("#sort").val());
            formData.append("myFile",$("#imgUpload")[0].files[0]);
            $.ajax({
                url : path+"/round/addRound.do",
                type : 'POST',
                data : formData,
                dataType : "json",
                async :false,
                cache : false,
                processData : false,
                contentType : false,
                success : function (data) {
                    window.location.href="picture-list.html";
                }
            });
        }else {
            alert("请填写完整的信息！")
        }
    });
});
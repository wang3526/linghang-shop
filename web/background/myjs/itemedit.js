var path = "/" + location.pathname.split("/")[1];

function GetQueryString(name)
{
    //(^|&)匹配^开始的位置匹配的第一个参数，&匹配的不是第一个参数
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if(r!=null)
        return  unescape(r[2]);
    return null;
}

function testTitle(){
    $.get(path+"/item/testTitle.do",{"title":$("#p-a-name").val()},function (data) {
        if(data=="true"){
            $("#t-msg").text("商品不存在，可以添加");
            $("#t-msg").css("color","green");
        }else {
            $("#t-msg").text("商品已存在，请重新输入");
            $("#t-msg").css("color","red");
        }
    },"json")
}

$(function () {
    var id=GetQueryString("id");
    $.get(path+"/item/getItem.do",
        {"id":id},
        function (data) {
            if(data!="false"){
                $("#img").attr("src",path+data[0].img_path);
                $("#p-e-pro").val(data[0].name);
                $("#p-e-name").val(data[0].title);
                $("#p-e-sell").val(data[0].sell_point);
                $("#p-e-price").val(data[0].price);
                $("#p-e-num").val(data[0].num);
                var cont=data[0].descript;
                UE.getEditor('editor').addListener("ready", function () {
                    // editor准备好之后才可以使用
                    UE.getEditor('editor').setContent(cont);
                });
            }
        },"json")
})

$(function() {
    var id=GetQueryString("id");
    $("#p-e-save").click(function () {
        var formData=new FormData();
        formData.append("id",id);
        formData.append("title",$("#p-e-name").val());
        formData.append("sellPoint",$("#p-e-sell").val());
        formData.append("price",$("#p-e-price").val());
        formData.append("num",$("#p-e-num").val());
        formData.append("descript",UE.getEditor('editor').getContent());
        if($("#imgUpload")[0].files[0]!= undefined){
            formData.append("file", $("#imgUpload")[0].files[0]);
        }
        $.ajax({
            url: path + "/item/editItem.do",
            type: "POST",
            data: formData,
            dataType: "json",
            async: false,
            cache: false,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data == "true") {
                    window.location.href = "product-list.html";
                } else {
                    alert("修改失败！");
                }
            }
        })
    })
})
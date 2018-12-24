var page=1;
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
                $("#p-a-second").append("<option value='0'>二级目录</option>");
                for (var i in data) {
                    $("#p-a-second").append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
                }
            }else {
                $("#p-a-second").empty();
                $("#p-a-second").append("<option value='0'>二级目录</option>");
            }
        },"json")
    })
});

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

$(function() {
    $("#p-a-save").click(function () {
        var formData=new FormData();
        formData.append("cId",$("#p-a-second").val());
        formData.append("title",$("#p-a-name").val());
        formData.append("sellPoint",$("#p-a-sell").val());
        formData.append("price",$("#p-a-price").val());
        formData.append("num",$("#p-a-num").val());
        formData.append("descript",UE.getEditor('editor').getContent());
        formData.append("file",$("#imgUpload")[0].files[0]);
        $.ajax({
            url: path + "/item/addItem.do",
            type: "POST",
            data: formData,
            dataType: "json",
            async: false,
            cache: false,
            processData: false,
            contentType: false,
            success: function (data) {
                if(data=="true"){
                    window.location.href = "product-list.html";
                }else {
                    alert("添加失败！");
                }
            }
        })
    })
})

//列表获取二级目录
$(function () {
    $.get(path+"/itemCategory/getProAll.do",function (data) {
        if(data!="false"){
            for (var i in data) {
                $("#p-l-pro").append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
            }
        }
    },"json")
})

$(function () {
    $.post(path+"/item/select.do",
        {
            "cId":$("#p-l-pro").val(),
            "status":$("#p-l-status").val(),
            "keyword":$("#p-l-name").val(),
            "size":$(".selectnum").val(),
            "page":page
        },
        function (data) {
            if(data!="false"){
                $("#num").html(data.length);
                if (data.length<($(".select").val())){
                    $("#next").attr("disabled",true);
                }else {
                    $("#next").attr("disabled",false);
                }
                $("#tb").empty();
                addEle(data);
            }else {
                $("#tb").empty();
            }
        },"json");
});

$(function () {
    $("#p-l-sub").click(function () {
        $.post(path+"/item/select.do",
            {
                "cId":$("#p-l-pro").val(),
                "status":$("#p-l-status").val(),
                "keyword":$("#p-l-name").val(),
                "size":$(".selectnum").val(),
                "page":page
            },
            function (data) {
                if (data!="false") {
                    $("#num").html(data.length);
                    if (data.length < ($(".select").val())) {
                        $("#next").attr("disabled", true);
                    } else {
                        $("#next").attr("disabled", false);
                    }
                    $("#tb").empty();
                    addEle(data);
                }else {
                    $("#tb").empty();
                }
            },"json");
    })
})
//动态添加
function addEle(data) {
    for (var i in data){
        var mode=data[i];
        var status;
        var title;
        if (mode.status==1){
            status='已上架';
            title="下架"
            lab="success"
        } else if(mode.status==2) {
            status='已下架';
            title="上架";
            lab="defaunt"
        }
        var date=new Date(mode.createtime);
        var time=formatDate(date);
        $("#tb").append('<tr class="text-c">\n' +
            '\t\t\t\t<td><input type="checkbox" value="1" name=""></td>\n' +
            '\t\t\t\t<td>'+ mode.id+'</td>\n' +
            '\t\t\t\t<td>'+ mode.name+'</td>\n' +
            '\t\t\t\t<td>'+ mode.title+'</td>\n' +
            '\t\t\t\t<td>'+ mode.sell_point+'</td>\n' +
            '\t\t\t\t<td>'+ mode.price+'</td>\n' +
            '\t\t\t\t<td>'+ mode.num+'</td>\n' +
            '\t\t\t\t<td class="td-status"><span class="label label-'+lab+' radius" id="span'+mode.id+'">'+status+'</span></td>\n' +
            '\t\t\t\t<td>'+time+'</td>\n' +
            '\t\t\t\t<td class="td-manage"><a style="text-decoration:none" onClick="member_update('+mode.id+','+mode.status+')" href="javascript:;" title="'+title+'"><i class="Hui-iconfont">&#xe631;</i></a>&nbsp;&nbsp;&nbsp;'+
            '<a title="修改" href="'+path+'/background/product-edit.html?id='+mode.id+'" className="ml-5" style="text-decoration:none"><i className="Hui-iconfont">&#xe6df;</i></a>&nbsp;'+
            '<a title="删除" href="javascript:;" onclick="member_dell('+mode.id+')" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>\n' +
            '\t\t\t</tr>');
    }
}

function formatDate(times){
    var year=times.getFullYear();
    var month=times.getMonth()+1;
    var date=times.getDate();
    var hour=times.getHours();
    var minute=times.getMinutes();
    var second=times.getSeconds();
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}

//上一页
$("#previous").click(function () {
    page++;
    window.location.href="product-list.html";
});
//下一页
$("#next").click(function () {
    if (page==1){
        return;
    }
    page--;
    window.location.href="product-list.html";
});

function member_update(id,status) {
    var flag;
    if (status==1){
        status=2;
        flag=confirm("确定下架");
    }else{
        status=1;
        flag=confirm("确定上架");
    }

    if (flag){
        $.get(path+"/item/updateStatus.do",{"status":status,"id":id},function (data) {
            if(data=="true"){
                window.location.href="product-list.html";
            }else {
                alert("修改失败！");
            }
        },"json");
    }else {
        alert("未修改！")
    }
}

function member_dell(id) {
    var flag;
    flag=confirm("确定删除");
    if (flag){
        $.get(path+"/item/delete.do",{"id":id},function (data) {
            if(data=="true"){
                window.location.href="product-list.html";
            }else {
                alert("删除失败！");
            }
        },"json");
    }else {
        alert("未删除！")
    }
}

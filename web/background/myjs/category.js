var page=1;
var path = "/" + location.pathname.split("/")[1];

$(function () {
    $("#i-a-root").on("change",function () {
        var tmp=$("#i-a-root").val();
        if(tmp==0){
            $.get(path+"/itemCategory/getRoot.do",function (data) {
                if(data!="false"){
                    for (var i in data) {
                        $("#i-a-pro").append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
                    }
                }
            },"json");
        }else{
            $("#i-a-pro").empty();
            $("#i-a-pro").append("<option value='0'>选择上级目录</option>");
        }
    });
});
//验证名称是否存在
function testName() {
    $.post(path+"/itemCategory/testName.do",
        {"name":$("#i-a-name").val()},
        function (data) {
        if(data=="true"){
            $("#meg").text("该品类已添加");
            $("#meg").css("color","red");
            var msg=$("#meg").text();
            console.log(msg);
        }else {
            $("#meg").text("该品类未添加");
            $("#meg").css("color","green");
        }
        },"json");
}
//添加品类
function addItemCategory() {
    var isParent=$("#i-a-root").val();
    var msg=$("#meg").text();
    if(isParent!=-1&&msg!="该品类已添加") {
        $.post(path + "/itemCategory/addItemCategory.do",
            {
                "sort": $("#i-a-sort").val(),
                "name": $("#i-a-name").val(),
                "isParent": $("#i-a-root").val(),
                "parentId": $("#i-a-pro").val()
            },
            function (data) {
                if (data == "true") {
                    window.location.href = path + "/background/category-list.html";
                } else {
                    $("#msg3").text("添加失败");
                }
            }, "json");
    }else {
        alert("请正确填写信息！");
    }
};

//列表根目录
$(function () {
    $.get(path+"/itemCategory/getRoot.do",function (data) {
        if(data!="false"){
            for (var i in data) {
                $("#i-l-root").append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
            }
        }
    },"json");
})

//获取二级目录
$(function () {
    $("#i-l-root").on("change",function () {
        $.get(path+"/itemCategory/getPro.do",{"parentId":$("#i-l-root").val()},function (data) {
            if(data!="false"){
                $("#i-l-second").empty();
                $("#i-l-second").append("<option value='-1'>二级目录</option>");
                for (var i in data) {
                    $("#i-l-second").append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
                }
            }else {
                $("#i-l-second").empty();
                $("#i-l-second").append("<option value='-1'>二级目录</option>");
            }
        },"json")
    })
})

//获取根目录
function getRoot(parentId,i){
    var name;
    $.get(path+"/itemCategory/getRootById.do",{"id":parentId},function (data) {
        if(data!="false"){
            $('#isParent'+i).text(data.name);
        }else {
            $('#isParent'+i).text("一级分类");
        }
    },"json");
}

//获取所有分类
function show() {
    $.post(path+"/itemCategory/selectAll.do",
        {
            "root":$("#i-l-root").val(),
            "pro":$("#i-l-second").val(),
            "status":$("#i-l-status").val(),
            "num":$(".select").val(),
            "page":page
        },
        function (data) {
        $("#num").html(data.length);
        if (data.length<($(".select").val())){
            $("#next").attr("disabled",true);
        }else {
            $("#next").attr("disabled",false);
        }
        $("#tb").empty();
        addEle(data);
        },"json");
}

$(function () {
    show();
})

$(function () {
    $("#i-l-submit").click(function find() {
         $.post(path+"/itemCategory/selectAll.do",
            {
                "root":$("#i-l-root").val(),
                "pro":$("#i-l-second").val(),
                "status":$("#i-l-status").val(),
                "num":$(".select").val(),
                "page":page
            },
            function (data) {
                $("#num").html(data.length);
                if (data.length<($(".select").val())){
                    $("#next").attr("disabled",true);
                }else {
                    $("#next").attr("disabled",false);
                }
                $("#tb").empty();
                addEle(data);
            },"json");
    });
});

//动态添加
function addEle(data) {
    for (var i in data){
        var mode=data[i];
        var status;
        var title;
        if (mode.status==0){
            status='已上架';
            title="下架"
            lab="success"
        } else{
            status='已下架';
            title="上架";
            lab="defaunt"
        }
        var isParent;
        if(mode.isParent==0){
            isParent="否";
        }else if (mode.isParent==1) {
            isParent="是";
        }
        var date=new Date(mode.createtime);
        var time=formatDate(date);
        $("#tb").append('<tr class="text-c">\n' +
            '\t\t\t\t<td><input type="checkbox" value="1" name=""></td>\n' +
            '\t\t\t\t<td>'+ mode.id+'</td>\n' +
            '\t\t\t\t<td id="isParent'+i+'"></td>\n' +
            '\t\t\t\t<td>'+ mode.name+'</td>\n' +
            '\t\t\t\t<td>'+isParent+'</td>\n' +
            '\t\t\t\t<td>'+ mode.sort+'</td>\n' +
            '\t\t\t\t<td>'+time+'</td>\n' +
            '\t\t\t\t<td class="td-status"><span class="label label-'+lab+' radius" id="span'+mode.id+'">'+status+'</span></td>\n' +
            '\t\t\t\t<td class="td-manage"><a style="text-decoration:none" onClick="member_update('+mode.id+','+mode.status+')" href="javascript:;" title="'+title+'"><i class="Hui-iconfont">&#xe631;</i></a>&nbsp;&nbsp;&nbsp;'+
                '<a title="修改" href="'+path+'/background/category-edit.html?id='+mode.id+'" className="ml-5" style="text-decoration:none"><i className="Hui-iconfont">&#xe6df;</i></a>&nbsp;'+
                '<a title="删除" href="javascript:;" onclick="member_dell('+mode.id+')" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>\n' +
            '\t\t\t</tr>');
        getRoot(mode.parentId,i);
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
    if (page==1){
        return;
    }
    page--;
    show();
});
//下一页
$("#next").click(function () {
    page++;
    show();
});

function member_update(id,status) {
    var flag;
    if (status==0){
        status=1;
        flag=confirm("确定下架");
    }else{
        status=0;
        flag=confirm("确定上架");
    }

    if (flag){
        $.get(path+"/itemCategory/updateStatus.do",{"status":status,"id":id},function (data) {
            if(data=="true"){
                window.location.href="category-list.html";
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
        var del=$.get(path+"/itemCategory/delete.do",{"id":id},function () {
                window.location.href="category-list.html";
                return true;
        });
    }else {
        alert("未删除！")
    }
}
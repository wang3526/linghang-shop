var page=1;
var path = "/" + location.pathname.split("/")[1];

function getEvaluate() {
    $.get(path+"/evaluate/getEvaluate.do",
        {
            "datemin":$("#datemin").val(),
            "datemax":$("#datemax").val(),
            "username":$("#user").val(),
            "page":page,
            "size":$(".selectnum").val()
        },
        function (data) {
            $("#num").html(data.length);
            if (data.length<($(".selectnum").val())){
                $("#next").attr("disabled",true);
            }else {
                $("#next").attr("disabled",false);
            }
            $("#tb").empty();
            addEle(data);
    },"json")
}

$(function () {
    getEvaluate();
})
function addEle(data) {
    for(var i in data){
        var mode=data[i];
        var status;
        var title;
        if (mode.status==0){
            status='显示';
            title="屏蔽"
            lab="success"
        } else if(mode.status==1) {
            status='屏蔽';
            title="显示";
            lab="defaunt"
        }
        var date=new Date(mode.create_time);
        var time=formatDate(date);
        $("#tb").append('<tr class="text-c">\n' +
            '\t\t\t\t\t<td><input type="checkbox" value="1" name=""></td>\n' +
            '\t\t\t\t\t<td>'+mode.id+'</td>\n' +
            '\t\t\t\t\t<td>'+mode.name+'</td>\n' +
            '\t\t\t\t\t<td>'+mode.title+'</td>\n' +
            '\t\t\t\t\t<td><img style="width: 120px; height: 80px" alt="" src='+path+'/'+mode.img_path+'></i></td>\n' +
            '\t\t\t\t\t<td class="text-l"><div class="c-999 f-12">\n' +
            '\t\t\t\t\t\t\t<u style="cursor:pointer" class="text-primary">'+mode.name+'</u> <time title="评论时间" datetime='+time+'>'+time+'</time></div>\n' +
            '\t\t\t\t\t\t<div>'+mode.context+'</div></td>\n' +
            '\t\t\t\t<td class="td-status"><span class="label label-'+lab+' radius" id="span'+mode.id+'">'+status+'</span></td>\n' +
            '\t\t\t\t\t<td class="td-manage"><a title="'+title+'"href="javascript:;" onclick="member_edit('+mode.id+','+mode.status+')" style="text-decoration:none"><i class="Hui-iconfont">&#xe6df;</i></a> <a title="删除" href="javascript:;" onclick="member_dell('+mode.id+')" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>\n' +
            '\t\t\t\t</tr>')
    }
}

$("#evaluate").click(function () {
    getEvaluate();
})

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
    getEvaluate();
});
//下一页
$("#next").click(function () {
    page++;
    getEvaluate();
});

function member_edit(id,status){
    var flag;
    if (status==0){
        status=1;
        flag=confirm("确定屏蔽");
    }else{
        status=0;
        flag=confirm("确定显示");
    }
    if (flag){
        $.get(path+"/evaluate/updateStatus.do",{"status":status,"id":id},function (data) {
            if(data=="true"){
                window.location.href="evaluate.html";
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
                window.location.href="evaluate.html";
            }else {
                alert("删除失败！");
            }
        },"json");
    }else {
        alert("未删除！")
    }
}
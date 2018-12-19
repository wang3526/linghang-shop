var pageNo=1;
var path = "/" + location.pathname.split("/")[1];
function toShow(){
    var toshow=$.get(path+"/user/showAll.do",{"pageNo":pageNo,"pageSize":$(".select").val()},function (data) {
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
    toShow();
});
function toFind() {
    var datemin=$("#datemin").val();
    var datemax=$("#datemax").val();
    if (datemin.length==0)
        datemin="1900-00-00";
    if (datemax.length==0){
        var date=new Date();
        datemax=formatDate1(date)
    }else {
        datemax=$("#datemax").val();
    }
    $.get(path+"/user/find.do",{"datemin":datemin,"datemax":datemax,"pageNo":pageNo,"pageSize":$(".select").val()},function (data) {
        if (data.length<($(".select").val())){
            $("#next").attr("disabled",true);
        }else {
            $("#next").attr("disabled",false);
        }
        $("#tb").empty();
        // console.log(data);
        addEle(data);
    },"json");
}
//查询
// $("#datemin").change(function () {
//     console.log( $("#datemin").length);
//     alert("说的是");
//     toFind();
// });
// $("#datemax").change(function () {
//     toFind();
// });

//动态添加
function addEle(data) {
    for (var i in data){
        var mode=data[i];
        var sex;
        if (mode.sex==0){
            sex='男';
        } else if (mode.sex==1) {
            sex = '女';
        }
        var status;
        var title;
        if (mode.status==0){
            status='已启用';
            title="停用"
            lab="success"
        } else if (mode.status==1){
            status='已停用';
            title="启用";
            lab="defaunt"
        }
        var phone;
        if(mode.phone==undefined){
            phone="";
        }else {
            phone=mode.phone;
        }
        var email;
        if(mode.email==undefined){
            email="";
        }else {
            email=mode.email;
        }
        var date1;
        var time1;
        if(mode.birthday==undefined){
            time1="";
        }else {
            date1=new Date(mode.birthday);
            time1=formatDate1(date1);
        }
        var date=new Date(mode.createtime);
        var time=formatDate(date);
        $("#tb").append('<tr class="text-c">\n' +
            '\t\t\t\t<td><input type="checkbox" value="1" name=""></td>\n' +
            '\t\t\t\t<td>'+ mode.id+'</td>\n' +
            '\t\t\t\t<td><img class="img-user" src="'+(path+mode.imgPath)+'"></td>\n' +
            '\t\t\t\t<td>'+mode.username+'</td>\n' +
            '\t\t\t\t<td >'+sex+'</td>\n' +
            '\t\t\t\t<td>'+phone+'</td>\n' +
            '\t\t\t\t<td>'+email+'</td>\n' +
            '\t\t\t\t<td>'+time1+'</td>\n' +
            '\t\t\t\t<td>'+time+'</td>\n' +
            '\t\t\t\t<td class="td-status"><span class="label label-'+lab+' radius" id="span'+mode.id+'">'+status+'</span></td>\n' +
            '\t\t\t\t<td class="td-manage"><a style="text-decoration:none" onClick="member_update('+mode.id+','+mode.status+')" href="javascript:;" title="'+title+'"><i class="Hui-iconfont">&#xe631;</a></td>\n' +
            '\t\t\t</tr>');
    }
}
$(".select").change(function () {
    toShow();
});

function formatDate(times) {
    var year=times.getFullYear();
    var month=times.getMonth()+1;
    var date=times.getDate();
    var hour=times.getHours();
    var minute=times.getMinutes();
    var second=times.getSeconds();
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}
function formatDate1(times) {
    var year=times.getFullYear();
    var month=times.getMonth()+1;
    var date=times.getDate();
    return year+"-"+month+"-"+date;
}

function member_update(id,status) {
    var flag;
    if (status==0){
        status=1;
        flag=confirm("确定停用");
    }else if (status==1){
        status=0;
        flag=confirm("确定启用");
    }

    if (flag){
        $.get(path+"/user/updateStatus.do",{"status":status,"id":id},function () {
            window.location.href="member-list.html";
        });
    }else {
        alert("未修改！")
    }
}

//上一页
$("#next").click(function () {
    pageNo++;
    toShow();
});
//下一页
$("#previous").click(function () {
    if (pageNo==1){
        return;
    }
    pageNo--;
    toShow();
});
//搜索
$("#btn").click(function () {
    $.get(path+"/user/findUserByKey.do",{"keywords":$("#keywords").val(),"pageNo":pageNo,"pageSize":$(".select").val()},function (data) {
        $("#tb").empty();
        if (data.length==0){
            alert("用户不存在");
        } else {
            addEle(data);
        }
    },"json");
});
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

$(function () {
    var code=GetQueryString("code");
    $.get(path+"/order/getOrderByCode.do",{"code":code},function (data) {
        $("#freight").text(parseFloat(data.payment).toFixed(1))
    },"json")
})

$("#J_Go").click(function () {
    var code=GetQueryString("code");
    $.get(path+"/order/pay.do",function (data) {
        console.log(data);
        $("#pay-page").append(data);
        /*if(data=="true"){
            window.location.href="success.html";
        }else {
            alert("支付失败！");
        }*/
    },"html")
})
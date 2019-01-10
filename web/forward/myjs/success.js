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
    $.post(path+"/order/showOne.do",{"code":code},function (data){
        $("#success").append('<li>付款金额<em>¥'+data.payment+'</em></li>\n' +
            '       <div class="user-info">\n' +
            '         <p>收货人：'+data.name+'</p>\n' +
            '         <p>联系电话：'+data.phone+'</p>\n' +
            '         <p>收货地址：'+(data.province+data.city+data.county+data.address)+'</p>\n' +
            '       </div>');
        $("#orderinfo").attr("href","../person/orderinfo.html?code="+code);
    },"json");
});

$("#ai-topsearch").click(function () {
    var keyword=$("#searchInput").val();
    window.location.href="search.html?keyword="+encodeURI(encodeURI(keyword));
})



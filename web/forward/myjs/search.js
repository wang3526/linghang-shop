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
    var parentId=GetQueryString("id");
    $.get(path+"/itemCategory/getShowAllItem.do",{"parentId":parentId},function (data) {
        for(var i in data){
            $("#item-all").append('<li>\n' +
                '\t\t\t\t\t\t\t\t\t\t<div class="i-pic limit">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<a href="../home/introduction.html?id='+data[i].id+'"><img src='+path+data[i].imgPath+' /></a>\t\t\t\t\t\t\t\t\t\t\t\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<p class="title fl">'+data[i].sellPoint+'</p>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<p class="price fl">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<b>¥</b>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<strong>'+data[i].price+'&nbsp;元</strong>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t</p>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<p class="number fl">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t</p>\n' +
                '\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t</li>')
        }
    },"json")
})
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
    $.get(path+"/order/getOrderItemByCode.do",{"code":code},function (data) {
        var list=data.list;
        console.log(data.list);
        for(var i in list){
            var mode=list[i];
            $(".comment-main").append('<div class="comment-list">\n' +
                '\t\t\t\t\t\t\t\t<div class="item-pic">\n' +
                '\t\t\t\t\t\t\t\t\t<a href="#" class="J_MakePoint">\n' +
                '\t\t\t\t\t\t\t\t\t\t<img src="'+(path+mode.picPath)+'" class="itempic">\n' +
                '\t\t\t\t\t\t\t\t\t</a>\n' +
                '\t\t\t\t\t\t\t\t</div>\n' +
                '\n' +
                '\t\t\t\t\t\t\t\t<div class="item-title">\n' +
                '\t\t\t\t\t\t\t\t\t<div class="item-name">\n' +
                '\t\t\t\t\t\t\t\t\t\t<a href="#">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<p class="item-basic-info">商品名称：'+mode.title+'</p>\n' +
                '\t\t\t\t\t\t\t\t\t\t</a>\n' +
                '\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t<div class="item-price">\n' +
                '\t\t\t\t\t\t\t\t\t\t<div class="info-little">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<span>颜色：'+mode.color+'</span>\n' +
                '\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t<div class="item-price">\n' +
                '\t\t\t\t\t\t\t\t\t\t<div class="info-little">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<span>内存：'+mode.memory+'</span>\n' +
                '\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t<div class="item-price">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t价格：<strong>'+mode.price+'&nbsp;元</strong>\n' +
                '\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t<div class="clear"></div>\n' +
                '\t\t\t\t\t\t\t\t<div class="item-comment">\n' +
                '\t\t\t\t\t\t\t\t\t<textarea id="comm'+mode.itemId+'" placeholder="请写下对宝贝的感受吧，对他人帮助很大哦！"></textarea>\n' +
                '\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t<div class="info-btn">\n' +
                '\t\t\t\t\t\t\t\t<div class="am-btn am-btn-danger" onclick="toComment('+mode.itemId+')">发表评论</div>\n' +
                '\t\t\t\t\t\t\t</div>');
        }
    },"json")
});

//发表评价
function toComment(id) {
    var context=$("#comm"+id).val();
    console.log(context);
    $.post(path+"/evaluate/addEvaluate.do",{"iId":id,"context":context},function (data) {
        alert(data);
    },"json")
}

$("#ai-topsearch").click(function () {
    var keyword=$("#searchInput").val();
    window.location.href="../home/search.html?keyword="+encodeURI(encodeURI(keyword));
})
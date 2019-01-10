var path = "/" + location.pathname.split("/")[1];

$(function () {
    $.get(path+"/shopcar/show.do",function (data) {
        var sum=0;
        var number=0;
        for(var i in data){
            var mode=data[i];
            var item=mode.item;
            sum+=parseFloat((mode.price*mode.num).toFixed(1));
            number+=parseInt(mode.num);
            $(".bundle-main").append('<ul class="item-content clearfix">\n' +
                '\t\t\t\t\t\t<li class="td td-chk">\n' +
                '\t\t\t\t\t\t\t<div class="cart-checkbox ">\n' +
                // '\t\t\t\t\t\t\t\t<input class="check" id="J_CheckBox_'+mode.id+'"  type="checkbox">\n' +
                // '\t\t\t\t\t\t\t\t<label for="J_CheckBox_'+mode.id+'"></label>\n' +
                '\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t</li>\n' +
                '\t\t\t\t\t\t<li class="td td-item">\n' +
                '\t\t\t\t\t\t\t<div class="item-pic">\n' +
                '\t\t\t\t\t\t\t\t<a href="#" target="_blank" class="J_MakePoint" data-point="tbcart.8.12">\n' +
                '\t\t\t\t\t\t\t\t\t<img src="'+(path+item.imgPath)+'" style="height: 80px;width: 80px" class="itempic J_ItemImg"></a>\n' +
                '\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t<div class="item-info">\n' +
                '\t\t\t\t\t\t\t\t<div class="item-basic-info" style="margin-top: 50px">\n' +
                '\t\t\t\t\t\t\t\t\t<a href="" target="_blank" class="item-title J_MakePoint" data-point="tbcart.8.11">'+item.title+'</a>\n' +
                '\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t</li>\n' +
                '\t\t\t\t\t\t<li class="td td-info">\n' +
                '\t\t\t\t\t\t\t<div class="item-props item-props-can"></div>\n' +
                '\t\t\t\t\t\t</li>\n' +
                '\t\t\t\t\t\t<li class="td td-price">\n' +
                '\t\t\t\t\t\t\t<div class="item-price price-promo-promo">\n' +
                '\t\t\t\t\t\t\t\t<div class="price-content" style="margin-top: 30px">\n' +
                '\t\t\t\t\t\t\t\t\t<div class="price-line">\n' +
                '\t\t\t\t\t\t\t\t\t\t<em class="J_Price price-now" tabindex="0">￥'+(mode.price)+'</em>\n' +
                '\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t</li>\n' +
                '\t\t\t\t\t\t<li class="td td-amount">\n' +
                '\t\t\t\t\t\t\t<div class="amount-wrapper ">\n' +
                '\t\t\t\t\t\t\t\t<div class="item-amount ">\n' +
                '\t\t\t\t\t\t\t\t\t<div class="sl" style="margin-top: 25px">\n' +
                '\t\t\t\t\t\t\t\t\t\t<input class="min am-btn" name="" type="button" onclick="toSubNum('+mode.id+')" value="-" />\n' +
                '\t\t\t\t\t\t\t\t\t\t<input class="text_box" id="num'+mode.id+'" name="" type="text" value="'+mode.num+'" style="width:30px;" onchange="toUpdateNum('+mode.id+')" />\n' +
                '\t\t\t\t\t\t\t\t\t\t<input class="add am-btn" name="" type="button" onclick="toAddNum('+mode.id+')" value="+" />\n' +
                '\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t</li>\n' +
                '\t\t\t\t\t\t<li class="td td-sum">\n' +
                '\t\t\t\t\t\t\t<div class="td-inner" style="margin-top: 27px">\n' +
                '\t\t\t\t\t\t\t\t<em tabindex="0" class="J_ItemSum number">'+(mode.price*mode.num).toFixed(1)+'</em>\n' +
                '\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t</li>\n' +
                '\t\t\t\t\t\t<li class="td td-op">\n' +
                '\t\t\t\t\t\t\t<div class="td-inner" style="margin-top: 27px">\n' +
                '\t\t\t\t\t\t\t\t<a href="javascript:;" data-point-url="#" class="delete" onclick="toDelete('+mode.id+')">\n' +
                '\t\t\t\t\t\t\t\t\t删除</a>\n' +
                '\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t</li>\n' +
                '\t\t\t\t\t</ul>');
        }
        $("#J_Total").html(parseFloat(sum).toFixed(1));
        $("#J_SelectedItemsCount").html(number);
    },"json");

});
function toSubNum(id) {
    var num=$("#num"+id).val();
    if (num==1){
        num=1;
        $(".min").attr("disabled",true);
        return;
    }
    $(".min").attr("disabled",false);
    $("#num"+id).val(--num);
    $.get(path+"/shopcar/updateNum.do",{"id":id,"num":num},function () {
        window.location.href="shopcart.html";
    });
}
function toAddNum(id) {
    var num=$("#num"+id).val();
    $("#num"+id).val(++num);
    $.get(path+"/shopcar/updateNum.do",{"id":id,"num":num},function () {
        window.location.href="shopcart.html";
    });
}

function toUpdateNum(id) {
    var num=$("#num"+id).val();
    $.get(path+"/shopcar/updateNum.do",{"id":id,"num":num},function () {
        window.location.href="shopcart.html";
    });
}

function toDelete(id){
    $.get(path+"/shopcar/delete.do",{"id":id},function () {
        window.location.href="shopcart.html";
    })
}
//清空购物车（说多了都是泪）
$("#J_Go").click(function () {
    window.location.href="pay.html";
});

$("#ai-topsearch").click(function () {
    var keyword=$("#searchInput").val();
    window.location.href="search.html?keyword="+encodeURI(encodeURI(keyword));
})
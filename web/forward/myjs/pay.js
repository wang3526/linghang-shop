var path = "/" + location.pathname.split("/")[1];

$(function () {
    //显示地址
    $.get(path+"/address/showByUid.do",function (data) {
        //console.log(data);
        for (var i in data){
            var mode=data[i];
            var adds;
            var cla;
            if (mode.status==0){
                adds="";
                cla="user-addresslist";
            } else {
                adds="默认地址";
                cla="user-addresslist defaultAddr";
            }
            $("#address1").append('<div class="per-border"></div>\n' +
                '\t\t\t\t<li class="'+cla+'">\n' +
                '<input type="radio" name="address" onclick="selAddress('+mode.id+')" value='+mode.id+'>\n' +
                '\t\t\t\t\t<div class="address-left">\n' +
                '\t\t\t\t\t\t<div class="user DefaultAddr">\n' +
                '\n' +
                '\t\t\t\t\t\t\t\t\t\t<span class="buy-address-detail">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<span class="buy-user">'+mode.name+'</span>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<span class="buy-phone">'+mode.phone+'</span>\n' +
                '\t\t\t\t\t\t\t\t\t\t</span>\n' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t<div class="default-address DefaultAddr">\n' +
                '\t\t\t\t\t\t\t<span class="buy-line-title buy-line-title-type">收货地址：</span>\n' +
                '\t\t\t\t\t\t\t<span class="buy--address-detail">\n' +
                '\t\t\t\t\t\t\t\t   <span class="province">'+mode.province+'</span>\n' +
                '\t\t\t\t\t\t\t\t\t\t<span class="city">'+mode.city+'</span>\n' +
                '\t\t\t\t\t\t\t\t\t\t<span class="dist">'+mode.county+'</span>\n' +
                '\t\t\t\t\t\t\t\t\t\t<span class="street">'+mode.address+'</span>\n' +
                '\t\t\t\t\t\t\t\t\t</span>\n' +
                '\t\t\t\t\t\t\t</span>\n' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t<ins class="deftip">'+adds+'</ins>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="address-right">\n' +
                '\t\t\t\t\t\t<a href="../person/address.html">\n' +
                '\t\t\t\t\t\t\t<span class="am-icon-angle-right am-icon-lg"></span></a>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="clear"></div>\n' +
                '\n' +
                '\t\t\t\t\t<div class="new-addr-btn">\n' +
                '\t\t\t\t\t\t<a href="#" class="hidden">设为默认</a>\n' +
                '\t\t\t\t\t\t<span class="new-addr-bar hidden">|</span>\n' +
                '\t\t\t\t\t\t<a href="../person/address.html">编辑</a>\n' +
                '\t\t\t\t\t\t<span class="new-addr-bar">|</span>\n' +
                '\t\t\t\t\t\t<a href="javascript:void(0);" onclick="delClick('+mode.id+');">删除</a>\n' +
                '\t\t\t\t\t</div>');
        }
    },"json");

    $.post(path+"/shopcar/show.do",function (data) {
        var sum=0;
        var number=0;
        for(var i in data){
            var mode=data[i];
            var item=mode.item;
            sum+=parseFloat((mode.price*mode.num).toFixed(1));
            number+=parseInt(mode.num);
            $(".cart-table-th").append('<ul class="item-content clearfix">\n' +
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
                '\t\t\t\t\t\t\t\t\t\t<span class="text_box"style="width:30px;">'+mode.num+'</span>\n' +
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
        $(".pay-sum").html(parseFloat(sum).toFixed(1));
        $("#J_SelectedItemsCount").html(number);
    },"json");

});

$(function () {
    $.get(path+"/threeLevelLinkage/getProvinces.do",
        function (data) {
            if(data!="false"){
                for(var i=0;i<data.length;i++){
                    $("#ad-pro").append("<option value='"+data[i].code+"'>"+data[i].name+"</option>");
                }
            }
        },"json")
});

$(function () {
    $("#ad-pro").on("change",function () {
        $.get(path+"/threeLevelLinkage/getCity.do",
            {"provinceid":$("#ad-pro").val()},
            function (data) {
                $("#ad-city").empty();
                $("#ad-city").append("<option value='-1'>选择市</option>");
                $("#ad-area").empty();
                $("#ad-area").append("<option value='-1'>选择县区</option>");
                if(data!="false"){
                    for(var i=0;i<data.length;i++){
                        $("#ad-city").append("<option value='"+data[i].code+"'>"+data[i].name+"</option>")
                    }
                }
            },"json")
    });
});

$(function () {
    $("#ad-city").on("change",function () {
        $.get(path+"/threeLevelLinkage/getArea.do",
            {"cityid":$("#ad-city").val()},
            function (data) {
                $("#ad-area").empty();
                $("#ad-area").append("<option value='选择县区'>选择县区</option>");
                if(data!="false"){
                    for(var i=0;i<data.length;i++){
                        $("#ad-area").append("<option value='"+data[i].code+"'>"+data[i].name+"</option>")
                    }
                }
            },"json")
    });
});

//添加地址
$("#toSave").click(function () {
    var name=$("#user-name").val();
    var phone=$("#user-phone").val();
    var code=$("#user-code").val();
    var province=$("#ad-pro").find("option:selected").text();
    var city=$("#ad-city").find("option:selected").text();
    var county=$("#ad-area").find("option:selected").text();
    var address=$("#user-intro").val();
    if (pho()&&name.length!=0&&postcode(code)&&province!='选择省'&&city!='选择市'&&county!='选择县区'&&address.length!=0){
        $.post(path+"/address/insert.do",{"name":name,"phone":phone,"code":code,"province":province,"city":city,"county":county,"address":address},function () {
            window.location.href="pay.html";
        });
    }
    else {
        alert("请填写完整的信息!");
    }
});
//手机号验证
function pho() {
    if ($("#user-phone").val() == "") {
        //alert("手机号码不能为空！");
        return false;
    }
    if (!$("#user-phone").val().match(/^1[34578]\d{9}$/)) {
        //alert("手机号码不正确");
        return false;
    }
    // alert("手机号码正确");
    return true;
}
//邮编验证
function postcode(value)
{
    var reg=/^[1-9][0-9]{5}$/;
    var re = new RegExp(reg);
    if (re.test(value))
    {
        return true;
    }
    else
    {
        return false;
    }
}
function selAddress(id) {
    return id;
}

//获取参数
function showWindowHref() {
    var sHref = window.location.href;
    var args = sHref.split('?');
    if (args[0] == sHref) {
        return "";
    }
    var arr = args[1].split('=');
    return arr[1];
}

//选择地址
function selAddress(id) {
    $.get(path+"/dispatch/pay.do",{"id":id},function (data) {
        $("#way").html(data.way);
        $("#freight").html(data.cost);
    },"json");
}

$("#J_Go").click(function () {
    var buymassage=$("#buymassage").val();
    var raId=$("input[name='address']:checked").val();
    var postFee=$("#freight").text();
    var payment=$(".pay-sum").text();
    var sum=parseFloat(payment)+parseFloat(postFee);
    $.post(path+"/order/addOrder.do",
        {
            "payment":sum,
            "postFee":postFee,
            "buymessage":buymassage,
            "raId":raId
        },function (data) {
            window.location.href="payway.html?code="+data;
    },"json")
});

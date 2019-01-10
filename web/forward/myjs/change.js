var path = "/" + location.pathname.split("/")[1];

$(function () {
    $.get(path+"/order/getRefundOrder.do",function (data) {
        addEle(data);
    },"json")
})

function addEle(data) {
    for(var i in data){
        var mode=data[i];
        var retTime=mode.retTime;
        var date=new Date(retTime);
        var time=formatDate(date);
        $("#order-list0").append('<div class="order-title">\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t<div class="dd-num">订单编号：<a href="javascript:;">'+mode.code+'</a></div>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t<span>申请时间：'+time+'</span>\n' +
            '<div id="order-content'+i+'" className="order-content">'+
            '<div className="order-left" id="pro'+i+'">'+
            '</div>'+
            '<div id="order-right'+i+'" className="order-right" style="right: 485px;width: 80px">'+
                '<li className="td td-amount">'+
                    '<div className="item-amount">'+Number(mode.payment)+'&nbsp;元'+
                    '</div>'+
                '</li>'+
            '</div>'+
            '<div id="order-right1'+i+'" className="order-right" style="right: 385px;width: 80px">'+
                '<li className="td td-amount">'+
                    '<div className="item-amount">'+Number(mode.payment)+'&nbsp;元'+
                    '</div>'+
                '</li>'+
            '</div>'+
            '<div id="order-right2'+i+'" className="order-right" style="right: 295px;width: 80px">'+
                '<li className="td td-amount">'+
                    '<div id="item-status'+i+'" className="item-status">'+

                    '</div>'+
                '</li>'+
            '</div>'+
            '<div id="order-right3'+i+'" className="order-right" style="right: 110px;width: 80px">'+
                '<li className="td td-amount">'+
                    '<a href="record.html" class="am-btn am-btn-danger anniu">钱款去向</a>' +
                '</li>'+
            '</div>'+
            '\t\t\t\t\t\t\t\t\t\t\t</div>'+
            '</div>');
        $("#order-content"+i).addClass("order-content");
        $("#pro"+i).addClass("order-left");
        $("#order-right"+i).addClass("order-right");
        $("#order-right1"+i).addClass("order-right");
        $("#move-right"+i).addClass("move-right");
        $("#move-right1"+i).addClass("move-right");
        $("#td-status"+i).addClass("td td-status");
        $("#order-right2"+i).addClass("order-right");
        $("#order-right3"+i).addClass("order-right");
        $("#item-status"+i).addClass("item-status");
        $("#Mystatus"+i).addClass("Mystatus");
        $("#td-change"+i).addClass("td-change");
        for(var j in mode.list){
            var item=mode.list[j];
            $("#pro"+i).append('<ul id="item-list" className="item-list">'+
                '<li id="td-item'+i+j+'" className="td td-item">'+
                '<div id="item-pic'+i+j+'" className="item-pic">'+
                    '<a id="J_MakePoint'+i+j+'" href="#" className="J_MakePoint">'+
                        '<img id="J_ItemImg'+i+j+'" src="'+path+item.picPath+'" className="itempic J_ItemImg">'+
                    '</a>'+
                '</div>'+
                '<div id="item-info'+i+j+'" className="item-info">'+
                    '<div id="item-basic-info'+i+j+'" className="item-basic-info">'+
                        '<a href="#">'+
                            '<span style="margin: 20px 30px 0px 10px;display: inline-block">'+item.title+'</span>'+
                        '</a>'+
                        '<p style="margin: -15px 10px 5px 0px;display: inline-block">'+item.color+'</p>'+
                        '<p style="margin: -15px 0px 5px 0px;display: inline-block">'+item.memory+'</p>'+
                    '</div>'+
                '</div>'+
                '</ul>');
            $("#item-list"+i+j).addClass("item-list");
            $("#td-item"+i+j).addClass("td td-item");
            $("#item-pic"+i+j).addClass("item-pic");
            $("#J_MakePoint"+i+j).addClass("J_MakePoint");
            $("#J_ItemImg"+i+j).addClass("itempic J_ItemImg");
            $("#item-info"+i+j).addClass("item-info");
            $("#item-basic-info"+i+j).addClass("item-basic-info");
        }
        if(mode.status==5){
            $("#item-status"+i).append('<p class="Mystatus" style="width: 100px;right:29%;top:42%">退款中</p>');
            $("#item-status"+i).addClass("Mystatus");
        }else if(mode.status==6){
            $("#item-status"+i).append('<p class="Mystatus" style="width: 100px;right:29%;top:42%">退款成功</p>');
            $("#item-status"+i).addClass("Mystatus");
        }
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

$("#ai-topsearch").click(function () {
    var keyword=$("#searchInput").val();
    window.location.href="../home/search.html?keyword="+encodeURI(encodeURI(keyword));
})
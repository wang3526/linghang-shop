var page=1;
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
    var status=GetQueryString("status");
    var way;
    if(status==1){
        way="待付款";
    }else if(status==2){
        way="待发货";
    }else if(status==3){
        way="待收货";
    }else if(status==4){
        way="交易成功";
    }else if(status==5){
        way="退款中";
    }else if(status==6){
        way="已退款";
    }else if(status==7){
        way="交易关闭";
    }
    $.get(path+"/order/getOrderItemByCode.do",
        {"code":code},
        function (data) {
            if(data!="false"){
                $("#o-user").append('<span id="oCode">订单号：'+data.code+'</span><span class="label label-success radius" style="margin-left: 40px">'+way+'</span><br>');
                $.get(path+"/user/getUserById.do",{"id":data.userId},function (user) {
                    $("#o-user").append('<span>用户账号：'+user.username+'</span>');
                },"json");
                $.get(path+"/address/findById.do",{"id":data.raId},function (address) {
                    var add=address.province+'-'+address.city+'-'+address.county+'-'+address.address;
                    $("#o-add").append('<span>收货人：'+address.name+'</span><br><span>收货电话：'+address.phone+'</span><br>'+
                        '<span>收货地址：<span>'+add+'</span></span><br>');
                    $("#o-breed").append('<span>配送费：郑州--->'+add+'('+data.postFee+'元)</span><br>');
                },"json");
                if(data.buyerMessage!=undefined){
                    $("#o-add").append('<span>买家留言：'+data.buyerMessage+'</span><br>');
                }
                for (var i in data.list){
                    var mode=data.list[i];
                    $("#tb").append('<tr class="text-c">\n' +
                        '\t\t\t\t<td>'+ mode.id+'</td>\n' +
                        '\t\t\t\t<td><img src="'+path+mode.picPath+'" width="100px" height="70px"></td>\n'+
                        '\t\t\t\t<td>'+ mode.title+'</td>\n' +
                        '\t\t\t\t<td>'+ mode.color+'</td>\n' +
                        '\t\t\t\t<td>'+ mode.memory+'</td>\n' +
                        '\t\t\t\t<td>'+ mode.price+'</td>\n' +
                        '\t\t\t\t<td>'+ mode.num+'</td>\n'
                    )
                }
                $("#o-breed").append('<span>实付款：'+data.payment+'元</span><br>');

                var date1=new Date(data.createTime);
                var date2=new Date(data.paymentTime);
                var date3=new Date(data.consignTime);
                var date4=new Date(data.recTime);
                var date5=new Date(data.retTime);
                var date6=new Date(data.sretTime);
                var date7=new Date(data.closeTime);
                var time1=formatDate(date1);
                var time2=formatDate(date2);
                var time3=formatDate(date3);
                var time4=formatDate(date4);
                var time5=formatDate(date5);
                var time6=formatDate(date6);
                var time7=formatDate(date7);
                if(data.status==1){
                    $("#o-order").append('<span>提交订单时间：'+time1+'</span>');
                }else if(data.status==2){
                    $("#o-order").append('<span>提交订单时间：'+time1+'</span><br>'+
                    '<span>付款时间：'+time2+'</span>');
                }else if(data.status==3){
                    $("#o-order").append('<span>物流名称：'+data.shippingName+'</span><br>'+
                        '<span id="code">物流单号：'+data.shippingCode+'</span><br>');
                    $("#o-order").append('<span>提交订单时间：'+time1+'</span><br>'+
                        '<span>付款时间：'+time2+'</span><br>'+
                    '<span>发货时间：'+time3+'</span>');
                }else if(data.status==4){
                    $("#o-order").append('<span>物流名称：'+data.shippingName+'</span><br>'+
                        '<span id="code">物流单号：'+data.shippingCode+'</span><br>');
                    $("#o-order").append('<span>提交订单时间：'+time1+'</span><br>'+
                        '<span>付款时间：'+time2+'</span><br>'+
                        '<span>发货时间：'+time3+'</span><br>'+
                    '<span>确认收货时间：'+time4+'</span>');
                }else if(data.status==5){
                    $("#o-order").append('<span>物流名称：'+data.shippingName+'</span><br>'+
                        '<span id="code">物流单号：'+data.shippingCode+'</span><br>');
                    $("#o-order").append('<span>提交订单时间：'+time1+'</span><br>'+
                        '<span>付款时间：'+time2+'</span><br>'+
                        '<span id="way">发货时间：'+time3+'</span><br>'+
                    '<span>申请退款时间：'+time5+'</span>');
                }else if(data.status==6){
                    $("#o-order").append('<span>物流名称：'+data.shippingName+'</span><br>'+
                        '<span id="code">物流单号：'+data.shippingCode+'</span><br>');
                    $("#o-order").append('<span>提交订单时间：'+time1+'</span><br>'+
                        '<span>付款时间：'+time2+'</span><br>'+
                        '<span>发货时间：'+time3+'</span><br>'+
                        '<span>申请退款时间：'+time5+'</span><br>'+
                    '<span>退款时间：'+time6+'</span>');
                }else if(data.status==7){
                    $("#o-order").append('<span>物流名称：'+data.shippingName+'</span><br>'+
                        '<span id="code">物流单号：'+data.shippingCode+'</span><br>');
                    $("#o-order").append('<span>提交订单时间：'+time1+'</span><br>'+
                        '<span>付款时间：'+time2+'</span><br>'+
                        '<span>发货时间：'+time3+'</span><br>'+
                        '<span>确认收货时间：'+time4+'</span><br>'+
                    '<span>交易关闭时间：'+time7+'</span>');
                }

            }
        },"json")
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

$(function () {
    var code=GetQueryString("code");
    $("#o-submit").click(function () {
        var tmp=$('input[name="radio"]:checked').val();
        if(tmp==0){
            $.get(path+"/order/refundSuccess.do",
                {"code":code,"status":6},
                function (data) {
                    if(data=="true"){
                        window.location.href="order-list.html";
                    }
                },"json")
        }else {
            var way1=$("#way").text();
            var status;
            if(way1==null){
                status=2;
            }else {
                status=3;
            }
            $.get(path+"/order/updateStatusByCode.do",
                {"code":code,"status":status},
                function (data) {
                    if(data=="true"){
                        window.location.href="order-list.html";
                    }
                },"json")
        }
    })
})
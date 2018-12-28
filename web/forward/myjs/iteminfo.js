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
    var id=GetQueryString("id");
    $.get(path+"/item/getItemById.do",{"id":id},function (data) {
        if(data!="false"){
            $("#img").attr("src",path+data.imgPath);
            $("#img").attr("mid",path+data.imgPath);
            $("#img").attr("big",path+data.imgPath);
            $("#toShow").attr("src",path+data.imgPath);
            $("#toShow").attr("rel",path+data.imgPath);
            $("#item-sell").text(data.sellPoint);
            $("#item-price").text(data.price);
            var arr=split(data.itemSpecification.fuselageColor);
            for(var i in arr){
                if(i==0){
                    $("#fuselage-color").append('<li id="color'+i+'" class="sku-line selected">'+arr[i]+'<i></i></li>');
                }else {
                    $("#fuselage-color").append('<li id="color'+i+'" class="sku-line">'+arr[i]+'<i></i></li>');
                }
                $('ul li').click(function(){
                    $(this).siblings('li').removeClass('selected');
                    $(this).addClass('selected');
                })
            }
            var arr1=split(data.itemSpecification.storageCapacity);
            for(var i in arr1){
                if(i==0){
                    $("#storage-capacity").append('<li id="color'+i+'" class="sku-line selected">'+arr1[i]+'<i></i></li>');
                }else {
                    $("#storage-capacity").append('<li id="color'+i+'" class="sku-line">'+arr1[i]+'<i></i></li>');
                }
                $('ul li').click(function(){
                    $(this).siblings('li').removeClass('selected');
                    $(this).addClass('selected');
                })
            }
            $("#item-num").text(data.num);
            $("#i-descript").append(data.descript);
            $("#tb").append('<tr><th class="head-th" colspan="2">拍照功能</th></tr>' +
                '<tr><th class="body-th">后置摄像头</th>' +
                '<td class="body-td">'+data.itemSpecification.rearCamera+'</td></tr>' +
                '<tr><th class="body-th">摄像头类型</th>' +
                '<td class="body-td">'+data.itemSpecification.cameraType+'</td></tr>' +
                '<tr><th class="body-th">视频显示格式</th>' +
                '<td class="body-td">'+data.itemSpecification.videoFormat+'</td></tr>' +
                '<tr><th class="head-th" colspan="2">显示</th></tr>' +
                '<tr><th class="body-th">分辨率</th>' +
                '<td class="body-td">'+data.itemSpecification.resolution+'</td></tr>' +
                '<tr><th class="body-th">触摸屏类型</th>' +
                '<td class="body-td">'+data.itemSpecification.screenType+'</td></tr>' +
                '<tr><th class="body-th">屏幕尺寸</th>' +
                '<td class="body-td">'+data.itemSpecification.screenSize+'</td></tr>' +
                '<tr><th class="head-th" colspan="2">网络</th></tr>' +
                '<tr><th class="body-th">网络类型</th>' +
                '<td class="body-td">'+data.itemSpecification.networkType+'</td></tr>' +
                '<tr><th class="body-th">网络模式</th>' +
                '<td class="body-td">'+data.itemSpecification.networkMode+'</td></tr>' +
                '<tr><th class="head-th" colspan="2">机身详情</th></tr>' +
                '<tr><th class="body-th">键盘类型</th>' +
                '<td class="body-td">'+data.itemSpecification.keyboardType+'</td></tr>' +
                '<tr><th class="body-th">款式</th>' +
                '<td class="body-td">'+data.itemSpecification.style+'</td></tr>' +
                '<tr><th class="head-th" colspan="2">存储</th></tr>' +
                '<tr><th class="body-th">运行内存RAM</th>' +
                '<td class="body-td">'+data.itemSpecification.runMemory+'</td></tr>' +
                '<tr><th class="body-th">存储容量</th>' +
                '<td class="body-td">'+data.itemSpecification.storageCapacity+'</td></tr>' +
                '<tr><th class="head-th" colspan="2">基本参数</th></tr>' +
                '<tr><th class="body-th">品牌</th>' +
                '<td class="body-td">'+data.itemSpecification.itemBrand+'</td></tr>' +
                '<tr><th class="body-th">型号</th>' +
                '<td class="body-td">'+data.itemSpecification.model+'</td></tr>' +
                '<tr><th class="body-th">电池类型</th>' +
                '<td class="body-td">'+data.itemSpecification.batteryType+'</td></tr>' +
                '<tr><th class="body-th">核心数</th>' +
                '<td class="body-td">'+data.itemSpecification.coreNumber+'</td></tr>' +
                '<tr><th class="body-th">机身颜色</th>' +
                '<td class="body-td">'+data.itemSpecification.fuselageColor+'</td></tr>' +
                '<tr><th class="body-th">手机类型</th>' +
                '<td class="body-td">'+data.itemSpecification.phoneType+'</td></tr>' +
                '<tr><th class="body-th">操作系统</th>' +
                '<td class="body-td">'+data.itemSpecification.operatingSystem+'</td></tr>' +
                '<tr><th class="body-th">cpu品牌</th>' +
                '<td class="body-td">'+data.itemSpecification.cpuBrand+'</td></tr>' +
                '<tr><th class="body-th">产品名称</th>' +
                '<td class="body-td">'+data.itemSpecification.productName+'</td></tr>' +
                '')
        }
    },"json")
})

function split(tmp) {
    var arr=new Array();
    arr=tmp.split(" ");
    return arr;
}

$(function () {
    var id=GetQueryString("id");
    $.get(path+"/item//getCateItemById.do",{"id":id},function (data) {
        for(var i in data){
            $("#item-list").append('<li class="first">\n' +
                '\t\t\t\t\t\t\t      \t<div class="p-img">                    \n' +
                '\t\t\t\t\t\t\t      \t\t<a  href="../home/introduction.html?id='+data[i].id+'"> <img class="" src='+path+data[i].imgPath+'> </a>               \n' +
                '\t\t\t\t\t\t\t      \t</div>\n' +
                '\t\t\t\t\t\t\t      \t<div class="p-name"><a href="#">\n' +
                data[i].sellPoint+
                '\t\t\t\t\t\t\t      \t</a>\n' +
                '\t\t\t\t\t\t\t      \t</div>\n' +
                '\t\t\t\t\t\t\t      \t<div class="p-price"><strong>￥'+data[i].price+'</strong></div>\n' +
                '\t\t\t\t\t\t\t      </li>')
        }
    },"json")
})
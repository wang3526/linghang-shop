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
    },"json");
    $("#LikBuy").attr("onclick","toBuy("+id+")");
    $("#LikBasket").attr("onclick","addCart("+id+")");
})

$(function () {
    var id=GetQueryString("id");
    $.get(path+"/evaluate/show.do",{"iId":id},function (data) {
        for (var i in data){
            var mode=data[i];
            console.log(mode);
            var time=new Date(mode.create_time);
            $("#i-context").append('<li class="am-comment">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<!-- 评论容器 -->\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<a href="">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<img class="am-comment-avatar" src="'+(path+mode.img_path)+'" />\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<!-- 评论者头像 -->\n' +
                '\t\t\t\t\t\t\t\t\t\t\t</a>\n' +
                '\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<div class="am-comment-main">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<!-- 评论内容容器 -->\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<header class="am-comment-hd">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<!--<h3 class="am-comment-title">评论标题</h3>-->\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="am-comment-meta">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- 评论元数据 -->\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="#link-to-user" class="am-comment-author">用户：'+mode.username+'</a>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- 评论者 -->\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t评论于\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<time datetime="">'+formatDate(time)+'</time>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t</header>\n' +
                '\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<div class="am-comment-bd">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="tb-rev-item " data-id="255776406962">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="J_TbcRate_ReviewContent tb-tbcr-content ">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'+mode.context+'\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="tb-r-act-bar">\n' +
                // '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t颜色分类：柠檬黄&nbsp;&nbsp;尺码：S\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<!-- 评论内容 -->\n' +
                '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t</li>');
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

//加入购物车
function addCart(id){
    var num=$("#text_box").val();
    var color=$("#fuselage-color").find(".selected").text();
    var memory=$("#storage-capacity").find(".selected").text();
    $.post(path+"/shopcar/addShopcar.do",{"itemId":id,"price":$("#item-price").text(),"color":color,"memory":memory,"num":num},function (data) {
        alert(data);
    },"json");
}
//立即购买
function toBuy(id) {
    var flag=confirm("确定购买？");
    if (flag) {
        var num = $("#text_box").val();
        var color=$("#fuselage-color").find(".selected").text();
        var memory=$("#storage-capacity").find(".selected").text();
        $.post(path + "/shopcar/addOrderOne.do", {"itemId":id,"price":$("#item-price").text(),"color":color,"memory":memory,"num":num}, function (data) {
            window.location.href = "pay.html";
        },"json");
    }
}
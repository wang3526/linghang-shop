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
    if(parentId!=null){
        $.get(path+"/itemCategory/getShowAllItem.do",{"parentId":parentId},function (data) {
            addEle(data);
        },"json")
    }
})

function addEle(data){
    for(var i in data){
        $("#item-all").append('<li>\n' +
            '\t\t\t\t\t\t\t\t\t\t<div class="i-pic limit">\n' +
            '\t\t\t\t\t\t\t\t\t\t\t<a href="../home/introduction.html?id='+data[i].id+'" style="margin:20px 20px"><img style="width: 180px;height: 240px;" src='+path+data[i].imgPath+' /></a>\t\t\t\t\t\t\t\t\t\t\t\n' +
            '\t\t\t\t\t\t\t\t\t\t\t<p class="title fl">'+data[i].sellPoint+'</p>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t<p class="price fl">\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t<b style="margin-left: 70px">¥</b>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t<strong>'+data[i].price+'&nbsp;元</strong>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t</p>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t<p class="number fl">\n' +
            '\t\t\t\t\t\t\t\t\t\t\t</p>\n' +
            '\t\t\t\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t\t\t</li>')
    }
}

$(function () {
    var keyword=decodeURI(GetQueryString("keyword"));
    var name=decodeURI(GetQueryString("name"));
    if(keyword!="null"){
        $("#searchInput").val(keyword);
    }
    if(name!="null"){
        $("#searchInput").val(name);
    }
})
//获取品牌名称
$(function () {
    $.get(path+"/itemCategory/getRoot.do",function (data) {
        if(data!="false"){
            for(var i in data){
                if(i==0){
                    $("#brand-all").append('<a style="cursor: pointer" onclick="select(this)">全部</a>');
                }
                $("#search-brand").append('<dd><a style="cursor: pointer" onclick="select(this)">'+data[i].name+'</a></dd>');
            }
            $("#select1 dd").click(function () {
                $(this).addClass("selected").siblings().removeClass("selected");
                if ($(this).hasClass("select-all")) {
                    $("#selectA").remove();
                } else {
                    var copyThisA = $(this).clone();
                    if ($("#selectA").length > 0) {
                        $("#selectA a").html($(this).text());
                    } else {
                        $(".select-result dl").append(copyThisA.attr("id", "selectA"));
                    }
                }
            });
        }
    },"json")
})

$(function () {
    var keyword=decodeURI(GetQueryString("keyword"));
    if(keyword!=null){
        $.get(path+"/item/getItemByName.do",{"keyword":keyword},function (data) {
            if(data!="false"){
                addEle(data);
            }
        },"json")
    }
})

function select(arr) {
    var str=arr.innerText;
    var tmp=$(arr).parent().parent().parent()[0];
    var a=$("#select1")[0];
    var b=$("#select2")[0];
    var c=$("#select3")[0];
    var se1=$("#select1").find(".selected")[0].firstChild.innerText;
    var se2=$("#select2").find(".selected")[0].firstChild.innerText;
    var se3=$("#select3").find(".selected")[0].firstChild.innerText;
    var queryString="";
    if(tmp==a){
        queryString=queryString+"itemBrand="+str+"&phoneType="+se2+"&storageCapacity="+se3;
    }
    if(tmp==b){
        queryString=queryString+"itemBrand="+se1+"&phoneType="+str+"&storageCapacity="+se3;
    }
    if(tmp==c){
        queryString=queryString+"itemBrand="+se1+"&phoneType="+se2+"&storageCapacity="+str;
    }
    console.log(queryString);
    $.get(path+"/itemSpecification/getItem.do",queryString.toString(),function (data) {
        $("#item-all").empty();
        for(var i in data){
            $("#item-all").append('<li>\n' +
                '\t\t\t\t\t\t\t\t\t\t<div class="i-pic limit">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<a href="../home/introduction.html?id='+data[i].id+'" style="margin:20px 20px"><img style="width: 180px;height: 240px;" src='+path+data[i].img_path+' /></a>\t\t\t\t\t\t\t\t\t\t\t\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<p class="title fl">'+data[i].sell_point+'</p>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<p class="price fl">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<b style="margin-left: 70px">¥</b>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<strong>'+data[i].price+'&nbsp;元</strong>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t</p>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<p class="number fl">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t</p>\n' +
                '\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t</li>');
        }
    },"json")
}

$("#ai-topsearch").click(function () {
    var keyword=$("#searchInput").val();
    window.location.href="search.html?keyword="+encodeURI(encodeURI(keyword));
})
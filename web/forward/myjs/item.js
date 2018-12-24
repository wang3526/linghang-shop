var path = "/" + location.pathname.split("/")[1];

$(function () {
    $.get(path+"/itemCategory/getRoot.do",function (data) {
        if(data!="false"){
            for(var i in data){
                showList(data[i])
                getShow(data[i].id,data[i].name,i)
            }
        }
    },"json");
});

function getShow(parentId,name,tmp) {
    //展示商品
    $.get(path + "/itemCategory/show.do",{"parentId":parentId}, function (data) {
        if(data.length>0){
            $("#showItem").before('<div id="item'+tmp+'" class="f'+ ++tmp+'">\n' +
                '\t\t\t\t\t\t\t\t<div class="am-container " >\n' +
                '\t\t\t\t\t\t\t\t\t<div class="shopTitle ">\n' +
                '\t\t\t\t\t\t\t\t\t\t<h4 class="floor-title">'+name+'</h4>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<div class="floor-subtitle"></div>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<div class="today-brands " style="right:0px ;top:13px;">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<a href="search.html?id='+parentId+'">更多>></a>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t</div>' +
                '\t\t\t\t\t\t\t\t<div id="item-cen'+tmp+'" class="am-g am-g-fixed floodSix ">' +
                '\t\t\t\t\t\t\t\t</div>' +
                '</div>');
        }
        for (var i in data) {
            var mode = data[i];
            $("#item-cen"+tmp).append('<li>\n' +
                '                        <div class="am-u-sm-4 am-u-md-5 am-u-lg-4 text-five" style="margin: 5px;width: 230px">\n' +
                '                            <div class="boxLi"></div>\n' +
                '                            <div class="outer-con">\n' +
                '                                <div class="title">\n' +mode.sellPoint+
                '                                </div>\n' +
                '                                <div class="sub-title" style="color: red;font-size: 20px">\n￥' +mode.price+
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <a href="introduction.html?id='+mode.id+'"><img style="width: 180px;height: 230px;" src='+path+mode.imgPath+' /></a>\n' +
                '                        </div>\n' +
                '                    </li>');
        }
    }, "json");
}

function showList(cate) {
    $.get(path+"/itemCategory/getPro.do",{"parentId":cate.id},function (data) {
        if(data!="false"){
            $("#js_climit_li").append('<li class="" id="h-li'+cate.id+'">\n' +
                '<div class="category-info">\n' +
                '<h3 class="category-name b-category-name"><i><img src="../images/phone.jpg"></i><a class="ml-22" title="'+cate.name+'">'+cate.name+'</a></h3>\n' +
                '<em>&gt;</em>\n' +
                '</div>' +
                '<div id="menu-item'+cate.id+'" class="menu-item menu-in top" style="display: none">\n' +
                '                <div class="area-in">\n' +
                '                 <div class="area-bg">\n' +
                '                    <div class="menu-srot">\n' +
                '                   <div class="sort-side" id="h-sort'+cate.id+'">\n' +
                '                </div>\n' +
                '                </div>\n' +
                '                </div>\n' +
                '                </div>\n' +
                '                </div>\n' +
                '                <b class="arrow"></b>\n' +
                '</li>')
                $("#h-li"+cate.id).hover(
                    function() {
                        $("#menu-item"+cate.id).css("display","block");
                        },
                    function () {
                    $("#menu-item"+cate.id).css("display","none");
                });
            for(var i in data){
                $("#h-sort"+cate.id).append('<dl class="dl-sort" id="dl-sort'+data[i].id+'"><dt><span title="'+data[i].name+'">'+data[i].name+'</span></dt></dl>')
                getItemList(data[i].id)
            }

        }
    },"json")
}

function getItemList(id) {
    $.get(path+"/itemCategory/getListItem.do",{"id":id},function (data) {
        if(data.length>0){
           for (var i in data){
                var mode=data[i];
                $("#dl-sort"+id).append('<dd><a title="'+mode.title+'" href="introduction.html?id='+mode.id+'"><span>'+mode.title+'</span></a></dd>')
            }
        }
    },"json")
}
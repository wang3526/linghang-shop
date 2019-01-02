var path = "/" + location.pathname.split("/")[1];
$(function () {
    $.get(path+"/evaluate/showByUser.do",function (data) {
        $(".item-list").css("height","120px");
        for (var i in data){
            var mode=data[i];
            var time=new Date(mode.create_time);
            $(".comment-main").append('<ul class="item-list">' +
                '<li class="td td-item">\n' +
                '\t\t\t\t\t\t\t\t\t\t<div class="item-pic">\n' +
                '\t\t\t\t\t\t\t\t\t\t<a href="#" class="J_MakePoint">\n' +
                '\t\t\t\t\t\t\t\t\t\t<img src="'+(path+mode.img_path)+'" class="itempic">\n' +
                '\t\t\t\t\t\t\t\t\t\t</a>\n' +
                '\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t</li>\n' +
                '\n' +
                '\t\t\t\t\t\t\t\t\t\t<li class="td td-comment">\n' +
                '\t\t\t\t\t\t\t\t\t\t<div class="item-title">\n' +
                '\t\t\t\t\t\t\t\t\t\t<div class="item-opinion">好评</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t<div class="item-name">\n' +
                '\t\t\t\t\t\t\t\t\t\t<a href="#">\n' +
                '\t\t\t\t\t\t\t\t\t\t<p class="item-basic-info">'+mode.title+'</p>\n' +
                '\t\t\t\t\t\t\t\t\t\t</a>\n' +
                '\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t<div class="item-comment">\n' +
                '\t\t\t\t\t\t\t\t\t\t'+mode.context+'..<br>\n' +
                '\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\n' +
                '\t\t\t\t\t\t\t\t\t\t<div class="item-info">\n' +
                '\t\t\t\t\t\t\t\t\t\t<div>\n' +
                '\t\t\t\t\t\t\t\t\t\t<p class="info-little"><span>'+mode.price+' &nbsp;元</span> </p>\n' +
                '\t\t\t\t\t\t\t\t\t\t<p class="info-time">'+formatDate(time)+'</p>\n' +
                '\n' +
                '\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t</li>' +
                '</ul>');
        }
    },"json");
});
function formatDate(times) {
    var year=times.getFullYear();
    var month=times.getMonth()+1;
    var date=times.getDate();
    var hour=times.getHours();
    var minute=times.getMinutes();
    var second=times.getSeconds();
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}
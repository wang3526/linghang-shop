var page=1;
var path = "/" + location.pathname.split("/")[1];

$(function () {
    $.get(path+"/itemCategory/getRoot.do",function (data) {
        if(data!="false"){
            for (var i in data) {
                $("#p-a-root").append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
            }
        }
    },"json");
});
//获取二级目录
$(function () {
    $("#p-a-root").on("change",function () {
        $.get(path+"/itemCategory/getPro.do",{"parentId":$("#p-a-root").val()},function (data) {
            if(data!="false"){
                $("#p-a-second").empty();
                $("#p-a-second").append("<option value='0'>--二级目录--</option>");
                $("#p-a-item").empty();
                $("#p-a-item").append("<option value='0'>--商品--</option>");
                for (var i in data) {
                    $("#p-a-second").append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
                }
            }else {
                $("#p-a-second").empty();
                $("#p-a-second").append("<option value='0'>--二级目录--</option>");
            }
        },"json")
    })
});

//获取商品
$(function () {
    $("#p-a-second").on("change",function () {
        $.get(path+"/item/getItemByCid.do",{"cId":$("#p-a-second").val()},function (data) {
            if(data!="false"){
                $("#p-a-item").empty();
                $("#p-a-item").append("<option value='0'>--商品--</option>");
                for (var i in data) {
                    $("#p-a-item").append("<option value='" + data[i].id + "'>" + data[i].title + "</option>");
                }
            }else {
                $("#p-a-item").empty();
                $("#p-a-item").append("<option value='0'>--商品--</option>");
            }
        },"json")
    })
})

$(function () {
    $("#p-a-item").on("change",function () {
        $.get(path+"/itemSpecification/testByIid.do",{"iId":$("#p-a-item").val()},function (data) {
            if(data!="false") {
                $("#msg").text("该商品已添加规格参数，请重新选择");
                $("#msg").css("color","red");
            }else {
                $("#msg").text("该商品未添加规格参数，请添加");
                $("#msg").css("color","green");
            }
        },"json")
    })
})

$(function () {
    $("#save").click(function () {
        $.post(path+"/itemSpecification/addSpecification.do",
            {"iId":$("#p-a-item").val(),"cameraType":$("#camera-type").val(),"rearCamera":$("#rear-camera").val(),
                "videoFormat":$("#video-format").val(),"resolution":$("#resolution").val(),"screenType":$("#screen-type").val(),
                "screenSize":$("#screen-size").val(),"networkType":$("#network-type").val(),"networkMode":$("#network-mode").val(),
                "keyboardType":$("#keyboard-type").val(),"style":$("#style").val(),"runMemory":$("#run-memory").val(),
                "storageCapacity":$("#storage-capacity").val(),"itemBrand":$("#i-brand").val(),"model":$("#model").val(),
                "batteryType":$("#battery-type").val(),"coreNumber":$("#core-number").val(),"fuselageColor":$("#fuselage-color").val(),
                "phoneType":$("#phone-type").val(),"operatingSystem":$("#operating-system").val(),"cpuBrand":$("#cpu-brand").val(),
                "productName":$("#product-name").val()},
            function (data) {
                if(data=="true"){
                    window.location.href="specification-list.html";
                }
            },"json")
    })
})

function showSpecification() {
    $.post(path+"/itemSpecification/select.do",
        {
            "brand":$("#i-l-brand").val(),
            "model":$("#i-l-model").val(),
            "size":$("#selectnum").val(),
            "page":page
        },
        function (data) {
            if(data!="false"){
                $("#num").html(data.length);
                if (data.length<($(".select").val())){
                    $("#next").attr("disabled",true);
                }else {
                    $("#next").attr("disabled",false);
                }
                $("#tb").empty();
                addEle(data);
            }else {
                $("#tb").empty();
            }
        },"json");
}

$(function () {
    showSpecification();
})

$(function () {
    $("#i-l-submit").click(function () {
        showSpecification();
    })
})
//动态添加
function addEle(data) {
    for (var i in data){
        var mode=data[i];
        $("#tb").append('<tr class="text-c">\n' +
            '\t\t\t\t<td><input type="checkbox" value="1" name=""></td>\n' +
            '\t\t\t\t<td>'+ mode.id+'</td>\n' +
            '\t\t\t\t<td>'+ mode.productName+'</td>\n' +
            '\t\t\t\t<td>'+ mode.screenSize+'</td>\n' +
            '\t\t\t\t<td>'+ mode.networkType+'</td>\n' +
            '\t\t\t\t<td>'+ mode.runMemory+'</td>\n' +
            '\t\t\t\t<td>'+ mode.storageCapacity+'</td>\n' +
            '\t\t\t\t<td>'+ mode.cpuBrand+'</td>\n' +
            '\t\t\t\t<td class="td-manage"><a title="修改" href="'+path+'/background/specification-edit.html?id='+mode.id+'" className="ml-5" style="text-decoration:none"><i className="Hui-iconfont">&#xe6df;</i></a>&nbsp;'+
            '\t\t\t</tr>');
    }
}

//上一页
$("#previous").click(function () {
    if (page==1){
        return;
    }
    page--;
    showSpecification();
});
//下一页
$("#next").click(function () {
    page++;
    showSpecification();
});
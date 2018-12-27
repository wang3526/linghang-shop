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
    $.get(path+"/itemSpecification/getSpecificationById.do",
        {"id":id},function (data) {
            if(data!="false"){
                $("#camera-type").val(data.cameraType);
                $("#rear-camera").val(data.rearCamera);
                $("#video-format").val(data.videoFormat);
                $("#resolution").val(data.resolution);
                $("#screen-type").val(data.screenType);
                $("#screen-size").val(data.screenSize);
                $("#network-type").val(data.networkType);
                $("#network-mode").val(data.networkMode);
                $("#keyboard-type").val(data.keyboardType);
                $("#style").val(data.style);
                $("#run-memory").val(data.runMemory);
                $("#storage-capacity").val(data.storageCapacity);
                $("#i-brand").val(data.itemBrand);
                $("#model").val(data.model);
                $("#battery-type").val(data.batteryType);
                $("#core-number").val(data.coreNumber);
                $("#fuselage-color").val(data.fuselageColor);
                $("#phone-type").val(data.phoneType);
                $("#operating-system").val(data.operatingSystem);
                $("#cpu-brand").val(data.cpuBrand);
                $("#product-name").val(data.productName);
            }
        },"json")
})

$(function () {
    var id=GetQueryString("id");
    $("#save").click(function () {
        $.post(path+"/itemSpecification/editSpecification.do",
            {"id":id,"cameraType":$("#camera-type").val(),"rearCamera":$("#rear-camera").val(),
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
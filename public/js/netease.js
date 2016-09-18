var selectedscriptName = null;
var selectScriptId = null;
var socketIoName = null;//socket.io连接标识
var socket = null;

//响应运行按钮
function onRunClick(){
    document.getElementById("result").innerHTML = ""; 
    $("#sbt").button("loading");
    responseForClick();
}

function responseForClick(){    
    var runPara = getInputScriptRunParameter();//输入的参数获取
    var scriptName = selectedscriptName;
    var scriptId = selectScriptId;

    //发送执行脚本的请求
    socket.emit('urlReq', { id:scriptId,para:runPara,socketName:socketIoName});
}

//响应脚本选择
function onHerfClick(scriptId,scriptName,paramName){
    document.getElementById("result").innerHTML = "";//清空原来记录
    selectScriptId = scriptId;
    selectedscriptName = scriptName;	
	document.getElementById("resultTitle").innerHTML= scriptName;
    document.getElementById("form").innerHTML = "";
    if(paramName!="000"){
        var paramArray = paramName.split(",");        
        for(var i=0;i<paramArray.length;i++){
            var currentParaContent = paramArray[i].split(" ");
            if(currentParaContent.length==1){
                //没有默认值的情况
                document.getElementById("form").innerHTML += '<div class=form-group><label class="col-sm-3 control-label">' + (currentParaContent[0]+'</label><div class="col-sm-9"><input type=text class=form-control name="' + currentParaContent[0] + '" value=' + getCookie(currentParaContent[0]) + '></div></div>');
            }else{
                //有默认值的情况              
                var defaultValueAndTypeList = currentParaContent[1].split(":");

                //defaultValueAndTypeList[1]为默认的值，defaultValueAndTypeList[0]为默认的type
                document.getElementById("form").innerHTML += ('<div class=form-group><label class="col-sm-3 control-label">' + currentParaContent[0]
                +'</label><div class="col-sm-9"><input name="'+ currentParaContent[0] + '" type=text class=form-control value=\"'+defaultValueAndTypeList[1]+'\"'
                +'onfocus=\'if(this.value==\"'+defaultValueAndTypeList[1]+'\"){this.value=\"\";};\''
                +'onblur=\'if(this.value==\"\"){this.value='+defaultValueAndTypeList[1]+';};\'></div></div>');
            }
            
        }
    }    
    document.getElementById("form").innerHTML +=('<button id="sbt" type=button class="btn btn-primary" data-loading-text="执行中..." onclick=onRunClick()>执行</button>');

    $("li").removeClass("active");
    $("#list" + scriptId).addClass("active");
}

function getInputScriptRunParameter(){
    var inputs = $("#form :input");

    //遍历获取各个参数
    var para = [];
    inputs.each(
        function(){
            para.push($(this).val());  
            createCookie($(this).attr("name"), $(this).val(), 100);
        }
    );
    return  para;
}

var createCookie = function(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

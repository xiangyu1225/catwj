var pcUrl = "/skill/";
var mobileUrl = "/skill/mobile/";
var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {         //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
$(function () {
	$(".Page").click(function(){
		$(".pageTopMobi .Link.on").removeClass("on");
	});
	$(".pageTopMobi .Link").click(function(){
		if(!$(this).hasClass("on")){
			$(".pageTopMobi .Link").removeClass("on");
			$(this).addClass("on");
		}else{
			$(".pageTopMobi .Link").removeClass("on");
		}
	});
	$(".footerSearch input").focusin(function(){
		if($(this).val()==""||$(this).val()=="请输入关键字"){
			$(this).parents(".footerSearch").addClass("on");
			$(this).val("").addClass("on");
		}
	}).focusout(function(){
		if($(this).val()==""||$(this).val()=="请输入关键字"){
			$(this).parents(".footerSearch").removeClass("on");
			$(this).val("请输入关键字");
		}
	});
	$(".pageTop .inner .mainMenu_3").hover(function(){
		var l = $(this).offset().left;
		$(".pageTop .mainMenu_Info").css("left",(l+218)+"px")
	});
	for(var i=0;i<$(".mainMenu_3").length;i++){
		var ele = $(".mainMenu_3").eq(i).parents(".mainMenu_2 .item");
		var eleIndex=$(".mainMenu_2 .item").index(ele);
		var itemLength=ele.find(".mainMenu_3 .item2").length;
		if(itemLength>eleIndex){
			$(".mainMenu_3").eq(i).css("top",(-39)*eleIndex+"px");
		}else{
			$(".mainMenu_3").eq(i).css("top",(-39)*(itemLength-1)+"px");
		}
	}
	$(".pageTop .inner .subMenu .smb1,.pageTop .inner .subMenu .smb3,.pageTop .inner .subMenu .smb4").hover(function(){
		mainJXSOutTime=0;
		mainSSOutTime=0;
		$(".mainJXS").fadeOut(100);	
		$(".pageTop .inner .subMenu .smb2").removeClass("on");
	});
	
	$(".pageTop .inner .subMenu .smb2,.pageTop .inner .subMenu .smb3,.pageTop .inner .subMenu .smb4").hover(function(){
		mainXJOutTime=0;
		$(".mainXJ").fadeOut(100);	
		$(".pageTop .inner .subMenu .smb1").removeClass("on");
	});
	$(".pageTop .inner .subMenu .smb2").hover(function(){
		$(".mainJXS").fadeIn(100);
		clearTimeout(mainJXSTimeout);
		mainJXSTimeout=null;
		$(".pageTop .inner .subMenu .smb2").addClass("on")
	},function(){
		setTimeout("mainJXSHide()",10);
	});
	$(".pageTop .inner .subMenu .smb1").hover(function(){
		$(".mainXJ").fadeIn(100);
		clearTimeout(mainJXSTimeout);
		mainJXSTimeout=null;
		$(".pageTop .inner .subMenu .smb1").addClass("on");
	},function(){
		setTimeout("mainXJHide()",10);
	});
	$(".mainJXS").hover(function(){
		clearTimeout(mainJXSTimeout);
		$(".pageTop .inner .subMenu .smb2").addClass("on");
		mainJXSTimeout=null;
		mainJXSOutTime=3000;
	},function(){
		setTimeout("mainJXSHide()",5);
	});
	
	$(".mainXJ").hover(function(){
		clearTimeout(mainXJTimeout);
		$(".pageTop .inner .subMenu .smb1").addClass("on");
		mainXJTimeout=null;
		mainXJOutTime=2000;
	},function(){
		setTimeout("mainXJHide()",5);
	});
	
	$(".pageTop .inner .subMenu .smb4").hover(function(){
		$(".mainSS").fadeIn(100);
		clearTimeout(mainSSOutTime);
		mainSSTimeout=null;
		$(".pageTop .inner .subMenu .smb4").addClass("on");
	},function(){
		setTimeout("mainSSHide()",10);
	});
	$(".mainSS").hover(function(){
		clearTimeout(mainSSTimeout);
		$(".pageTop .inner .subMenu .smb4").addClass("on");
		mainSSTimeout=null;
		mainSSOutTime=3000;
	},function(){
		setTimeout("mainSSHide()",5);
	});
	
	
	if($(window).scrollTop()>100){
		$(".pageTop").addClass("mini");
		$(".topBox_CS2015_2,.topBox_CS2015").css({paddingTop:"66px"});
		$(".TopHuiBG2").css({top:"6px"});
		$(".TopHuiBG").css({top:"66px"});
		pageScrollTop=$(window).scrollTop();
	}
	window.onscroll=function(){menuResize()};
	$(".smbSubs .smb").hover(function(){
		var index = $(".smbSubs .smb").index($(this));
		$(".smbSubs_ .smb").removeClass("on");
		$(".smbSubs_ .smb").eq(index).addClass("on");
	},function(){
		var index = $(".smbSubs .smb").index($(this));
		$(".smbSubs_ .smb").eq(index).removeClass("on");
	});
	
	$(".InnerBox .subTitle a").click(function(){
		InnerBoxSubTitleIndex = $(".InnerBox .subTitle a").index($(this));
		InnerBoxSubTitleIndexOld = $(".InnerBox .subTitle").index($(".InnerBox .subTitle.on"));
		InnerBoxSubTitleRollWaitTime=300;
		pageRollTo20160229();
	});
	
	$(".HongLine .items .item").click(function(){
		InnerBoxSubTitleIndex = $(".HongLine .items .item").index($(this));
		InnerBoxSubTitleIndexOld = $(".InnerBox .subTitle").index($(".InnerBox .subTitle.on"));
		InnerBoxSubTitleRollWaitTime=0;
		pageRollTo20160229();
	});
	
	
	
	$(".popItem_Reg select").change(function(){
		setLl_20150327_Reg_select();
	});
	setLl_20150327_Reg_select();
	for(var i=0;i<$(".pop20140730_select").length;i++){
		$(".pop20140730_select div").eq(i).html($(".pop20140730_select").eq(i).find("option:selected").text());
	}
	$(".pop20140730_select select").change(function(){
		var obj = $(this).parents(".pop20140730_select");
		obj.find("div").html(obj.find("option:selected").text());
	});
	
	$(".popItem_Reg .innerBox_2 .checkItem").click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");
		}else{
			$(this).addClass("on");
		}
		var ele = $(this).parents(".checks");
		var str ="";
		for(var i=0;i<ele.find(".checkItem.on").length;i++){
			if(str!=""){
				str+=",";
			}
			str+=ele.find(".checkItem.on").eq(i).attr("data-val");
		}
		ele.find(".val").val(str);
	});
	listItemsRoll(0);
});
var InnerBoxSubTitleIndex = 0;
var InnerBoxSubTitleIndexOld = 0;
var InnerBoxSubTitleRollWaitTime=300;
function pageRollTo20160229(){
	$(".InnerBox .inner.on").animate({height:0},InnerBoxSubTitleRollWaitTime,function(){
	  var index = $(".InnerBox .inner").index($(this));
	  $(".InnerBox .subTitle").eq(index).removeClass("on");
	  if(InnerBoxSubTitleIndexOld!=InnerBoxSubTitleIndex){
		  $(".InnerBox .subTitle").eq(InnerBoxSubTitleIndex).addClass("on");
		  var hei = 1090;
		  switch(InnerBoxSubTitleIndex){
			  case 0:
				  hei = 1090;
			  break;
			  case 1:
				  hei = 1220;
			  break;
			  case 2:
				  hei = 1090;
			  break;
		  }
		  $(".InnerBox .inner").eq(InnerBoxSubTitleIndex).animate({height:hei},InnerBoxSubTitleRollWaitTime,function(){
			  $(".InnerBox .inner").eq(InnerBoxSubTitleIndex).addClass("on");
			  $(".InnerBox .inner").eq(InnerBoxSubTitleIndex).attr("style","");
		  })
		  setTimeout(function(){
			  var topPix = $(".InnerBox .subTitle").eq(InnerBoxSubTitleIndex).offset().top;
			  if($(window).width()<641){
				$('body,html').animate({scrollTop:topPix-96},300);
			  }else{
				$('body,html').animate({scrollTop:topPix-110},300);
			  }
		  },10);
	  }
  })
}

var mainXJTimeout=null;
var mainXJOutTime=0;
function mainXJHide(){
	if(!mainXJTimeout){
		mainXJTimeout= setTimeout(function(){
			$(".mainXJ").fadeOut(100);
			$(".pageTop .inner .subMenu .smb1").removeClass("on");
		},mainXJOutTime);
	}
}

var mainJXSTimeout=null;
var mainJXSOutTime=0;
function mainJXSHide(){
	if(!mainJXSTimeout){
		mainJXSTimeout= setTimeout(function(){
			$(".mainJXS").fadeOut(100);
			$(".pageTop .inner .subMenu .smb2").removeClass("on");
		},mainJXSOutTime);
	}
}

var mainSSTimeout=null;
var mainSSOutTime=0;
function mainSSHide(){
	if(!mainSSTimeout){
		mainSSTimeout= setTimeout(function(){
			$(".mainSS").fadeOut(100);
			$(".pageTop .inner .subMenu .smb4").removeClass("on");
		},mainSSOutTime);
	}
}

function pageGoTop(){
	$('body,html').animate({scrollTop:0},1000);
}
function closeCalculator(){
	pop20150715Hide();
}
function pageGoCalculatorBottom(){
	$('body,html').animate({scrollTop:1250-$(window).height()},700);
}
function pageGoCalculatorBottom2(){
	$('body,html').animate({scrollTop:850-$(window).height()},700);
}

function CalculatorShow(){
	pageGoTop();
	pop20150715Show("popItem_Calculator");
}
function Calculator2Show(){
	pageGoTop();
	pop20150715Show("popItem_Calculator2");
}
var menuResizeTime=300;
var pageScrollTop=0;
function menuResize(){
	if($(window).scrollTop()>pageScrollTop && !$(".pageTop").hasClass("mini") && !$(".pageTop").hasClass("resizing")){
		$(".pageTop").addClass("resizing");
		$(".pageTop .inner .logo").animate({marginTop:"24px"},menuResizeTime);
		$(".pageTop .inner .mainMenu .Item").animate({
			marginTop:"11px",
			height:"53px",
			lineHeight:"53px"},menuResizeTime);
		$(".pageTop .inner .mainMenu .Item .ItemLink").animate({height:"53px"},menuResizeTime);
		$(".pageTop .inner .subMenu .smbSubs span").fadeTo(menuResizeTime,0.01);
		$(".pageTop").animate({top:"-54px"},menuResizeTime,function(){
			$(".pageTop").addClass("mini");
			$(".pageTop .inner .logo").removeAttr("style");
			$(".pageTop .inner .mainMenu .Item").removeAttr("style");
			$(".pageTop .inner .mainMenu .Item .ItemLink").removeAttr("style");
			$(".pageTop .inner .subMenu .smbSubs span").removeAttr("style");
			$(".pageTop").removeClass("resizing");
			menuResize();
		});
		$(".mainMenuBG").animate({height:46},menuResizeTime);
		$(".topBox_CS2015_2,.topBox_CS2015").animate({paddingTop:"66px"},menuResizeTime);
		$(".TopHuiBG").animate({top:"66px"},menuResizeTime);
		$(".TopHuiBG2").animate({top:"6px"},menuResizeTime);
	}else if($(window).scrollTop()<pageScrollTop &&$(".pageTop").hasClass("mini") && !$(".pageTop").hasClass("resizing")){
		$(".pageTop").addClass("resizing");
		$(".pageTop .inner .logo").animate({marginTop:"18px"},menuResizeTime);
		$(".pageTop .inner .mainMenu .Item").animate({
			marginTop:"0",
			height:"64px",
			lineHeight:"64px"},menuResizeTime);
		$(".pageTop .inner .mainMenu .Item .ItemLink").animate({height:"64px"},menuResizeTime);
		$(".pageTop .inner .subMenu .smbSubs span").fadeTo(menuResizeTime,1);
		$(".pageTop").animate({top:"0"},menuResizeTime,function(){
			$(".pageTop").removeClass("mini");
			$(".pageTop .inner .logo").removeAttr("style");
			$(".pageTop .inner .mainMenu .Item").removeAttr("style");
			$(".pageTop .inner .mainMenu .Item .ItemLink").removeAttr("style");
			$(".pageTop .inner .subMenu .smbSubs span").removeAttr("style");
			$(".pageTop").removeClass("resizing");
			menuResize();
		});
		$(".mainMenuBG").animate({height:100},menuResizeTime);
		$(".topBox_CS2015_2,.topBox_CS2015").animate({paddingTop:"120px"},menuResizeTime);
		$(".TopHuiBG").animate({top:"120px"},menuResizeTime);
		$(".TopHuiBG2").animate({top:"60px"},menuResizeTime);
	}
	pageScrollTop=$(window).scrollTop();
	
	
	$(".popItem_Reg .innerBox_2 .checkItem").click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");
		}else{
			$(this).addClass("on");
		}
		var ele = $(this).parents(".checks");
		var str ="";
		for(var i=0;i<ele.find(".checkItem.on").length;i++){
			if(str!=""){
				str+=",";
			}
			str+=ele.find(".checkItem.on").eq(i).attr("data-val");
		}
		ele.find(".val").val(str);
	});
}
function FormLineChange(){
	$(".FormLine1").removeClass("on");
	$(".FormLine2").addClass("on");
}

function pop20150715Show(itemName){
	pop20150715Hide();
	$(".pop20150715").addClass("on");
	$("."+itemName).addClass("on");
}
function pop20150715Hide(){
	$(".pop20150715").removeClass("on");
	$(".popItem").removeClass("on");
	$(".flvPlayer").html("");
}
function setLl_20150327_Reg_select(){
	var ele = $(".popItem_Reg .selectBox");
	ele.find("span").html(ele.find("option:selected").text());
}

function checkDataLL_20150327_Reg_select(){
	var ele = $(".popItem_Reg .selectBox");
	if(ele.find("option").index(ele.find("option:selected"))<1){
		var ele2= $(".popItem_Reg .innerBox_2 .word_2");
		ele2.addClass("R");
		setTimeout(function(){ele2.removeClass("R");},300);
		setTimeout(function(){ele2.addClass("R");},600);
		setTimeout(function(){ele2.removeClass("R");},900);
		return false;
	}
	var ele = $(".popItem_Reg .checks_1");
	if(ele.find(".checkItem.on").length<1){
		var ele3= $(".popItem_Reg .word_3");
		ele3.addClass("R");
		setTimeout(function(){ele3.removeClass("R");},300);
		setTimeout(function(){ele3.addClass("R");},600);
		setTimeout(function(){ele3.removeClass("R");},900);
		return false;
	}
	return true;
}
function goForm(){
	var topPix = $(".FormLine.on").offset().top;
	if($(window).width()<641){
	  $('body,html').animate({scrollTop:topPix-96},300);
	}else{
	  $('body,html').animate({scrollTop:topPix-110},300);
	}
}

function goHongLine(){
	var topPix = $(".HongLine").offset().top;
	if($(window).width()<641){
	  $('body,html').animate({scrollTop:topPix-96},300);
	}else{
	  $('body,html').animate({scrollTop:topPix-110},300);
	}
}
function FormPopShow(str){
	$(".FormPop").addClass("on");
	$(".FormPop .PopInner .words").html(str);
}
function FormPopHid(){
	$(".FormPop").removeClass("on");
}

function mobiPageChange(pageName){
	$(".Page").removeClass("on");
	$(pageName).addClass("on");
	$('body,html').animate({scrollTop:0},0);
	sendError("");
}
function sendError(str){
	$(".Page_Mobile .w8").html(str);
}
function listItemsRoll(N){
	var itemWidth=408;
	var index = parseInt($(".GoodsList").attr("data-index"));
	if(!index)index=0;
	index+=N;
	if(index<0){index=0;}
	if(index>=$(".GoodsList .listItem").length-3){index=$(".GoodsList .listItem").length-3;}
	$(".GoodsList .listItemsPos").animate({left:(0-itemWidth*index)},300);
	$(".GoodsList").attr("data-index",index);
	if(index<1){
		$(".GoodsList .NP_Btn.prev").addClass("hide");
	}else{
		$(".GoodsList .NP_Btn.prev").removeClass("hide");
	}
	if(index>=$(".GoodsList .listItem").length-3){
		$(".GoodsList .NP_Btn.next").addClass("hide");
	}else{
		$(".GoodsList .NP_Btn.next").removeClass("hide");
	}
}
"use strict";$(function(){var n;$("#fullpage").fullpage({css3:!0,anchors:["homepage","energysave","innovation","partner","news"],menu:".menu",afterLoad:function(n,e){$(".homepage").hasClass("on")||setTimeout(function(){$(".homepage").addClass("on")},2e3),function(n){switch(n){case 2:$(".energysave").hasClass("on")||$(".energysave").addClass("on").find("li b").each(function(n,e){$(this).prop("Counter",0).animate({Counter:$(this).text()},{duration:2e3,easing:"swing",step:2==n?function(n){$(this).text(function(n){var e=parseFloat(n);if(isNaN(e))return!1;var t=(e=Math.round(10*n)/10).toString(),a=t.indexOf(".");a<0&&(a=t.length);return t}(n))}:function(n){$(this).text(Math.ceil(n))}})});break;case 3:$(".innovation").hasClass("on")||$(".innovation").addClass("on");break;case 4:$(".partner").hasClass("on")||$(".partner").addClass("on");break;case 5:$(".news").hasClass("on")||$(".news").addClass("on")}}(e)},onLeave:function(n,e){}}),$("#fourbubble").on("click","li",function(){var n=$(this).index();$("#fourcontent span").animate({left:12.5+25*n+"%"},100),$("#fourcontent p").eq(n).addClass("on").siblings("p").removeClass("on")}),$.ajax({url:"http://test.oms.hwariot.com/api/v1/news/?page_size=4",type:"GET",dataType:"json",data:{}}).done(function(n){if(0<n.count){var a="";n.results.forEach(function(n,e){var t=40<n.summary.length?"...":"";a+='\n          <li>\n            <div class="imgbox">\n              <div>\n                <img src="'+n.image_url+'">\n              </div>\n            </div>\n            <h3>'+n.title+"</h3>\n            <p>"+(n.summary.substr(0,40)+t)+'</p>\n            <div>\n              <span class="date">'+n.created_time+'</span>\n              <a href="/newsdetail.html?id='+n.id+'">详情 >></a>\n            </div>\n          </li>'}),$("#newslist ul").html(a)}}).done(function(n){768<$(window).width()&&function(){for(var n=document.getElementById("newslist"),t=n.querySelector("ul"),e=t.querySelectorAll("li"),a=1,s=(n.offsetWidth,e[0].offsetWidth),i=0;i<2;i++){var o=e[i].cloneNode(!0);t.appendChild(o)}[].forEach.call(t.querySelectorAll("li"),function(n,e){n.style.width=s+"px",t.style.width=6*s+"px"}),setInterval(function(){$(t).animate({marginLeft:-s*a++},500),5===a&&($(t).css({marginLeft:0}),a=1)},8e3)}(),$("#newslist img").each(function(n,e){$(e.parentNode).css({height:.66*$(e).width()})})}),n="aside",$(n).mouseenter(function(){var i=$(this).offset().left,o=$(this).offset().top,r=$(this).outerWidth(),l=$(this).outerHeight();$(this).mousemove(function(n){var a,s,e=n.pageX-i,t=n.pageY-o;a=e-r/2,s=l/2-t,$(this).find("img").each(function(n,e){var t=10+10*n;$(e).css({transform:"translateY("+a/t+"px) translateX("+s/t+"px) "})})})}),$(n).mouseleave(function(){$(this).css({})});var e=null;$(window).on("resize",function(){clearTimeout(e),e=setTimeout(function(){},300)})});
//# sourceMappingURL=base.js.map

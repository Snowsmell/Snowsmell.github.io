"use strict";$(function(){$.ajax({url:"http://test.oms.hwariot.com/api/v1/news/?page_size=4",type:"GET",dataType:"json",data:{}}).done(function(n){if(console.log(n),0<n.count){var s="";n.results.forEach(function(n,t){var a=40<n.summary.length?"...":"";s+='\n          <li>\n            <a href="/newsdetail.html?id='+n.id+'">\n              <div class="imgbox">\n                <img src="'+n.image_url+'" alt="">\n              </div>\n              <div class="text">\n                <h3>'+n.title+"</h3>\n                <p>"+(n.summary.substr(0,40)+a)+"</p>\n                <span>"+n.created_time+"</span>\n              </div>\n            </a>\n          </li>"}),$("#news-list").html(s)}})});
//# sourceMappingURL=news.js.map

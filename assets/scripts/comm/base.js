"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"===("undefined"==typeof exports?"undefined":_typeof(exports))?module.exports=e(require("jquery")):e(jQuery)}(function(s){if(s.support.cors||!s.ajaxTransport||!window.XDomainRequest)return s;var t=/^(https?:)?\/\//i,r=/^get|post$/i,i=new RegExp("^(//|"+location.protocol+")","i");return s.ajaxTransport("* text html xml json",function(n,o,e){if(n.crossDomain&&n.async&&r.test(n.type)&&t.test(n.url)&&i.test(n.url)){var a=null;return{send:function(e,r){var t="",i=(o.dataType||"").toLowerCase();a=new XDomainRequest,/^\d+$/.test(o.timeout)&&(a.timeout=o.timeout),a.ontimeout=function(){r(500,"timeout")},a.onload=function(){var e="Content-Length: "+a.responseText.length+"\r\nContent-Type: "+a.contentType,t={code:200,message:"success"},n={text:a.responseText};try{if("html"===i||/text\/html/i.test(a.contentType))n.html=a.responseText;else if("json"===i||"text"!==i&&/\/json/i.test(a.contentType))try{n.json=s.parseJSON(a.responseText)}catch(e){t.code=500,t.message="parseerror"}else if("xml"===i||"text"!==i&&/\/xml/i.test(a.contentType)){var o=new ActiveXObject("Microsoft.XMLDOM");o.async=!1;try{o.loadXML(a.responseText)}catch(e){o=void 0}if(!o||!o.documentElement||o.getElementsByTagName("parsererror").length)throw t.code=500,t.message="parseerror","Invalid XML: "+a.responseText;n.xml=o}}catch(e){throw e}finally{r(t.code,t.message,n,e)}},a.onprogress=function(){},a.onerror=function(){r(500,"error",{text:a.responseText})},o.data&&(t="string"===s.type(o.data)?o.data:s.param(o.data)),a.open(n.type,n.url),a.send(t)},abort:function(){a&&a.abort()}}}}),s}),function(n,e){var t,o=n.document,r=o.documentElement,i=o.querySelector('meta[name="viewport"]'),a=o.querySelector('meta[name="flexible"]'),s=0,p=0,l=e.flexible||(e.flexible={});if(i){var c=i.getAttribute("content").match(/initial\-scale=([\d\.]+)/);c&&(p=parseFloat(c[1]),s=parseInt(1/p))}else if(a){var m=a.getAttribute("content");if(m){var u=m.match(/initial\-dpr=([\d\.]+)/),d=m.match(/maximum\-dpr=([\d\.]+)/);u&&(s=parseFloat(u[1]),p=parseFloat((1/s).toFixed(2))),d&&(s=parseFloat(d[1]),p=parseFloat((1/s).toFixed(2)))}}if(!s&&!p){n.navigator.appVersion.match(/android/gi);var f=n.navigator.appVersion.match(/iphone/gi),y=n.devicePixelRatio;p=1/(s=f?3<=y&&(!s||3<=s)?3:2<=y&&(!s||2<=s)?2:1:1)}if(r.setAttribute("data-dpr",s),!i)if((i=o.createElement("meta")).setAttribute("name","viewport"),i.setAttribute("content","initial-scale="+p+", maximum-scale="+p+", minimum-scale="+p+", user-scalable=no"),r.firstElementChild)r.firstElementChild.appendChild(i);else{var x=o.createElement("div");x.appendChild(i),o.write(x.innerHTML)}function h(){var e=r.getBoundingClientRect().width;540<e/s&&(e=540*s);var t=e/10;r.style.fontSize=t+"px",l.rem=n.rem=t}n.addEventListener("resize",function(){clearTimeout(t),t=setTimeout(h,300)},!1),n.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(t),t=setTimeout(h,300))},!1),"complete"===o.readyState?o.body.style.fontSize=12*s+"px":o.addEventListener("DOMContentLoaded",function(e){o.body.style.fontSize=12*s+"px"},!1),h(),l.dpr=n.dpr=s,l.refreshRem=h,l.rem2px=function(e){var t=parseFloat(e)*this.rem;return"string"==typeof e&&e.match(/rem$/)&&(t+="px"),t},l.px2rem=function(e){var t=parseFloat(e)/this.rem;return"string"==typeof e&&e.match(/px$/)&&(t+="rem"),t}}(window,window.lib||(window.lib={}));
//# sourceMappingURL=base.js.map

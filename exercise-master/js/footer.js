var footerText =
'<div class="foot-top clearfix">'+
		'<a href="#">登陆</a>'+
		'<a href="#">注册</a>'+
		'<a href="#header">'+
			'<img src="http://www.zuyushop.com/wap/images/top.jpg" alt="去吧皮卡丘" />'+
			'返回顶部'+
		'</a>'+
	'</div>'+
	'<div class="foot-bottom">'+
		'<p>'+
			'<a href="#">手机app下载</a>'+
			'<span>慢慢买手机版</span> -- 掌上比价平台'+
		'</p>'+
		'<p>'+
			'm.manmanbuy.com'+
		'</p>'+
	'</div>'
	var footer = document.createElement('footer');
	footer.innerHTML = footerText;
	document.body.appendChild(footer)
	
//跳转标签起作用，在目标地点设置id = header即可
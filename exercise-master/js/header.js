//字符串拼接引入
var header = 
'<header class="header" id="header" name="header">'+
		'<div class="logo">'+
			'<a href="index.html" title="慢慢买">'+
				'<img src="images/header_logo.png" />'+
			'</a>'+
		'</div>'+
		'<div class="appdown">'+
			'<a href="javascript:window.location=%27http://m.manmanbuy.com/download/%27" title="手机app下载">'+
				'<img src="images/header_app.png" alt="手机app下载" />'+
			'</a>'+
		'</div>'+
	'</header>'+
	'<div id="searcher">'+
		'<form action="#" >'+
			'<input type="text" placeholder="请输入你想要比价的商品" />'+
			'<input type="button" value="搜索"  id="searchbtn"/>'+
		'</form>'+
	'</div>';
document.body.insertAdjacentHTML("afterBegin",header)
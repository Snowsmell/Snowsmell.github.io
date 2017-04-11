$(function(){
	//获取productid
	var productid = GetQueryString('productid');	
	console.log(productid)
	
	$.ajax({
		url:"http://139.199.157.195:9090/api/getdiscountproduct",
		data:{'productid':productid},
		success:function(data){
			console.log(data);
			var page = template('discountProduct',data);
			$('main').html(page)
		}
	});
	
	//返回上级页面
	document.querySelector('.pageback').onclick = function(){
		window.history.back()
	}
	
	
	
	
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}

})

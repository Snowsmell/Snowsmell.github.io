$(function(){
	//定义方法
	var setPage ={};
	setPage.ajax = function(){
		$.ajax({
			url:"http://139.199.157.195:9090/api/getcoupon",
			success:function(data){
				console.log(data);
				var page = template('coupontype',data);
				$('main').find('ul').html(page)
			}
		});
	}
	
	
	
	//调用方法
	setPage.ajax();
	
	
	
})




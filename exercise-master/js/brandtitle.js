$(function(){
	//第一步ajax，页面元素
	$.ajax({
		type:"get",
		url:"http://139.199.157.195:9090/api/getbrandtitle",
		success:function(data){
			console.log(data);
			var page = template('titlelistAll',data);
			$('.brandlist').html(page);
			
			//为了下个页面，利用localStorage,在单机事件的时候绑定
			$('.getType').on('click',function(){
				var storage = window.localStorage;
				storage['productType'] = $(this).html()
			})
			
		}
	});

})

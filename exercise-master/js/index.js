$(function(){
	//获取图标们
	$.ajax({
		type:'get',
		url:"http://139.199.157.195:9090/api/getindexmenu",
		success:function(data){
			console.log(data);
			var page = template('navlist',data);
			$('.navlists').html(page);
			
			//更多的切换后四项是否显示                           
			var more=$('.navlists').find('li').eq(7);
			$(more).nextAll().hide()
			var flag = true;
				$(more).click(function(){
					if(flag){
						$(more).nextAll().slideDown('normal');
						flag = false;
					}else{
						$(more).nextAll().slideUp('normal');
						flag = true;							
					}						
				})							
		}
	});
	
	//获取商品们
	$.ajax({
		type:'get',
		url:"http://139.199.157.195:9090/api/getmoneyctrl",
		success:function(data){
			console.log(data);
			var page2 = template('productlist',data);
			$('main ul').html(page2)
		}
	})
	
	
	
	
})


$(function(){
	$.ajax({
		type:"get",
		url:"http://139.199.157.195:9090/api/getcategorytitle",
		success:function(data){
			console.log(data);
			var page = template('categorytitlelist',data);
			$('.categorytype').html(page);
			
			//此时生成了第一级别的列表，获取之，并给之绑定事件，
			$('.firstmenu').on('click',function(){
				//为了后续ajax中操作，先把this的父元素，也就是li赋值给that
				var that = this.parentNode;
				
				//获取titleId；
				var titleID = that.dataset.titleid;
				//判断，如果该项一级菜单内的ul有内容，即不是空字符串，那么清空，同时返回
				if($(that).find('ul').html()){
					$(that).find('ul').html('');
					return
				}
				
					$.ajax({
						url:"http://139.199.157.195:9090/api/getcategory",
						data:{'titleid':titleID},
						success:function(data){
							console.log(data);
							var ul = $(that).find('ul');
							//子菜单的模板id
							var page2 = template('categorydetail',data);
							$(ul).html(page2);
							

							
						}
					});					

				
			})
		}
	});
})

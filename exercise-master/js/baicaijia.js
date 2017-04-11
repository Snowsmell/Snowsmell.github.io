$(function(){
	//获取内容，渲染nav
	$.ajax({
		type:"get",
		url:"http://139.199.157.195:9090/api/getbaicaijiatitle",
		async:true,
		dataType:'jsonp',
		success:function(data){
			console.log(data)
			var page = template('navlist',data)
			$('.tablist').html(page);
			//设置滚动的ul的宽度
			var lis =$('.tablist').find('li');
			var ulWidth=null;
			$(lis).each(function(i,v){
				ulWidth+=$(v).width()
			})
			$('.tablist').css({'width':ulWidth})
			var Scroll = new iScroll('wrapper',{hScrollbar:false, vScrollbar:false,vScroll: false})
			//点击导航条中项目的事件
			
			//异步刷新页面
			//所有导航的a元素
			var titleA = $('.tablist').find('li').find('a')
			for(var i=0;i<titleA.length;i++){
				//样式问题,开头先给第一个加上current
				titleA[0].classList.add('current')
				

				
				titleA[i].addEventListener('click',function(e){
					//阻止页面默认跳转，由于是移动端，没考虑ie兼容性
					e.preventDefault()
					//拼接字符串的时候，将titelid的值赋给了自定义属性
					var mainid = this.dataset.titleid
					//ajax请求
					$.ajax({
						url:"http://139.199.157.195:9090/api/getbaicaijiaproduct",
						data:{'titleid':mainid},
						success:function(data){
							var page= template('mainlist',data)
							$('main').find('ul').html(page)
						}	
					});		
					
					
				
				//干掉所有人，留下自己
					for(var i=0;i<titleA.length;i++){
						titleA[i].classList.remove('current')
					}
					this.classList.add('current')
				})
			}
			
			
		}
	});
	//商品页初识显示的是全部
				//初始状态
			$.ajax({
				url:"http://139.199.157.195:9090/api/getbaicaijiaproduct",
				data:{'titleid':0},
				async:true,
				success:function(data){
					console.log(data);
					var page= template('mainlist',data)
					$('main').find('ul').html(page)
				}	
			});
	
	
	//gohead滚动到顶部的逻辑
	function Scroll(){
		$(window).scroll(function(){
			if($(window).scrollTop()>100){
				$('#gohead').stop().fadeIn('normal');
			}else{
				$('#gohead').stop().fadeOut('normal')
			}
		})
		$('#gohead').click(function(){
			$('body,html').animate({scrollTop:0},1000);
			return false;
		})		
	}
	
	Scroll()
})




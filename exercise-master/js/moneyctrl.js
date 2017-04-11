$(function(){
	//获取内容，渲染nav
	var pageid =1;
	
	setPage()
	
	function setPage(){
		$.ajax({
		url:"http://139.199.157.195:9090/api/getmoneyctrl",
		data:{'pageid':pageid},
		success:function(data){
				console.log(data)
				var page = template('productlist',data)
				$('main ul').html(page);
	
				pageNum = Math.ceil(data.totalCount/data.pagesize);
				
				//设置option标签
				function setOption(){
		    	//生成之前先清除之前存在的option
		    	$('select').html('');
		    	for(var i=1;i<=pageNum;i++){
		    		var option = document.createElement('option');
		    		option.value = i;
		    		option.innerHTML= i+'/'+pageNum;
		    		$('select').append(option)
		    			};
		    	//根据pageid决定哪个Option是选中状态
		    	document.querySelector('select')[pageid-1].selected='true'    			
		    		}
		    	setOption()		
	
		    	function changePage(){
			    	document.querySelector('.prev').onclick=function(){
		//	    	console.log('触发一次上一页')	    			
			    		if(pageid<=1){
			    			alert('已经是最开头了哟');
			    			return
			    		}
			    		pageid--;
			    		window.scrollTo(0,0)
			    		setProduct()
			    };
			    		
			    	document.querySelector('.next').onclick=function(){
		//	    		console.log('触发一次下一页')	    			
			    		if(pageid>=pageNum){
			    			alert('已经是最后一页了')
			    			return
			    		}
			    		window.scrollTo(0,0)
			    		pageid++;
			    		setPage()
			    	};	    			
		    	}
				changePage()
			
				
				
				//设置select
					document.querySelector('select').onchange = function(){
						pageid = this.value;
						window.scrollTo(0,0)
						setPage()
					}				
			}

		});
	}


})




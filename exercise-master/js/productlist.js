$(function(){
    //从url获取参数
    var categoryid = GetQueryString('categoryId');
    //渲染面包屑导航
    $.ajax({
    	url:'http://139.199.157.195:9090/api/getcategorybyid',
    	data:{'categoryid':categoryid},
    	success:function(data){
//  		console.log(data);
    		var titleName=data.result[0].category;
    		$('.compare').html(titleName);
    		
    	}
    })
    
     //考虑到内容应该在标题后面出现，应该把这个ajax请求写在了内部，但是考虑到页面的逻辑，为了方便写，放在了外面
     //需要传入的参数多了一个pageid,页面开始默认都是第一个页面
     var pageid = 1;
    
    setProduct(pageid,categoryid);
    
    function setProduct(pageid,categoryid){
	    $.ajax({
	    	url:"http://139.199.157.195:9090/api/getproductlist",
	    	data:{'categoryid':categoryid,'pageid':pageid},
	    	success:function(data){
	    		console.log(data);
	    		var page2 = template('productList',data);
	    		$('.productlist').html(page2);
	    		
	    		//页面选择逻辑部分
	    		pageonchange()
				function pageonchange(){
		    		//动态生成select标签内的Option标签，内容和属性由传回的参数pagesize和totalCount来决定
	    		pageNum = Math.ceil(data.totalCount/data.pagesize);
	    		
	    		//根据页数生成option    		
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
	    		
	    		//设置上一页，下一页
	    		changePage()
	    		
	    		function changePage(){
		    		document.querySelector('.prev').onclick=function(){
	//	    			console.log('触发一次上一页')	    			
		    			if(pageid<=1){
		    				alert('已经是最开头了哟');
		    				return
		    			}
		    			pageid--;
		    			window.scrollTo(0,0)
		    			setProduct(pageid,categoryid)
		    		};
		    		
		    		document.querySelector('.next').onclick=function(){
	//	    			console.log('触发一次下一页')	    			
		    			if(pageid>=pageNum){
		    				alert('已经是最后一页了')
		    				return
		    			}
		    			window.scrollTo(0,0)
		    			pageid++;
		    			setProduct(pageid,categoryid)
		    		};	    			
	    		}

				//设置select
					document.querySelector('select').onchange = function(){
						pageid = this.value;
						window.scrollTo(0,0)
						setProduct(pageid,categoryid)
					}				
				}

				

	    	}
	    });     	
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
       
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
})

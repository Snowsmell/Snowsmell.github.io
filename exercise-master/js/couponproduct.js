$(function(){
	//定义方法
	
	//ajax请求
	var setPage ={};
//	var dataAll={};
	setPage.ajax = function(){
		
		var couponid = GetQueryString('couponid');
		$.ajax({
			url:"http://139.199.157.195:9090/api/getcouponproduct",
			data:{'couponid':couponid},
			success:function(data){
				console.log(data);
				var page = template('coupontype',data);
				$('main').find('ul').html(page);
				
//				dataAll = data;
				//调用事件
				//遮罩部分
				var page2 = template('ulpics',data);
				$('.bannerPic').html(page2)					
				setPage.banner()

			}
		});
	};
	
	//banner遮罩层逻辑                     
	setPage.banner = function(){
        //位置初始化
		//获取遮罩层的Li元素们
		var picLis = document.getElementsByClassName('banLis')
		//获取图片宽度，这里就是屏幕宽度
		var picWidth = $(document.body).width()

//		console.log(picLis)        
        var left = picLis.length-1;
        var center =0;
        var right =1;		

		
		//单击遮罩层事件
		var origin = 0;
		$('.imageClick').on('click',function(){
			//给遮罩以高度，同时淡入
			$('#banner').css({
				'height':$(document.body).height()+'px'
			}).fadeIn(1000)
			console.log(this);			
			//单机遮罩，遮罩消失
			$('#banner').on('click',function(){
				$('#banner').fadeOut(1000);
				//淡出的时候全部回到起始的位置，就是全都在看不到的地方
				

			})		
		//关于位置的逻辑，因为从顺序来说，遮罩层和页面上的元素的序号是可以对应的，所以位置初始化的设置可以通过jquery的Index方法，获取页面元素的顺序来设置遮罩层
		//这里的点击事件是在a标签上，所以找寻其父元素li标签，index（）不传参数，返回的是在同级元素中的位置
			origin=$(this).parent().index();

	        //依据click中改变的origin来改变
	        console.log(origin)
			left = origin-1;
			if(left<0){
				left = picLis.length-1
			}
			center=origin;
			right = origin+1;
			if(right>picLis.length-1){
				right = 0;
			}			
			setPosition(0);
		});

        
        //设置位置的函数
        function setPosition(dis){
            picLis[left].style.transform = "translateX("+(-picWidth+dis)+"px)";
            picLis[center].style.transform = "translateX("+(0+dis)+"px)";
            picLis[right].style.transform = "translateX("+(picWidth+dis)+"px)"
        }
        //设置过度的函数
        function setTransition(flag1,flag2,flag3,time){
            if(flag1){
                picLis[left].style.transition = 'transform '+time+'s'
            }else{
                picLis[left].style.transition = 'none'
            }
            if(flag2){
                picLis[center].style.transition = 'transform '+time+'s'
            }else{
                picLis[center].style.transition = 'none'
            }
            if(flag3){
                picLis[right].style.transition = 'transform '+time+'s'
            }else{
                picLis[right].style.transition = 'none'
            }
        }        
        //图片自右往左来
        function showNext(){
            left =center;
            center = right;
            right++;
            if(right>picLis.length-1){right =0}
            setTransition(true,true,false,0.5);
            setPosition(0);
        }

        //图片自左往右
        function showPrev(){
            right =center;
            center = left;
            left--;
            if(left<0){left=picLis.length-1}
            setTransition(false,true,true,0.5);
            setPosition(0);
        }
	
        $('#goright').on('click',function(e){
        	e.stopPropagation()
        	showNext()
        })
        $('#goleft').on('click' , function(e){
        	 e.stopPropagation()
        	showPrev()
        })        
	}




	
	//调用方法
	setPage.ajax();
	
	
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
})




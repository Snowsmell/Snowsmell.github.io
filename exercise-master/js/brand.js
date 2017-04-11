$(function(){
	
	//获取url中的id号，准备ajax请求
	var num = GetQueryString('brandtitleid');
//	console.log(num)
	//第一步ajax，页面元素
	$.ajax({
		url:"http://139.199.157.195:9090/api/getbrand",
		data:{'brandtitleid':num},
		success:function(data){
			console.log(data)
			//模板引擎渲染前先设置标题，利用slice截取比较的东西,同时使用localStorage，设置完毕后清空localStorage
			var storage = window.localStorage;
			var compareTitle=storage['productType'];
			
			compareTitle = compareTitle.slice(0,compareTitle.length-8);
			$('.compare').html(compareTitle+'哪个牌子好')

			//模板引擎渲染下面的列表
			var page = template('brandtype',data)
			$('.brandlist').html(page);
			//排名的序号和样式没有返回的参数只能自己加
			var rankings = document.getElementsByClassName('ranking');
			for(var i =0;i<rankings.length;i++){
				rankings[i].innerHTML=+(i+1)
			}
			rankings[0].style.backgroundColor='red';
			rankings[1].style.backgroundColor='orange';
			rankings[2].style.backgroundColor='#8adf5b';
			
			//第二个异步加载，获取商品
			var aToProducts = document.getElementsByClassName('toProduct')
			for(var i =0;i<aToProducts.length;i++){
				aToProducts[i].addEventListener('click',function(){
					console.log(num)
					$.ajax({
						url:"http://139.199.157.195:9090/api/getbrandproductlist",
						data:{'brandtitleid':num},
						success:function(data){
							$('.compare').html(compareTitle+'哪个牌子销量好')
							console.log(data);
							//清空前面的ul
							$('.brandlist').html('')
							var page2 = template('productList',data);
							$('.productlist').html(page2);

							//第三个异步加载，去往评论
							
							$('.toDiscuss').on('click',function(e){

								//利用自定义属性获取id
								var productId = this.dataset.productid;
								//为了加载评论后，除了点击的商品保留，其余的清除，用that来保存当前this,this是a元素，应当保留的是其父元素li
								var that = this.parentNode;
//								console.log(that)
								e.preventDefault();
								$.ajax({
									type:"get",
									url:"http://139.199.157.195:9090/api/getproductcom",
									data:{'productid':productId},
									success:function(data){
//										console.log(data);

										//更改标题
										$('.compare').html(compareTitle+'好老好老的评论');
										//将点击元素以外的同级元素隐藏，
										$(that).siblings().slideToggle('normal')
										
										var page3 = "<li>用户评论</li>"+template('discussList',data);
										
										if($('.discusslist').height()==0){
											$('.discusslist').html(page3).slideDown('normal')
											
										}else{
											$('.discusslist').slideUp('normal').html(null)
											
										}
										
										
									}
								});
							})
							
						}
					});
				})
			}
	
		}
	});

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

//页面关闭是清理Localstorage
window.onbeforeunload=function(){
	storage.clear();
}





})

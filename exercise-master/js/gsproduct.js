$(function(){
//初始渲染的页面
var shopid =0;
var areaid =0;
setShop()
setArea()
setProduct(shopid,areaid)
//渲染商城
function setShop(){
	$.ajax({
		url:"http://139.199.157.195:9090/api/getgsshop",
		success:function(data){
			console.log('超市的数据',data);
			var page = template('shoplist',data);
			$('.mallDown').find('ul').html(page)
			mallDownClick()
		}
	});
}
//渲染地区
function setArea(){
	$.ajax({
		url:"http://139.199.157.195:9090/api/getgsshoparea",
		success:function(data){
			console.log('区域的数据',data);
			var page2 = template('arealist',data);
			$('.areaDown').find('ul').html(page2);
			areaDownClick()
		}

	});
}
//渲染商品区域
function setProduct(shopid,areaid){
	$.ajax({
		url:"http://139.199.157.195:9090/api/getgsproduct",
		data:{'shopid':shopid,'areaid':areaid},
		success:function(data){
			console.log('商品的列表：',data)
			var page3 = template('productlist',data);
			$('.productlist').html(page3)
		}
	});
}

//单击显示区域的事件逻辑
//单机商城部分   id 分别是mall area price,此处暂无price，每次点击下拉表中的数据，都会发送ajax，根据新的shopid 和 areaid 渲染页面
//			对应的下拉菜单类名是 mallDown 和areaDown


//点击商城和地区显示下拉菜单，
function mallClick(){
	$('#mall').on('click',function(){
		$('.mallDown').stop().slideToggle('500')
	})
}
function areaClick(){
	$('#area').on('click',function(){
		$('.areaDown').stop().slideToggle('500')
	})
}
mallClick();
areaClick()

//点击下拉菜单中的选项,但是因为是异步请求，所以此处定义，但是事件绑定与调用要在ajax渲染完商城的success函数里面调用和绑定
function mallDownClick(){
	$('.mallDown').find('a').on('click',function(){
//		console.log(this.dataset.shopid);
//更换标签内容
		$('#mall').html($(this).text()+'<i></i>')
		var newShopid =this.dataset.shopid;
		setProduct(newShopid,areaid);
		$('.mallDown').stop().slideToggle('500')
	})
}
function areaDownClick(){
	$('.areaDown').find('a').on('click',function(){
//		console.log(this.dataset.shopid);
		var text =$(this).text().slice(0,2)
		$('#area').html(text+'<i></i>')
		var newAreaid =this.dataset.areaid;
		setProduct(shopid,newAreaid);
		$('.areaDown').stop().slideToggle('500')
	})
}

})
;
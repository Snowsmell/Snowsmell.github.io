$(function() {
	//从url获取参数
	var productid = GetQueryString('productid');
	console.log('productId:'+productid)
	//第一步ajax，把商品的数据加载回来
	$.ajax({
		data: { 'productid': productid },
		url: "http://139.199.157.195:9090/api/getproduct",
		success: function(data) {
			console.log(data)
			var page = template('productDetail', data);
			$('.details').html(page);

			//设置面包屑导航的二级和三级
			var categoryid = data.result[0].categoryId
			var productName = data.result[0].productName.split(' ')[0]
			$('.third').html(productName)
			//利用categoryid再发请求获取分类
			console.log(categoryid)
			$.ajax({
				url: 'http://139.199.157.195:9090/api/getcategorybyid',
				data: { 'categoryid': categoryid },
				success: function(data) {
					var titleName = data.result[0].category;
					//改变第二级面包屑a标签的指向，即href的值
					var secondHref = "productlist.html?categoryId=" + categoryid;
					$('.second').html(titleName).attr('href', secondHref)
				}
			});

			//获取去商品信息后，设置评论
			$.ajax({
				type: "get",
				url: "http://139.199.157.195:9090/api/getproductcom",
				data: { 'productid': productid },
				success: function(data) {
					console.log(data);
					var page2 = "<li>用户评论</li>" + template('discussList', data);

					$('.discusslist').html(page2)

				}
			});
		}
	});



	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
})
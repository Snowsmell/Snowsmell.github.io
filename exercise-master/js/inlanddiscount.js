$(function(){
	$.ajax({
		url:"http://139.199.157.195:9090/api/getinlanddiscount",
		success:function(data){
			var page = template('inlandList',data);
			$('.inlandList').html(page);
			console.log(data)
		}
	});




})

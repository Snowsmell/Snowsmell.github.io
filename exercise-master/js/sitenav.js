$(function(){
	$.ajax({
		url:"http://139.199.157.195:9090/api/getsitenav",
		success:function(data){
			var page = template('sitenavlist',data);
			$('.navList').html(page);
			console.log(data)
		}
	});

})

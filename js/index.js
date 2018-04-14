var app = new Vue({
	el: '#dowebok',
	data: {
		area: {
			width: 450,
			height: 200,
			font: 14,
			limit: 10,
			text: '我是示例'
		}
	},
	created: function () {
		$('#dowebok').fullpage({
			'paddingTop': 150,
			'navigation': true,
		})
		$('#area1').tarea(this.area)
	},
	watch: {
		area: {
			handler: function (val, oldval) {
				$('#area1').html('').tarea(val)
			},
			deep: true
		}
		
	}
})
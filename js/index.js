var app = new Vue({
	el: '#dowebok',
	data: {
		area: {
			width: 450,
			height: 200,
			font: 14,
			limit: 200,
			text: '我是示例',
			color:"#333"
		},
		sign:{
			width: 600,
			height: 300,
			border: 'none',
			background: '#ccc',
			lineWidth: 4,
			lineColor: '#fff',
		},
		pic:[]
	},
	methods:{
		clearsign:function(){
			$('#sign1').sign('empty')
		},
		savepic:function(){
			$('#sign1').sign('exportImg')
			this.pic.push(sessionStorage.getItem('signImg'))
		},
		clearthis:function(n){			
			this.pic[n]=0
			console.log(this.pic[n])
		}
	},
	created: function () {
		$('#dowebok').fullpage({
			'paddingTop': 150,
			'navigation': true,
		})
		$('#area1').tarea(this.area)
		$('#sign1').sign(this.sign)
	},
	watch: {
		area: {
			handler: function (val, oldval) {
				$('#area1').html('').tarea(val)
			},
			deep: true
		},
		sign: {
			handler:function(val,oldval){
				$('#sign1').html('').sign(val)
			},
			deep:true
		}
	}
})

const homePage = new Vue({
  el: '#homePage',
  data: {
  	dx: 0,
  	dy: 0
  },
  methods: {
    onMouseMove: function (e) {
    	const { btnBookTicket } = this.$refs;
    	const { btnText } = this.$refs;
    	const boundingClientRect = btnBookTicket.getBoundingClientRect();


    	const x = e.clientX - boundingClientRect.left
    	const y = e.clientY - boundingClientRect.top
    	
    	const xc = boundingClientRect.width/2
    	const yc = boundingClientRect.height/2
    	
    	dx = x - xc;
    	dy = y - yc;

    	TweenMax.to(btnBookTicket, 0.4, {rotationX:dy/-1, rotationY:dx/10, ease:Power1.easeOut, 
    		transformPerspective:900, transformOrigin:"center", transformStyle: "preserve-3d"});

    },
    onMouseLeave: function(e){
    	const { btnBookTicket } = this.$refs;
    	const { btnText } = this.$refs;
    	TweenMax.to([btnBookTicket,btnText], 0.4, {rotationX:0, rotationY:0, ease:Power1.easeOut});
    }
  }
});


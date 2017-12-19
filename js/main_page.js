const homePage = new Vue({
  el: '#homePage',
  data: {
  	dx: 0,
  	dy: 0
  },
  mounted: function() {
  	const tl = new TimelineMax();
  	tl.to($('#preloader'), 1.5, {autoAlpha: 0, ease:Power1.easeIn})
  	.fromTo($('.btn'), 1, 
  		{bottom:-30, ease: Power1.easeOut},
  		{bottom:0, ease: Power1.easeOut}, '-=0.8')
  	.fromTo($('.btn'), 2, 
  		{opacity:0, ease: Power1.easeOut},
  		{opacity:1, ease: Power1.easeOut}, '-=0.8')
  	.staggerFromTo($('.movieTitle .blindText span'), 0.7, 
  		{top: -100, opacity:1, ease: Power4.easeOut},
  		{top: 0, opacity:1, ease: Power4.easeOut}, 0.2, '-=1.4')
  },
  methods: {
    onClickBookTicket: function () {
    	location.href='browser_movies_page.html';
    },
    onMouseMove: function (e) {
    	const { btn } = this.$refs;
    	const { btnText } = this.$refs;

    	const boundingClientRect = btn.getBoundingClientRect();

    	const x = e.clientX - boundingClientRect.left
    	const y = e.clientY - boundingClientRect.top
    	const xc = boundingClientRect.width/2
    	const yc = boundingClientRect.height/2
    	
    	dx = x - xc;
    	dy = y - yc;

    	TweenMax.to(btn, 0.4, {rotationX:dy/-1, rotationY:dx/10, ease: Sine.easeOut});

    },
    onMouseLeave: function(e){
    	const { btn } = this.$refs;
    	const { btnText } = this.$refs;
    	TweenMax.to([btn,btnText], 0.4, {rotationX:0, rotationY:0, ease: Sine.easeOut});
    },
    onMouseDown: function(e){
    	const { btn } = this.$refs;
    	const tl = new TimelineMax();
    	tl.to(btn, 0.2, {z:-65, ease: Power4.easeOut})
    	.to(btn, 0.2, {z:0, ease: Power4.easeOut}) // temporary alternative to mouseup
    },
    //Mouse up not working
    onMouseUp: function(e){
    	const { btn } = this.$refs;
    	TweenMax.to(btn, 0.4, {z:0, ease: Power4.easeOut});
    	console.log("test")
    }
  }
});


$(document).ready(function() {
	$(".cinemaIntro > h2").lettering('words').children("span").lettering().children("span").lettering(); 
})
const homePage = new Vue({
  el: '#homePage',
  data: {
  	dx: 0,
  	dy: 0,
    onMenuShow: false
  },
  mounted: function() {
    const { btn } = this.$refs;
  	const tl = new TimelineMax();
  	tl
    .to($('#preloader'), 1.5, {autoAlpha: 0, ease:Power1.easeIn, delay: 0.5})
  	.fromTo(btn , 1, 
  		{bottom:-50, ease: Power1.easeOut},
  		{bottom:0, ease: Power1.easeOut}, '-=0.6')
  	.fromTo(btn , 2, 
  		{opacity:0, ease: Power1.easeOut},
  		{opacity:1, ease: Power1.easeOut}, '-=0.6')
  	.staggerFromTo($('.movieTitle .blindText span'), 0.7, 
  		{top: -100, opacity:1, ease: Power4.easeOut},
  		{top: 0, opacity:1, ease: Power4.easeOut}, 0.2, '-=1.5')
  },
  methods: {
    onClickBookTicket: function () {
    	location.href='page_combination.html';
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
    	TweenMax.to(btn, 0.2, {z:-65, ease: Power4.easeOut})
    },
    onMouseUp: function() {
      const { btn } = this.$refs;
      TweenMax.to(btn, 0.2, {
        z: 0,
        ease: Power4.easeOut
      });
    },
    onMenuClick: function(){
      const { frontLayer } = this.$refs;
      TweenMax.set(frontLayer, {cursor: 'pointer'});
      const tl = new TimelineMax();
      tl.to(frontLayer, 0.6, {
        scale: 0.5, xPercent: '-12%', rotationY: 15,
        ease: Expo.easeInOut
      })
      .staggerFromTo('.menuItem', 0.4,
       {y: 50, opacity: 0, ease: Expo.easeOut},
       {y: 0, opacity: 1, ease: Expo.easeOut }, 0.2, '-=0.3')
      .call(() => {this.onMenuShow = true})
    },
    closeMenu: function(){
      if(this.onMenuShow){
        const { frontLayer } = this.$refs;
        TweenMax.set(frontLayer, {cursor: 'initial'});
        const tl = new TimelineMax();
        tl
        .to('.menuItem', 0.4,
         {y: -50, opacity: 0, ease: Expo.easeOut })
        .to(frontLayer, 0.6, {
          scale: 1, xPercent: '0', rotationY: 0,
          ease: Expo.easeInOut
        }, '-=0.4')

        .call(() => {this.onMenuShow = false})
      }
    }
  }
});

$(document).ready(function() {
	$(".cinemaIntro > h2").lettering('words').children("span").lettering().children("span").lettering(); 
})
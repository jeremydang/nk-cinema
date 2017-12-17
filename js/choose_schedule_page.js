const baseWeekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const baseMonth = [ "January", "February", "March", "April",
              "May", "June", "July", "August",
              "September", "October", "November", "December" ] ;

const movieType = ["2D", "3D", "2D", "2D", "3D"];

const time = ["12:30", "15:00", "16:30", "18:30", "20:00"];


let weekDay = [];

let date = [];

let index = 0;

const chooseSchedule = new Vue({
  el: '#chooseSchedule',
  data: {
    weekDay : weekDay,
    date: date,
    month: baseMonth[new Date().getMonth()],
    movieType: movieType,
    time: time,
    activeDate: '',
    activeTime: '',
    dx: 0,
    dy: 0
  },
  mounted: function (){
    let d = new Date();
    for(index; index < baseWeekDay.length; index++){
      index === 0? d.setDate(d.getDate()) : d.setDate(d.getDate() + 1);
      this.date.push(d.getDate());
      this.weekDay.push(index === 0 ? "Today" : baseWeekDay[d.getDay()] );
    }
    this.setActiveDate(0);
    this.setActiveTime(0);
  },
  methods: {
    setActiveDate: function (itemIndex){
      this.activeDate = itemIndex;
    },
    setActiveTime: function (itemIndex){
      this.activeTime = itemIndex;
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

      TweenMax.to(btn, 0.4, {rotationX:dy/-1, rotationY:dx/10, ease: Sine.easeOut, 
        transformPerspective:900, transformOrigin:"center", transformStyle: "preserve-3d"});

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
      .to(btn, 0.2, {z:0, ease: Power4.easeOut}, '+=0.1') // temporary alternative to mouseup
    }
  }
});
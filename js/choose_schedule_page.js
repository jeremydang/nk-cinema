const baseWeekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const baseMonth = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const movieType = ['2D', '3D', '2D', '2D', '3D'];

const time = ['12:30', '15:00', '16:30', '18:30', '20:00'];

let weekDay = [];

let date = [];

let index = 0;

const seatsId = ['seat0'];

function createSeat(seatId) {
  const seat = document.createElement('i');
  seat.className = 'material-icons seatIcon';
  seat.innerHTML = 'weekend';
  seat.setAttribute('id', seatId);
  return seat;
}

const chooseSchedule = new Vue({
  el: '#chooseSchedule',
  data: {
    weekDay: weekDay,
    date: date,
    month: baseMonth[new Date().getMonth()],
    movieType: movieType,
    time: time,
    activeDate: '',
    activeTime: '',
    dx: 0,
    dy: 0,
    totalSeatPrice: 14,
    seatsId: seatsId,
    showChooseSchedule: false,
    currentBackgroundPoster: nowShowingMovies[0].posterUrlPath,
    currentMovieTitleLine1: nowShowingMovies[0].title[0],
    currentMovieTitleLine2: nowShowingMovies[0].title[1],
    currentMovieReleaseDate: nowShowingMovies[0].releaseDate,
    currentMovieCategory: nowShowingMovies[0].category,
    currentMovieImdbScore: nowShowingMovies[0].imdbScore,
    currentMovieRunningTime: nowShowingMovies[0].runningTime,
    currentMovieDetailPoster: nowShowingMovies[0].detailUrlPath,
    currentMovieUrlPath: nowShowingMovies[0].videoUrlPath,
    currentCinemaDescription: 'Oulu',
    selectedDate: '',
    selectedTime: ''
  },
  mounted: function() {
    this.$refs.seats.appendChild(createSeat(this.seatsId[0]));

    let d = new Date();
    for (index; index < baseWeekDay.length; index++) {
      index === 0 ? d.setDate(d.getDate()) : d.setDate(d.getDate() + 1);
      this.date.push(d.getDate());
      this.weekDay.push(index === 0 ? 'Today' : baseWeekDay[d.getDay()]);
    }
    this.setActiveDate(0);
    this.setActiveTime(0);
  },
  methods: {
    mount: function() {
      this.showChooseSchedule = true;
      const { backgroundPosterImg, bookingContainer } = this.$refs;
      TweenMax.fromTo(
        backgroundPosterImg,
        1,
        { opacity: 0.1 },
        { opacity: 0.5 }
      );
      TweenMax.fromTo(
        bookingContainer,
        2,
        { height: 0 },
        { height: 600, ease: Expo.easeOut }
      );
    },
    unmount: function(onComplete) {
      const { bookingContainer } = this.$refs;
      const tl = new TimelineMax();
      tl
        .fromTo(
          bookingContainer,
          1,
          {
            height: 600
          },
          { height: 0, ease: Expo.easeOut }
        )
        .fromTo(bookingContainer, 0.5, { opacity: 1 }, { opacity: 0 }, '-=0.5')
        .call(onComplete);
    },
    setActiveDate: function(itemIndex) {
      this.activeDate = itemIndex;
      this.selectedDate = this.date[itemIndex];
    },
    setActiveTime: function(itemIndex) {
      this.activeTime = itemIndex;
      this.selectedTime = this.time[itemIndex];
    },

    onMouseMove: function(e) {
      const { btn } = this.$refs;
      const { btnText } = this.$refs;

      const boundingClientRect = btn.getBoundingClientRect();

      const x = e.clientX - boundingClientRect.left;
      const y = e.clientY - boundingClientRect.top;
      const xc = boundingClientRect.width / 2;
      const yc = boundingClientRect.height / 2;

      dx = x - xc;
      dy = y - yc;

      TweenMax.to(btn, 0.4, {
        rotationX: dy / -1,
        rotationY: dx / 10,
        ease: Sine.easeOut,
        transformPerspective: 900,
        transformOrigin: 'center',
        transformStyle: 'preserve-3d'
      });
    },
    onMouseLeave: function(e) {
      const { btn } = this.$refs;
      const { btnText } = this.$refs;
      TweenMax.to([btn, btnText], 0.4, {
        rotationX: 0,
        rotationY: 0,
        ease: Sine.easeOut
      });
    },
    onClickChooseSeats: function() {
      this.unmount(() => {
        this.showChooseSchedule = false;
        chooseSeatPage.updateState({ ...this, selectedMonth: this.month });
        chooseSeatPage.setRandomSeats();
        chooseSeatPage.mount();
      });
    },
    onMouseDown: function(e) {
      const { btn } = this.$refs;
      const tl = new TimelineMax();
      tl
        .to(btn, 0.2, { z: -65, ease: Power4.easeOut })
        .to(btn, 0.2, { z: 0, ease: Power4.easeOut }, '+=0.1'); // temporary alternative to mouseup
    },
    addSeat: function(e) {
      const newlyAddedSeatId = 'seat' + this.seatsId.length;
      this.seatsId.push(newlyAddedSeatId);
      const seat = createSeat(newlyAddedSeatId);
      this.$refs.seats.appendChild(seat);
      const newlyAddedSeatElement = document.getElementById(newlyAddedSeatId);
      TweenMax.fromTo(
        newlyAddedSeatElement,
        0.5,
        { opacity: 0 },
        { opacity: 1 }
      );
    },
    removeSeat: function(e) {
      const lastSeatId = seatsId[seatsId.length - 1];
      const lastSeatElement = document.getElementById(lastSeatId);
      this.seatsId.pop();
      TweenMax.fromTo(
        lastSeatElement,
        0.2,
        { opacity: 1 },
        {
          opacity: 0,
          onComplete: () => this.$refs.seats.removeChild(lastSeatElement)
        }
      );
    },
    updateState: function({
      currentBackgroundPoster,
      currentMovieTitleLine1,
      currentMovieTitleLine2,
      currentMovieReleaseDate,
      currentMovieCategory,
      currentMovieImdbScore,
      currentMovieRunningTime,
      currentMovieDetailPoster,
      currentMovieUrlPath,
      currentCinemaDescription
    }) {
      this.currentBackgroundPoster = currentBackgroundPoster;
      this.currentMovieTitleLine1 = currentMovieTitleLine1;
      this.currentMovieTitleLine2 = currentMovieTitleLine2;
      this.currentMovieReleaseDate = currentMovieReleaseDate;
      this.currentMovieCategory = currentMovieCategory;
      this.currentMovieImdbScore = currentMovieImdbScore;
      this.currentMovieRunningTime = currentMovieRunningTime;
      this.currentMovieDetailPoster = currentMovieDetailPoster;
      this.currentMovieUrlPath = currentMovieUrlPath;
      this.currentCinemaDescription = currentCinemaDescription;
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
  },
  watch: {
    seatsId: function() {
      const newPrice = 14 * this.seatsId.length;
      TweenMax.to(this, 0.5, {
        totalSeatPrice: newPrice,
        roundProps: 'totalSeatPrice',
        ease: Linear.easeInOut,
        onComplete: () => {
          this.totalSeatPrice = newPrice;
        }
      });
    }
  }
});

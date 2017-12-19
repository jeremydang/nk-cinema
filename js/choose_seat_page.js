const seatRows = ['F', 'E', 'D', 'C', 'B', 'A'];

const seatNumbers = [
  [0, 1, 2, 3],
  [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17]
];

const seatProperties = {};
seatRows.forEach(seatRow => {
  seatProperties[seatRow] = [];
});

const availableColor = '#531EC6';
const takenColor = '#544A54';
const selectedColor = '#FF1F2F';

for (let i = 0; i < 18; i++) {
  Object.keys(seatProperties).forEach(key => {
    const random = Math.round(Math.random());
    seatProperties[key].push({
      color: random === 0 ? takenColor : availableColor
    });
  });
}

const chooseSeatPage = new Vue({
  el: '#chooseSeatPage',
  data: {
    seatRows: seatRows,
    seatNumbers: seatNumbers,
    seatProperties: seatProperties,
    selectedSeats: [],
    showChooseSeats: false,
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
    totalSeatPrice: 14,
    seatsId: [],
    selectedDate: '',
    selectedMonth: '',
    selectedTime: ''
  },
  computed: {
    selectedSeatsCount: function() {
      return Object.keys(seatProperties).reduce(
        (totalCount, currentRow) =>
          totalCount +
          seatProperties[currentRow].filter(
            seatNumber => seatNumber.color === selectedColor
          ).length,
        0
      );
    }
  },
  methods: {
    onClickCheckout: function() {
      this.unmount(() => {
        this.showChooseSeats = false;
        checkoutPage.updateState(this);
        checkoutPage.mount();
      });
    },
    onClickSelectSeat: function(seatRow, seatNumber) {
      const { color } = this.seatProperties[seatRow][seatNumber];
      if (color !== takenColor) {
        if (color === availableColor) {
          if (this.selectedSeats.length < this.seatsId.length) {
            TweenMax.fromTo(
              this.$refs[seatRow + seatNumber],
              0.5,
              { color: color },
              { color: selectedColor }
            );
            this.seatProperties[seatRow][seatNumber].color = selectedColor;
            this.selectedSeats.push(seatRow + seatNumber);
          }
        } else {
          TweenMax.fromTo(
            this.$refs[seatRow + seatNumber],
            0.5,
            { color: color },
            { color: availableColor }
          );
          this.seatProperties[seatRow][seatNumber].color = availableColor;
          this.selectedSeats = this.selectedSeats.filter(
            seat => seat !== seatRow + seatNumber
          );
        }
      }
    },
    setRandomSeats: function() {
      this.seatsId.forEach(() => {
        const randomSeatRow =
          seatRows[Math.floor(Math.random() * seatRows.length)];
        const randomSeatNum = Math.floor(Math.random() * 18);
        this.selectedSeats.push(randomSeatRow + randomSeatNum);
        this.seatProperties[randomSeatRow][randomSeatNum].color = selectedColor;
      });
    },
    mount: function() {
      this.showChooseSeats = true;
      const { bookingContainer } = this.$refs;
      TweenMax.from(bookingContainer, 2, { height: 0, ease: Expo.easeOut });
    },
    unmount: function(onComplete) {
      const { bookingContainer } = this.$refs;
      const tl = new TimelineMax();
      tl
        .to(bookingContainer, 1, {
          height: 0,
          ease: Expo.easeOut
        })
        .to(bookingContainer, 0.5, { opacity: 0 }, '-=0.5')
        .call(onComplete);
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
      currentCinemaDescription,
      totalSeatPrice,
      seatsId,
      selectedDate,
      selectedMonth,
      selectedTime
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
      this.totalSeatPrice = totalSeatPrice;
      this.seatsId = seatsId;
      this.selectedDate = selectedDate;
      this.selectedMonth = selectedMonth;
      this.selectedTime = selectedTime;
    }
  },
  watch: {
    selectedSeats: function() {
      TweenMax.fromTo(
        this.$refs.selectedSeats,
        0.5,
        { opacity: 0 },
        { opacity: 1 }
      );
    }
  }
});

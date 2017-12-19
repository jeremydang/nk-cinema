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

const chooseSetPage = new Vue({
  el: '#chooseSeatPage',
  data: {
    seatRows: seatRows,
    seatNumbers: seatNumbers,
    seatProperties: seatProperties,
    currentBackgroundPoster: "url('/assets/images/blade_runner_poster.jpg')",
    selectedSeats: []
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
    onClickSelectSeat: function(seatRow, seatNumber) {
      const { color } = this.seatProperties[seatRow][seatNumber];
      if (color !== takenColor) {
        if (color === availableColor) {
          TweenMax.fromTo(this.$refs[seatRow + seatNumber], 0.5, { color: color }, { color: selectedColor });
          this.seatProperties[seatRow][seatNumber].color = selectedColor;
          this.selectedSeats.push(seatRow + seatNumber);
        } else {
          TweenMax.fromTo(this.$refs[seatRow + seatNumber], 0.5, { color: color }, { color: availableColor });
          this.seatProperties[seatRow][seatNumber].color = availableColor;
          this.selectedSeats = this.selectedSeats.filter(seat => seat !== seatRow + seatNumber);
        }
      }
    }
  },
  watch: {
    selectedSeats: function () {
      TweenMax.fromTo(this.$refs.selectedSeats, 0.5, { opacity: 0 }, { opacity: 1 });
    }
  }
});

const chooseAreaPage = new Vue({
  el: '#chooseAreaPage',
  data: {
    currentCinemaMapPin: 'Oulu',
    currentCinemaDescription: 'Oulu',
    cinemas: ['Rovaniemi', 'Oulu', 'Tampere', 'Turku', 'Helsinki']
  },
  methods: {
    setActiveCinema: function(cinema) {
      const previousSelectedCinema = this.$refs[this.currentCinemaMapPin];
      const newlySelectedCinema = this.$refs[cinema];

      this.currentCinemaMapPin = cinema;
      const tl = new TimelineMax();
      tl
        .fromTo(
          previousSelectedCinema,
          0.7,
          { bottom: 0, opacity: 1 },
          { bottom: -50, opacity: 0, ease: Power4.easeOut }
        )
        .call(() => (this.currentCinemaDescription = cinema))
        .fromTo(
          newlySelectedCinema,
          0.7,
          { bottom: -50, opacity: 0 },
          { bottom: 0, opacity: 1 }
        );
    }
  },
  watch: {}
});

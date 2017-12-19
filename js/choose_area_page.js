const chooseAreaPage = new Vue({
  el: '#chooseAreaPage',
  data: {
    currentCinemaMapPin: 'Oulu',
    currentCinemaDescription: 'Oulu',
    cinemas: ['Rovaniemi', 'Oulu', 'Tampere', 'Turku', 'Helsinki'],
    showChooseArea: false,
    currentBackgroundPoster: nowShowingMovies[0].posterUrlPath,
    currentMovieTitleLine1: nowShowingMovies[0].title[0],
    currentMovieTitleLine2: nowShowingMovies[0].title[1],
    currentMovieReleaseDate: nowShowingMovies[0].releaseDate,
    currentMovieCategory: nowShowingMovies[0].category,
    currentMovieImdbScore: nowShowingMovies[0].imdbScore,
    currentMovieRunningTime: nowShowingMovies[0].runningTime,
    currentMovieDetailPoster: nowShowingMovies[0].detailUrlPath,
    currentMovieUrlPath: nowShowingMovies[0].videoUrlPath
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
    },
    mount: function() {
      this.showChooseArea = true;
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
      currentMovieUrlPath
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
    }
  },
  watch: {}
});

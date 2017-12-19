const movieTrailer = new Vue({
  el: '#movieTrailerPage',
  data: {
    showMovieTrailer: false,
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
    mount: function() {
      this.showMovieTrailer = true;
      const { movieTrailerPage } = this.$refs;

      TweenMax.fromTo(
        movieTrailerPage,
        1,
        { y: 50, opacity: 0, ease: Power4.easeOut },
        { y: 0, opacity: 1, ease: Power4.easeOut }
      );
    },
    unmount: function(onComplete) {
      const { movieTrailerPage } = this.$refs;

      TweenMax.fromTo(
        movieTrailerPage,
        1,
        { y: 0, opacity: 1 },
        { y: 50, opacity: 0, ease: Power4.easeOut, onComplete: onComplete }
      );
    },
    onClickBackToMovieDetail: function() {
      this.unmount(() => {
        this.showMovieTrailer = false;
        movieDetail.mount();
      });
    },
    onClickBookNow: function() {
      this.unmount(() => {
        this.showMovieTrailer = false;
        chooseAreaPage.updateState(this);
        chooseAreaPage.mount();
      });
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

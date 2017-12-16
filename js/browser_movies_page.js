let nowShowingMovies = [
  {
    posterImgPath: 'assets/images/star_war_poster.jpg',
    title: ['Star Wars: The', 'Last Jedi'],
    releaseDate: '15 December, 2017',
    imdbScore: 9.0,
    category: 'Adventure, Fantasy',
    runningTime: '2h 32min'
  },
  {
    posterImgPath: 'assets/images/wonder_woman_poster.jpg',
    title: ['Wonder Woman'],
    releaseDate: '2 June, 2017',
    imdbScore: 7.6,
    category: 'Action, Fantasy',
    runningTime: '2h 21min'
  },
  {
    posterImgPath: 'assets/images/blade_runner_poster.jpg',
    title: ['Blade Runner', '2049'],
    releaseDate: '6 October, 2017',
    imdbScore: 8.4,
    category: 'Mystery, Sci-Fi',
    runningTime: '2h 44min'
  }
];
// Add poster url path
nowShowingMovies = nowShowingMovies.map(movie => ({
  ...movie,
  posterUrlPath: `url('${movie.posterImgPath}')`
}));

let comingSoonMovies = [
  {
    posterImgPath: 'assets/images/justice_league_poster.jpg',
    title: ['Justice League'],
    releaseDate: '17 November, 2017',
    imdbScore: 7.2,
    category: 'Action, Fantasy',
    runningTime: '2h'
  },
  {
    posterImgPath: 'assets/images/thor_poster.jpg',
    title: ['Thor', 'Ragnarok'],
    releaseDate: '3 November, 2017',
    imdbScore: 8.2,
    category: 'Adventure, Comedy',
    runningTime: '2h 10min'
  },
  {
    posterImgPath: 'assets/images/assassin_creed_poster.jpg',
    title: ["Assassin's", 'Creed'],
    releaseDate: '21 December 2016',
    imdbScore: 5.8,
    category: 'Action, Adventure',
    runningTime: '1h 55min'
  }
];
// Add poster url path
comingSoonMovies = comingSoonMovies.map(movie => ({
  ...movie,
  posterUrlPath: `url('${movie.posterImgPath}')`
}));

const imgMultiplyCoeff = [0, -1, -2];

const browserWidth = document.documentElement.clientWidth;

const browserHeight = document.documentElement.clientHeight;

const browserMoviesPage = new Vue({
  el: '#browserMoviesPage',
  data: {
    currentImgIndex: 0,
    currentMovies: nowShowingMovies,
    currentBackgroundPoster: nowShowingMovies[0].posterUrlPath,
    currentMovieTitleLine1: nowShowingMovies[0].title[0],
    currentMovieTitleLine2: nowShowingMovies[0].title[1],
    currentMovieReleaseDate: nowShowingMovies[0].releaseDate,
    currentMovieCategory: nowShowingMovies[0].category,
    currentMovieImdbScore: nowShowingMovies[0].imdbScore,
    currentMovieRunningTime: nowShowingMovies[0].runningTime
  },
  methods: {
    onScrollPage: function() {
      this.currentImgIndex =
        this.currentImgIndex === imgMultiplyCoeff.length - 1
          ? 0
          : this.currentImgIndex + 1;
    },
    onClickNowShowing: function() {
      this.currentMovies = nowShowingMovies;
    },
    onClickComingSoon: function() {
      this.currentMovies = comingSoonMovies;
    }
  },
  watch: {
    currentBackgroundPoster: function() {
      const { backgroundPosterImg } = this.$refs;
      TweenMax.fromTo(
        backgroundPosterImg,
        0.7,
        { opacity: 0.2, ease: Power1.easeInOut },
        { opacity: 0.7, delay: 0.7, ease: Power1.easeInOut }
      );
    },
    currentImgIndex: function() {
      const { nowShowingMovieSlider } = this.$refs;
      TweenMax.to(nowShowingMovieSlider, 1.2, {
        y:
          (500 * 0.9 + browserHeight * 0.27) *
            imgMultiplyCoeff[this.currentImgIndex] +
          this.currentImgIndex * 13,
        ease: Expo.easeInOut
      });

      setTimeout(() => {
        this.currentBackgroundPoster = this.currentMovies[
          this.currentImgIndex
        ].posterUrlPath;

        this.currentMovieTitleLine1 = this.currentMovies[
          this.currentImgIndex
        ].title[0];

        this.currentMovieTitleLine2 = this.currentMovies[
          this.currentImgIndex
        ].title[1];

        this.currentMovieReleaseDate = this.currentMovies[
          this.currentImgIndex
        ].releaseDate;

        this.currentMovieCategory = this.currentMovies[
          this.currentImgIndex
        ].category;

        this.currentMovieImdbScore = this.currentMovies[
          this.currentImgIndex
        ].imdbScore;

        this.currentMovieRunningTime = this.currentMovies[
          this.currentImgIndex
        ].runningTime;
      }, 2000);
    },
    currentMovies: function() {
      const { nowShowing, comingSoon } = this.$refs;
      if (this.currentMovies === comingSoonMovies) {
        TweenMax.to(comingSoon, 0.5, { opacity: 1 });
        TweenMax.to(nowShowing, 0.5, { opacity: 0.2 });
      } else {
        TweenMax.to(comingSoon, 0.5, { opacity: 0.2 });
        TweenMax.to(nowShowing, 0.5, { opacity: 1 });
      }
    }
  }
});

let nowShowingMovies = [
  {
    posterImgPath: 'assets/images/star_war_poster.jpg',
    title: ['Star Wars: The', 'Last Jedi'],
    releaseDate: '15 December, 2017',
    imdbScore: 9.0,
    category: 'Action, Adventure, Fantasy',
    runningTime: '2h 32min'
  },
  {
    posterImgPath: 'assets/images/wonder_woman_poster.jpg',
    title: ['Wonder Woman'],
    releaseDate: '2 June, 2017',
    imdbScore: 7.6,
    category: 'Action, Adventure, Fantasy',
    runningTime: '2h 21min'
  },
  {
    posterImgPath: 'assets/images/blade_runner_poster.jpg',
    title: ['Blade Runner', '2049'],
    releaseDate: '6 October, 2017',
    imdbScore: 8.4,
    category: 'Mystery, Sci-Fi, Thriller',
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
    category: 'Action, Adventure, Fantasy',
    runningTime: '2h'
  },
  {
    posterImgPath: 'assets/images/thor_poster.jpg',
    title: ['Thor', 'Ragnarok'],
    releaseDate: '3 November, 2017',
    imdbScore: 8.2,
    category: 'Action, Adventure, Comedy',
    runningTime: '2h 10min'
  },
  {
    posterImgPath: 'assets/images/assassin_creed_poster.jpg',
    title: ["Assassin's Creed"],
    releaseDate: '21 December 2016',
    imdbScore: 5.8,
    category: 'Action, Adventure, Fantasy',
    runningTime: '1h 55min'
  }
];
// Add poster url path
comingSoonMovies = comingSoonMovies.map(movie => ({
  ...movie,
  posterUrlPath: `url('${movie.posterImgPath}')`
}));

const imgMultiplyCoeff = [1, 0, -1];

const browserMoviesPage = new Vue({
  el: '#browserMoviesPage',
  data: {
    currentImgIndex: 1,
    currentMovies: nowShowingMovies
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
  computed: {
    currentBackgroundPoster: function() {
      return this.currentMovies[this.currentImgIndex].posterImgPath;
    },
    currentMovieTitleLine1: function() {
      const movieTitle = this.currentMovies[this.currentImgIndex].title;
      return movieTitle[0];
    },
    currentMovieTitleLine2: function() {
      const movieTitle = this.currentMovies[this.currentImgIndex].title;
      return movieTitle[1];
    },
    currentMovieReleaseDate: function() {
      return this.currentMovies[this.currentImgIndex].releaseDate;
    },
    currentMovieCategory: function() {
      return this.currentMovies[this.currentImgIndex].category;
    },
    currentMovieImdbScore: function() {
      return this.currentMovies[this.currentImgIndex].imdbScore;
    },
    currentMovieRunningTime: function () {
      return this.currentMovies[this.currentImgIndex].runningTime;
    }
  },
  watch: {
    currentBackgroundPoster: function() {
      const { backgroundPosterImg } = this.$refs;
      TweenMax.fromTo(
        backgroundPosterImg,
        0.7,
        { opacity: 0 },
        { opacity: 0.7 }
      );
    },
    currentImgIndex: function() {
      const { nowShowingMovieSlider } = this.$refs;
      TweenMax.to(nowShowingMovieSlider, 0.7, {
        y: 800 * imgMultiplyCoeff[this.currentImgIndex],
        ease: Back.easeOut.config(1)
      });
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

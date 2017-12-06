const nowShowingPostersImgPath = [
  'assets/images/star_war_poster.jpg',
  'assets/images/wonder_woman_poster.jpg',
  'assets/images/blade_runner_poster.jpg'
];

const movieTitles = [
  ['Star Wars: The', 'Last Jedi'],
  ['Wonder Woman'],
  ['Blade Runner', '2049']
];

const imgMultiplyCoeff = [1, 0, -1];

const browserMoviesPage = new Vue({
  el: '#browserMoviesPage',
  data: {
    currentImgIndex: 1,
    nowShowingPosters: nowShowingPostersImgPath.map(
      poster => `url('${poster}')`
    )
  },
  methods: {
    onScrollPage: function() {
      this.currentImgIndex =
        this.currentImgIndex === imgMultiplyCoeff.length - 1
          ? 0
          : this.currentImgIndex + 1;
    }
  },
  computed: {
    currentBackgroundPoster: function() {
      return nowShowingPostersImgPath[this.currentImgIndex];
    },
    currentMovieTitleLine1: function() {
      const movieTitle = movieTitles[this.currentImgIndex];
      return movieTitle[0];
    },
    currentMovieTitleLine2: function() {
      const movieTitle = movieTitles[this.currentImgIndex];
      return movieTitle[1];
    }
  },
  watch: {
    currentBackgroundPoster: function() {
      const { backgroundPosterImg } = this.$refs;
      TweenMax.from(backgroundPosterImg, 0.7, { opacity: 0 });
    },
    currentImgIndex: function() {
      const { nowShowingMovieSlider } = this.$refs;
      TweenMax.to(nowShowingMovieSlider, 0.7, {
        y: 800 * imgMultiplyCoeff[this.currentImgIndex],
        ease: Back.easeOut.config(1)
      });
    }
  }
});

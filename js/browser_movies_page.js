const nowShowingPostersImgPath = [
  'assets/images/star_war_poster.jpg',
  'assets/images/wonder_woman_poster.jpg',
  'assets/images/blade_runner_poster.jpg'
];

const browserMoviesPage = new Vue({
  el: '#browserMoviesPage',
  data: {
    imgMultiplyCoeff: [1, 0, -1],
    currentImgIndex: 1,
    nowShowingPosters: nowShowingPostersImgPath.map(
      poster => `url('${poster}')`
    )
  },
  methods: {
    onScrollPage: function() {
      this.currentImgIndex =
        this.currentImgIndex === this.imgMultiplyCoeff.length - 1
          ? 0
          : this.currentImgIndex + 1;
      const { nowShowingMovieSlider } = this.$refs;
      TweenMax.to(nowShowingMovieSlider, 0.7, {
        y: 500 * this.imgMultiplyCoeff[this.currentImgIndex],
        ease: Back.easeOut.config(1)
      });
    }
  },
  computed: {
    currentBackgroundPoster: function() {
      return nowShowingPostersImgPath[this.currentImgIndex];
    }
  },
  watch: {
    currentBackgroundPoster: function() {
      const { backgroundPosterImg } = this.$refs;
      TweenMax.from(backgroundPosterImg, 0.7, { opacity: 0 });
    }
  }
});

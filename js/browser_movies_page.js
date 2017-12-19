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

const tl = new TimelineMax();

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
    currentMovieRunningTime: nowShowingMovies[0].runningTime,
    dx: 0,
    dy: 0,
    currentMovieChanged: false
  },
  mounted: function(){
    const tl = new TimelineMax();
    const { nowShowingMovieSlider } = this.$refs;
    const { movieTitle } = this.$refs;
    const { movieReleaseDate } = this.$refs;
    const { movieInfo } = this.$refs;
    const { nowShowing, comingSoon } = this.$refs;

    tl.fromTo(nowShowingMovieSlider, 1.5, 
      {y:100, opacity:0.5, ease: Power4.easeOut},
      {y:0, opacity:1, ease: Power4.easeOut})
    .fromTo([movieTitle, movieInfo, movieReleaseDate], 1, 
      {y:50, opacity:0, ease: Power4.easeOut},
      {y:0, opacity:1, ease: Power4.easeOut}, '-=0.7')
    .from(
      [nowShowing, comingSoon], 0.5, 
      {y:-10, opacity: 0, ease: Power2.easeOut}, '-=1.6')
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
    },
    onMouseMove: function (e) {
      const moviePoster = this.$el.querySelectorAll('.moviePoster')

      const boundingClientRect = moviePoster[this.currentImgIndex].getBoundingClientRect();

      const x = e.clientX - boundingClientRect.left
      const y = e.clientY - boundingClientRect.top
      const xc = boundingClientRect.width/2
      const yc = boundingClientRect.height/2
      
      dx = x - xc;
      dy = y - yc;

      TweenMax.to(moviePoster[this.currentImgIndex], 1, 
        {rotationX:dy/-60, rotationY:dx/60, ease: Sine.easeOut, });

    },
    onMouseLeave: function(e){
      const moviePoster = this.$el.querySelectorAll('.moviePoster')
      TweenMax.to(moviePoster[this.currentImgIndex], 0.4, {rotationX:0, rotationY:0, ease: Sine.easeOut});
    },
    onMouseDown: function(e){
      const moviePoster = this.$el.querySelectorAll('.moviePoster')
      const tl = new TimelineMax();
      tl.to(moviePoster[this.currentImgIndex], 0.2, {z:-65, ease: Power4.easeOut})
      .to(moviePoster[this.currentImgIndex], 0.2, {z:0, ease: Power4.easeOut}) // temporary alternative to mouseup
    },
    changeMovieDetail: function(){
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
    }

  },
  watch: {
    currentImgIndex: function() {
      if(!this.currentMovieChanged){
        const { nowShowingMovieSlider } = this.$refs;
        const { backgroundPosterImg } = this.$refs;
        const { MovieTitleLine1 } = this.$refs;
        const { MovieTitleLine2 } = this.$refs;
        const { movieReleaseDate1 } = this.$refs;
        const { movieReleaseDate2 } = this.$refs;
        const { movieScore } = this.$refs;
        const { movieDetail } = this.$refs;
        const moviePoster = this.$el.querySelectorAll('.moviePoster')

        tl
        .to(nowShowingMovieSlider, 1.4, {
          y:
            (500 * 0.9 + browserHeight * 0.27) *
              imgMultiplyCoeff[this.currentImgIndex] +
            this.currentImgIndex * 13,
          ease: Expo.easeInOut
        })
        .to(
          backgroundPosterImg,
          0.3,
          { opacity: 0, ease: Power2.easeIn }, '-=1.4')
        .to(
          moviePoster,
          0.3,
          { opacity: 0.4, ease: Power2.easeIn }, '-=1.3')
        .to(
          [MovieTitleLine1,MovieTitleLine2, movieReleaseDate1, 
          movieReleaseDate2, movieScore, movieDetail],
          0.5,
          {bottom: -200, opacity:0, ease: Expo.easeIn}, '-=1.6')
        .to(
          [MovieTitleLine1,MovieTitleLine2, movieReleaseDate1, 
          movieReleaseDate2, movieScore, movieDetail],
          0.5,
          {bottom: 0, opacity:1, ease: Expo.easeOut}, '-=0.6')
        .to(
          backgroundPosterImg,
          0.5,
          { opacity: 0.7, ease: Power2.easeIn}, '-=0.9')
        .to(
          moviePoster,
          0.3,
          { opacity: 1, ease: Power2.easeIn}, '-=0.9');

        setTimeout(() => browserMoviesPage.changeMovieDetail(), 700);
      }

    },
    currentMovies: function() {

      this.currentMovieChanged = true;

      this.currentImgIndex = 0;

      this.changeMovieDetail();

      const tl = new TimelineMax();
      const { nowShowingMovieSlider } = this.$refs;
      const { movieTitle } = this.$refs;
      const { movieReleaseDate } = this.$refs;
      const { movieInfo } = this.$refs;
      const { nowShowing, comingSoon } = this.$refs;

      tl.fromTo(nowShowingMovieSlider, 1.5, 
        {y:100, opacity:0.5, ease: Power4.easeOut},
        {y:0, opacity:1, ease: Power4.easeOut})
      .fromTo([movieTitle, movieInfo, movieReleaseDate], 1, 
        {y:50, opacity:0, ease: Power4.easeOut},
        {y:0, opacity:1, ease: Power4.easeOut}, '-=0.7')
      .call(function(){browserMoviesPage.currentMovieChanged = false})


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

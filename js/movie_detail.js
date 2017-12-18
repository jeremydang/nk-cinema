const movieDetail = new Vue({
  el: '#movieDetail',
  mounted: function () {
    const { posterContainer, detailContainer  } = this.$refs;
    TweenMax.from(posterContainer, 1.5, { left: -300, opacity: 0, ease: Power2.easeOut });
    TweenMax.from(detailContainer, 1.5, { right: -300, opacity: 0, ease: Power2.easeOut });
  },
});
const tl = new TimelineMax();

const checkoutPage = new Vue({
  el: '#checkoutPage',
  data: {
    selectedFood: 'Popcorn',
    popCorn: {
      count: 0,
      totalPrice: 0
    },
    cola: {
      count: 0,
      totalPrice: 0
    },
    totalPrice: 42,
    clientName: '',
    clientEmail: '',
    clientPhoneNumber: '',
    plusBtnClick: false,
    minusBtnClick: false,
  },
  methods: {
    onClickPopcorn: function() {
      this.selectedFood = 'Popcorn';
    },
    onClickCola: function() {
      this.selectedFood = 'Cola';
    },
    onClickAdd: function() {
      this.plusBtnClick = true;
      setTimeout( () => {this.plusBtnClick = false}, 500 )
      if (this.selectedFood === 'Popcorn') {
        this.popCorn.count += 1;
        const newPrice = 6.5 * this.popCorn.count;
        this.animatePrice(this.popCorn, newPrice);
        this.recalculateTotalPrice(newPrice, this.cola.totalPrice);
        const { popCornImg } = this.$refs;
        tl.to(popCornImg, 0.20,
        { y: -25, ease:Power4.easeOut })
        .to(popCornImg, 0.3,
        { y: 0, ease:Bounce.easeOut });
      } else {
        this.cola.count += 1;
        const newPrice = 4.5 * this.cola.count;
        this.animatePrice(this.cola, newPrice);
        this.recalculateTotalPrice(this.popCorn.totalPrice, newPrice);
        const { colaImg } = this.$refs;
        tl.to(colaImg, 0.20,
        { y: -25, ease:Power4.easeOut })
        .to(colaImg, 0.3,
        { y: 0, ease:Bounce.easeOut });
      }
    },
    onClickReduce: function() {
      this.minusBtnClick = true;
      setTimeout( () => {this.minusBtnClick = false}, 500 )
      if (this.selectedFood === 'Popcorn') {
        if (this.popCorn.count > 0) {
          this.popCorn.count -= 1;
          const newPrice = 6.5 * this.popCorn.count;
          this.animatePrice(this.popCorn, newPrice);
          this.recalculateTotalPrice(newPrice, this.cola.totalPrice);
          const { popCornImg } = this.$refs;
          tl.to(popCornImg, 0.2,
          { y: 8, scaleX: 1.1, scaleY: 0.9, ease:Power4.easeOut })
          .to(popCornImg, 0.2,
          { y: 0, scaleX: 1, scaleY: 1, ease:Bounce.easeOut });
        }
      } else {
        if (this.cola.count > 0) {
          this.cola.count -= 1;
          const newPrice = 4.5 * this.cola.count;
          this.animatePrice(this.cola, newPrice);
          this.recalculateTotalPrice(this.popCorn.totalPrice, newPrice);
          const { colaImg } = this.$refs;
          tl.to(colaImg, 0.2,
          { y: 8, scaleX: 1.1, scaleY: 0.9, ease:Power4.easeOut })
          .to(colaImg, 0.2,
          { y: 0, scaleX: 1, scaleY: 1, ease:Bounce.easeOut });
        }
      }
    },
    recalculateTotalPrice: function(popCornPrice, colaPrice) {
      const newPrice = 42 + popCornPrice + colaPrice;
      this.animatePrice(this, newPrice);
    },
    dimPopCornAni: function() {
      const { popCorn } = this.$refs;
      TweenMax.fromTo(
        popCorn,
        0.5,
        { opacity: 1, scale: 1 },
        { opacity: 0.3, scale: 0.8 }
      );
    },
    shinePopCornAni: function() {
      const { popCorn } = this.$refs;
      TweenMax.fromTo(
        popCorn,
        0.5,
        { opacity: 0.3, scale: 0.8 },
        { opacity: 1, scale: 1 }
      );
    },
    dimColaAni: function() {
      const { cola } = this.$refs;
      TweenMax.fromTo(
        cola,
        0.3,
        { opacity: 1, scale: 1 },
        { opacity: 0.3, scale: 0.8 }
      );
    },
    shineColaAni: function() {
      const { cola } = this.$refs;
      TweenMax.fromTo(
        cola,
        0.3,
        { opacity: 0.3, scale: 0.8 },
        { opacity: 1, scale: 1 }
      );
    },
    animatePrice: function(object, newPrice) {
      TweenMax.to(object, 0.5, {
        totalPrice: newPrice,
        roundProps: 'totalPrice',
        ease: Linear.easeInOut,
        onComplete: () => {
          object.totalPrice = newPrice;
        }
      });
    }
  },
  watch: {
    selectedFood: function() {
      if (this.selectedFood === 'Popcorn') {
        this.shinePopCornAni();
        this.dimColaAni();
      } else if (this.selectedFood === 'Cola') {
        this.shineColaAni();
        this.dimPopCornAni();
      }
    }
  }
});

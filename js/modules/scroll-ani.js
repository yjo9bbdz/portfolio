export const ScrollAni = {
  observer: null,

  init() {
    this.txt()

    if ('IntersectionObserver' in window) {
      if (!this.observer) {
        this.observer = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                $(entry.target).addClass('animated')
                observer.unobserve(entry.target)
              }
            })
          },
          { threshold: 0.1 }
        )
      }
      setTimeout(() => {
        this.observeAll()
        $(window).on('scroll', this.observeAll.bind(this))
        $(window).trigger('scroll')
      }, 300)
    } else {
      $(window).on('scroll', this.fallback.bind(this))
      this.fallback()
      $(window).trigger('scroll')
    }
  },

  isInViewport(el) {
    const rect = el.getBoundingClientRect()
    return rect.top < window.innerHeight && rect.bottom > 0
  },

  observeAll() {
    $('.scrollAni:not(.animated)').each((_, el) => {
      if (this.isInViewport(el)) {
        $(el).addClass('animated')
      } else {
        this.observer.observe(el)
      }
    })
  },

  fallback() {
    let offset = $(window).scrollTop() + $(window).height()
    $('.scrollAni').each(function () {
      let el = $(this)
      if (el.offset().top + el.height() - 20 < offset) {
        el.addClass('animated')
      }
    })
  },

  txt() {
    $('.scrollAniTxt').each(function () {
      let el = $(this)
      let txt = el.text()
      el.html('<span>' + txt + '</span>')
    })
  },
}

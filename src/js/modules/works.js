import { Helpers } from '../utils/helpers.js'

export const Works = {
  data: {
    num: 20,
    link: [
      { num: 3, url: 'https://www.changliu.com.tw/' },
      { num: 6, url: 'https://www.yuantoufood.com/' },
      { num: 10, url: 'https://www.motellin.com/' },
      { num: 12, url: 'https://www.ubl.com.tw/' },
      { num: 13, url: 'https://www.lihkang.com.tw/' },
      { num: 14, url: 'https://bitaust.com/' },
      { num: 15, url: 'https://hsinjung.com.tw/' },
      { num: 17, url: 'https://www.mutunepaltrek.com/' },
      { num: 20, url: 'https://www.pinyibio.com.tw/' },
    ],
    imgPath: 'works/',
    imgType: 'jpg',
  },

  offcanvasOpenedByPush: false,

  init() {
    this.buildNav()
    this.buildSecSwiper().then(() => this.initSecSwiper())
    this.initForSwiper()
    this.bindEvents()
  },

  BuildItem(id, btn, wp) {
    let items = []
    for (let i = 1; i <= this.data.num; i++) {
      let html = $(id).children().clone()
      let srcWebp = this.data.imgPath + i + '-sm.webp'
      let srcJpg = this.data.imgPath + i + '-sm.' + this.data.imgType
      let $btn

      if (html.prop('tagName') == 'A') {
        $btn = html
      } else {
        $btn = html.find(btn)
      }

      $btn.attr('data-works', i)

      if (i == 1) {
        $btn.addClass('active')
      }

      Helpers.imgSrc(html, srcWebp, srcJpg)

      let $item = html.prop('outerHTML')
      items.push($item)
    }

    $(wp).html(items.join(''))
    $(id).remove()
  },

  buildNav() {
    this.BuildItem('#workNavItem', '.swiper-nav', '.worksNavSwiper')
  },

  buildSecSwiper() {
    return new Promise((resolve) => {
      this.BuildItem(
        '#workSecItem',
        '.btn-offcanvas',
        '.worksSecSwiper .swiper-wrapper'
      )
      resolve()
    })
  },

  initSecSwiper() {
    this.secSwiper = new Swiper('.worksSecSwiper', {
      slidesPerView: 'auto',
      centeredSlides: true,
      initialSlide: 0,
      mousewheel: true,
      loop: true,
      lazy: true,
      breakpoints: {
        768: {
          centeredSlides: false,
        },
      },
      on: {
        init: function () {
          const swiper = this
          swiper.slideToLoop(0, 0)
          $('.worksSecSwiper .swiper-slide-active .btn-offcanvas').addClass(
            'active'
          )
        },
        afterInit: function () {
          setTimeout(() => {
            $('.worksSecSwiper').addClass('scrollAni')
          }, 100)
        },
        slideChangeTransitionStart: function () {
          $('.worksSecSwiper').removeClass('scrollAni animated')
          $('.worksSecSwiper .btn-offcanvas').removeClass('active')
        },
        slideChange: function () {
          setTimeout(function () {
            $('.worksSecSwiper .swiper-slide-active .btn-offcanvas').addClass(
              'active'
            )
          }, 300)
        },
      },
    })
  },

  initForSwiper() {
    let $this = this

    $this.forSwiper = new Swiper('.worksForSwiper', {
      autoHeight: true,
      effect: 'fade',
      lazy: true,
      zoom: true,
      virtual: {
        slides: (() => {
          let slides = []
          for (let i = 1; i <= $this.data.num; i++) {
            let html = $('#worksForItem').children().clone()
            let srcWebp = $this.data.imgPath + i + '.webp'
            let srcJpg = $this.data.imgPath + i + '.' + $this.data.imgType
            Helpers.imgSrc(html, srcWebp, srcJpg)

            slides.push(html.prop('outerHTML'))
          }
          return slides
        })(),
      },
      on: {
        activeIndexChange: function () {
          let activeWork = parseInt(this.activeIndex) + 1
          let hasLink = $this.data.link.find(
            (linkItem) => linkItem.num === activeWork
          )

          $('.worksForSwiper').parents('.offcanvas-body').scrollTop(0)
          $('.swiper-nav').removeClass('active')
          $('.swiper-nav[data-works="' + activeWork + '"]').addClass('active')

          if (hasLink) {
            $('.works-linkto').attr('href', hasLink.url).addClass('show')
          } else {
            $('.works-linkto').removeClass('show')
          }
        },
        slideChangeTransitionStart: function () {
          $('.swiper-lazy-preloader-custom').hide()
        },
        slideChangeTransitionEnd: function () {
          setTimeout(function () {
            $('.swiper-lazy-preloader-custom').fadeIn(150)
          }, 150)
        },
      },
    })
  },

  bindEvents() {
    $(document).on('click', '.swiper-nav', this.slideToWorksFor.bind(this))
    $(document).on('click', '.btn-offcanvas', this.slideToWorksFor.bind(this))
    $(document).on('click', '.btn-offcanvas', this.openOffcanvas.bind(this))
    $(document).on(
      'click',
      '.btn-close-offcanvas',
      this.closeOffcanvas.bind(this)
    )
    $(window).on('popstate', this.closeOffcanvas.bind(this))
  },

  slideToWorksFor(e) {
    e.preventDefault()
    let idx = parseInt($(e.currentTarget).data('works')) - 1
    this.forSwiper.slideTo(idx, 300)
  },

  openOffcanvas(e) {
    e.preventDefault()
    let scrollbarW = window.innerWidth - document.documentElement.clientWidth
    let id = $(e.currentTarget).attr('href')
    history.pushState({ offcanvasOpen: true }, '', '')
    this.offcanvasOpenedByPush = true
    $('body').css('padding-right', scrollbarW)
    $('body').addClass('overflow-hidden')
    $(id).addClass('show')
    $('.offcanvas-backdrop').addClass('show')

    setTimeout(function () {
      let $active = $('.swiper-nav.active')
      let scrolltoTop = $active.position()?.top || 0
      let scrolltoLeft = $active.position()?.left || 0
      if ($(window).innerWidth() >= 576) {
        $('.worksNavSwiper').parents('.offcanvas-body').scrollTop(scrolltoTop)
      } else {
        $('.worksNavSwiper').scrollLeft(scrolltoLeft)
      }
    }, 100)
  },

  closeOffcanvas(e) {
    $('.offcanvas').removeClass('show')
    $('.offcanvas-backdrop').removeClass('show')
    setTimeout(function () {
      $('body').removeClass('overflow-hidden')
      $('body').css('padding-right', '')
    }, 300)

    if (this.offcanvasOpenedByPush) {
      this.offcanvasOpenedByPush = false
      if (!e || e.type !== 'popstate') {
        history.back()
      }
    }
  },
}

const Skills = {
  data: [
    {
      typeEn: 'DEVELOP',
      typeTw: '專案開發',
      list: ['Flowchart', 'Wireframe', 'Prototype'],
    },
    {
      typeEn: 'SOFTWARE',
      typeTw: '設計軟體',
      list: ['Adobe Illustrator', 'Photoshop'],
    },
    {
      typeEn: 'PROGRAM',
      typeTw: '網頁技術',
      list: ['HTML', 'CSS / Sass', 'JavaScript / jQuery', 'PHP'],
    },
  ],

  init() {
    this.load()
  },

  load() {
    let id = $('#skillsItem')
    let items = []
    for (let i = 0; i < this.data.length; i++) {
      let skill = this.data[i]
      let list = skill.list
      let html = id.children().clone()
      let imgPath = 'images/index/skill-'
      let srcWebp = imgPath + (i + 1) + '.webp'
      let srcPng = imgPath + (i + 1) + '.png'
      imgSrc(html, srcWebp, srcPng, '工作能力-' + skill.typeTw)
      html.find('.skills-type-en').text(skill.typeEn)
      html.find('.skills-type-tw').text(skill.typeTw)
      for (let d = 0; d < list.length; d++) {
        html
          .find('dl')
          .append('<dd class="scrollAni scrollAniTxt">' + list[d] + '</dd>')
      }
      let $item = html.prop('outerHTML')
      items.push($item)
    }
    id.parents('.skillsRow').empty().append(items)
    id.remove()
  },
}

const Works = {
  data: {
    num: 20,
    imgPath: 'images/works/',
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

      imgSrc(html, srcWebp, srcJpg)

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
          $('.worksSecSwiper .swiper-slide-active .btn-offcanvas').addClass(
            'active'
          )
        },
        slideChangeTransitionStart: function () {
          $('.worksSecSwiper').removeClass('scrollAni animated')
          $('.worksSecSwiper .btn-offcanvas').removeClass('active')
        },
        slideChange: function () {
          setTimeout(function () {
            $('.worksSecSwiper .swiper-slide-active .btn-offcanvas').addClass(
              'active'
            ),
              300
          })
        },
      },
    })
    this.secSwiper.init()
  },

  initForSwiper() {
    this.forSwiper = new Swiper('.worksForSwiper', {
      autoHeight: true,
      effect: 'fade',
      lazy: true,
      zoom: true,
      virtual: {
        slides: (() => {
          let slides = []
          for (let i = 1; i <= this.data.num; i++) {
            let html = $('#worksForItem').children().clone()
            let srcWebp = this.data.imgPath + i + '.webp'
            let srcJpg = this.data.imgPath + i + '.' + this.data.imgType
            imgSrc(html, srcWebp, srcJpg)
            slides.push(html.prop('outerHTML'))
          }
          return slides
        })(),
      },
      on: {
        activeIndexChange: function () {
          let activeWork = parseInt(this.activeIndex) + 1

          $('.worksForSwiper').parents('.offcanvas-body').scrollTop(0)
          $('.swiper-nav').removeClass('active')
          $('.swiper-nav[data-works="' + activeWork + '"]').addClass('active')
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

const ScrollAni = {
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

const Parallax = {
  init() {
    $(window).on('scroll', this.run)
  },
  run() {
    const $parallax = $('.parallax')
    const scrollTop = $(window).scrollTop()
    $parallax.each(function () {
      const el = $(this)
      const style = el.data('parallax-style')
      const speed = el.data('parallax-speed')
      const num = -(scrollTop / speed)
      const unit = style === 'rotate' ? 'deg' : 'px'
      el.css('transform', style + '(' + num + unit + ')')
    })
  },
}

const Header = {
  init() {
    this.padding()
    $(window).on('resize', this.padding)
    $(window).on('load', this.padding)
  },
  padding() {
    let windowH = $(window).outerHeight()
    let windowW = $(window).outerWidth()
    let windowRatioW = windowW * 0.75
    let headerRealH = $('.header-wrapper').outerHeight()
    let headerVisitH
    let headerPadding = $('.header')
      .css('--header-contact-over-height')
      .replace('rem', '')

    $('.header').css('--header-height', headerRealH + 'px')

    if (windowW >= 992 && windowH <= windowRatioW) {
      headerPadding = headerPadding + 'rem'
      headerVisitH = headerRealH + 160
    } else {
      headerPadding = headerPadding / 2 + 'rem'
      headerVisitH = headerRealH + 80
    }

    if (windowH >= headerVisitH && windowH <= windowRatioW) {
      $('.header').css('padding-top', '')
    } else {
      $('.header').css('padding-top', headerPadding)
    }
  },
}

function imgSrc(item, webp, type, alt) {
  item.find('picture source').attr('srcset', webp)
  item.find('picture img').attr('src', type)

  if (alt) {
    item.find('picture img').attr('alt', alt)
  }
}

$(function () {
  Skills.init()
  Works.init()
  ScrollAni.init()
  Parallax.init()
  Header.init()
})

$('.scrollToTop').click(function () {
  $('html,body').animate({ scrollTop: 0 }, 500)
})

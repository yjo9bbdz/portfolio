export const Header = {
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

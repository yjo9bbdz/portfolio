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
    let headerPadding = $('.header').css('--header-contact-over-height')

    $('.header').css('--header-height', headerRealH + 'px')

    if (windowH <= windowRatioW) {
      headerVisitH = headerRealH + 160
    } else {
      headerVisitH = headerRealH + 80
    }

    if (windowH >= headerVisitH && windowH <= windowRatioW) {
      $('.header').css('padding-top', '')
    } else {
      $('.header').css('padding-top', headerPadding)
    }
  },
}

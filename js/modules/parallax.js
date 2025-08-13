export const Parallax = {
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

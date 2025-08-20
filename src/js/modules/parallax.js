export const Parallax = {
  init() {
    $(window).on('scroll', this.run)
    this.run()
  },
  run() {
    const $parallax = $('.parallax')
    const windowHeight = $(window).height()
    $parallax.each(function () {
      const el = $(this)
      const style = el.data('parallax-style') || 'translateY'
      const speed = parseFloat(el.data('parallax-speed')) || 50
      const isFixed = el.css('position') === 'fixed'

      let num
      if (isFixed) {
        num = -($(window).scrollTop() / speed)
      } else {
        const rect = el[0].getBoundingClientRect()
        const progress =
          (windowHeight - rect.top) / (windowHeight + rect.height)
        const clamped = Math.max(0, Math.min(1, progress))
        num = (clamped - 0.5) * 2 * speed
      }

      const unit = style === 'rotate' ? 'deg' : 'px'
      el.css('transform', style + '(' + num + unit + ')')
    })
  },
}

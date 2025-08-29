export const Loader = {
  isVisible: true,
  hideTime: 400,
  onLoadCompleteCallbacks: [],

  hide: function () {
    if (!this.isVisible) return

    $('.loader').addClass('is-hidden')

    setTimeout(() => {
      $('.loader').hide()
    }, this.hideTime)

    this.onLoadCompleteCallbacks.forEach((callback) => {
      if (typeof callback === 'function') {
        callback()
      }
    })

    this.isVisible = false
  },

  onLoadComplete: function (callback) {
    if (typeof callback === 'function') {
      this.onLoadCompleteCallbacks.push(callback)
    }
  },

  init: function () {
    const hideLoader = () => {
      this.hide(this.hideTime)
    }

    $(window).on('load', function () {
      setTimeout(hideLoader, 500)
    })

    setTimeout(hideLoader, 3000)
  },
}

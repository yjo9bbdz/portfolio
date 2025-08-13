export const Loader = {
  isVisible: true,
  hideTime: 400,
  hideTimeout: null,
  onLoadCompleteCallbacks: [],

  hideLoader: function () {
    $('.loader').addClass('is-hidden')

    setTimeout(() => {
      $('.loader').hide()
    }, this.hideTime)

    this.onLoadCompleteCallbacks.forEach((callback) => {
      if (typeof callback === 'function') {
        callback()
      }
    })
  },

  show: function () {
    $('.loader').removeClass('is-hidden')
    this.isVisible = true
  },

  hide: function (delay) {
    if (!this.isVisible) return

    const hideDelay = delay || 0
    const self = this

    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout)
    }

    this.hideTimeout = setTimeout(function () {
      self.hideLoader()
      self.isVisible = false
    }, hideDelay)
  },

  getVisibleStatus: function () {
    return this.isVisible
  },

  onLoadComplete: function (callback) {
    if (typeof callback === 'function') {
      this.onLoadCompleteCallbacks.push(callback)
    }
  },

  init: function () {
    const self = this

    const hideLoader = function () {
      self.hide(this.hideTime)
    }

    $(window).on('load', function () {
      setTimeout(hideLoader, 500)
    })

    setTimeout(hideLoader, 3000)
  },
}

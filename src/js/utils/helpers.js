export const Helpers = {
  imgSrc(item, webp, type, alt) {
    item.find('picture source').attr('srcset', webp)
    item.find('picture img').attr('src', type)

    if (alt) {
      item.find('picture img').attr('alt', alt)
    }
  },

  scrollToTop() {
    $('html,body').animate({ scrollTop: 0 }, 500)
  },
}

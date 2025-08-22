export const Helpers = {
  imgSrc(item, webp, type, alt) {
    let imgRoot = 'images/'
    item.find('picture source').attr('srcset', imgRoot + webp)
    item.find('picture img').attr('src', imgRoot + type)

    if (alt) {
      item.find('picture img').attr('alt', alt)
    }
  },

  scrollToTop() {
    $('html,body').animate({ scrollTop: 0 }, 500)
  },
}

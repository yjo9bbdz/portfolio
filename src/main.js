import { Helpers } from './js/utils/helpers.js'
import { Header } from './js/modules/header.js'
import { Skills } from './js/modules/skills.js'
import { Works } from './js/modules/works.js'
import { Loader } from './js/modules/loader.js'
import { ScrollAni } from './js/modules/scroll-ani.js'
import { Parallax } from './js/modules/parallax.js'

$(function () {
  Header.init()
  Skills.init()
  Works.init()
  Loader.onLoadComplete(function () {
    ScrollAni.init()
  })
  Loader.init()
  Parallax.init()
})

$('.scrollToTop').click(Helpers.scrollToTop)

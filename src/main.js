import { Helpers } from './js/utils/helpers'
import { Header } from './js/modules/header'
import { Skills } from './js/modules/skills'
import { Works } from './js/modules/works'
import { Loader } from './js/modules/loader'
import { ScrollAni } from './js/modules/scroll-ani'
import { Parallax } from './js/modules/parallax'

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

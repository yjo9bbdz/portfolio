import { Helpers } from './utils/helpers.js'
import { Header } from './modules/header.js'
import { Skills } from './modules/skills.js'
import { Works } from './modules/works.js'
import { Loader } from './modules/loader.js'
import { ScrollAni } from './modules/scroll-ani.js'
import { Parallax } from './modules/parallax.js'

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

import { ImgSrc } from '../utils/helpers.js'

export const Skills = {
  data: [
    {
      typeEn: 'DEVELOP',
      typeTw: '專案開發',
      list: ['Flowchart', 'Wireframe', 'Prototype'],
    },
    {
      typeEn: 'SOFTWARE',
      typeTw: '設計軟體',
      list: ['Adobe Illustrator', 'Photoshop'],
    },
    {
      typeEn: 'PROGRAM',
      typeTw: '網頁技術',
      list: ['HTML', 'CSS / Sass', 'JavaScript / jQuery', 'PHP'],
    },
  ],

  init() {
    this.load()
  },

  load() {
    let id = $('#skillsItem')
    let items = []
    this.data.forEach((item, i) => {
      let list = item.list
      let html = id.children().clone()
      let imgPath = 'index/skill-'
      let srcWebp = imgPath + (i + 1) + '.webp'
      let srcPng = imgPath + (i + 1) + '.png'
      ImgSrc(html, srcWebp, srcPng, '工作能力-' + item.typeTw)
      html.find('.skills-type-en').text(item.typeEn)
      html.find('.skills-type-tw').text(item.typeTw)
      list.forEach((dd) => {
        html.find('dl').append(`<dd class="scrollAniTxt">${dd}</dd>`)
      })
      let itemHtml = html.prop('outerHTML')
      items.push(itemHtml)
    })
    id.parents('.skillsRow').empty().append(items)
    id.remove()
  },
}

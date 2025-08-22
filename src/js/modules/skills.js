import { Helpers } from '../utils/helpers.js'

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
    for (let i = 0; i < this.data.length; i++) {
      let skill = this.data[i]
      let list = skill.list
      let html = id.children().clone()
      let imgPath = 'index/skill-'
      let srcWebp = imgPath + (i + 1) + '.webp'
      let srcPng = imgPath + (i + 1) + '.png'
      Helpers.imgSrc(html, srcWebp, srcPng, '工作能力-' + skill.typeTw)
      html.find('.skills-type-en').text(skill.typeEn)
      html.find('.skills-type-tw').text(skill.typeTw)
      for (let d = 0; d < list.length; d++) {
        html.find('dl').append('<dd class="scrollAniTxt">' + list[d] + '</dd>')
      }
      let $item = html.prop('outerHTML')
      items.push($item)
    }
    id.parents('.skillsRow').empty().append(items)
    id.remove()
  },
}

import idiom from 'idiom.js'

const lang = idiom({
  'default': {
    'welcome':  'Im Miracle Max Go away!'
    // 'Oh wait! I could use your help!',
    // 'I have these groovy potions to mix'
  },
  'pt-BR': {
    'welcome': 'Bem vindo ao Phaser + ES6 + Webpack!'
  }
})

export default lang(window.navigator.language)

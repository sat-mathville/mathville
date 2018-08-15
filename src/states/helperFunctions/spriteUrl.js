import store from '../../store'

export default () => {
  if (store.getState().user.character === 1) return '../assets/images/boy.png'
  else if (store.getState().user.character === 2) return '../assets/images/girl.png'
}

import store from '../../store'

export default function renderFinalOutput (score,questionsLength,id) {
  if (store.getState().userAbilities.has(id)) return 'Good job! But you have done this before. \nGo somewhere else!'
  if (score === questionsLength) {
    return 'Congratulations! You have leveled up!'
  } else {
    return `I'm sorry. You have not answered enough questions correctly. \nPlease come back for some more magic practice!`
  }
}

import store from '../../store'
import wrap from './wrap'

export default function renderFinalOutput (score,questionsLength,id) {
  const str = '\n\nClick HERE to leave'
  const abilityName = store.getState().abilities.find(ability => ability.id===id)
  if (score === questionsLength) {
    if (store.getState().userAbilities.has(id)) return wrap('Good job! But you have done this before. Go somewhere else!', 50) + str
    return wrap(`Congratulations! You have leveled up! You just got ${abilityName.name}`, 50) + str
  } else {
    return wrap(`I'm sorry. You have not answered enough questions correctly. Please come back to get ${abilityName.name.toLowerCase()}.`, 50) + str
  }
}

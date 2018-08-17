import store from '../../store'

export default function renderFinalOutput (score,questionsLength,id) {
  const str = '\n\nClick HERE to leave'
  if (score === questionsLength) {
    if (store.getState().userAbilities.has(id)) return 'Good job! But you have done this before. \nGo somewhere else!' + str
    return 'Congratulations! You have leveled up!' + str
  } else {
    const abilityName = store.getState().abilities.find(ability => ability.id===id)
    return `I'm sorry. You have not answered enough questions correctly. \nPlease come back to get ${abilityName.name.toLowerCase()}.` + str
  }
}

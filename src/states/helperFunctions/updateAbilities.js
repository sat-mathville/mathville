import store, {addNewAbilityThunk} from '../../store'
import renderAbilities from './renderAbilities'

export default (npc, gameState) => {
  const unsubscribed = store.subscribe(
    () => renderAbilities(gameState)
  )
  store.subscribe(() => {
    unsubscribed()
  })
  store.dispatch(addNewAbilityThunk(dict[npc]))
}

const dict = {
  Farmer: 2,
  Warrior: 7,
  Fisherman: 6,
  Chicken: 8
}

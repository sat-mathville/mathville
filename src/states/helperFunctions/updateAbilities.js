import store, {addNewAbilityThunk} from '../../store'
import renderAbilities from './renderAbilities'

export default (npc, gameState) => {
  if (npc !== 'Pythagoras') {
    const unsubscribed = store.subscribe(
      () => renderAbilities(gameState)
    )
    store.subscribe(() => {
      unsubscribed()
    })
    store.dispatch(addNewAbilityThunk(dict[npc]))
  } else {
    gameState.game.state.start('ending')
  }
}

const dict = {
  Farmer: 2,
  Warrior: 6,
  Fisherman: 5,
  Chicken: 7,
  Orc: 8
}

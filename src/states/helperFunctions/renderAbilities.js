import store from '../../store'

export default gameState => {
  let x = 0
  let y = 0

  const images = fetchSupplies()

  for (let i = 1; i <= store.getState().userAbilities.size; i++) {
    x = (i * 35) + 140
    let xcount = 0

    if (i > 4) {
      y = 45
      x = (xcount * 35) + 174
      xcount++
    } else {
      y = 9
    }

    gameState.abilityImages = gameState.add.image(x, y, images[i - 1])
    gameState.abilityImages.fixedToCamera = true
  }
}

function fetchSupplies () {
  const abilitiesIds = store.getState().userAbilities
  let images = []
  for (let entry of abilitiesIds) {
    images.push(store.getState().abilities.find(ability => ability.id === entry).image)
  }
  return images
}

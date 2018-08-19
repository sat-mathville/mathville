import store, {addNewAbilityThunk} from '../../store'
import correctAnswer from './correctAnswer'
import renderFinalOutput from './renderFinalOutputMsg'
import wrap from './wrap'

export default function renderGift(){
    if(!(store.getState().userAbilities.has(id)))
        store.dispatch(addNewAbilityThunk(id))
}
import store, {addNewAbilityThunk} from '../../store'
import wrap from './wrap'

export default function renderGift(id){
    if(!(store.getState().userAbilities.has(id))){
        store.dispatch(addNewAbilityThunk(id))
    }
        console.log('woops')
        // return 'I am not undefined'
}
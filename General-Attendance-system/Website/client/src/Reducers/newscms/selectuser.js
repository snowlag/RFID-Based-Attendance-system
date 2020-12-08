import { SET_SELECT_USER} from "src/actions/types"
const initialState ={}

export default function(state = initialState , action){
    switch(action.type) {
        case SET_SELECT_USER:
      return action.payload
    default:
      return state;
  }
}
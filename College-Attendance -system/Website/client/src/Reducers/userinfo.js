import { CURRENT_USER_INFO} from "../actions/types"
const initialState ={}

export default function(state = initialState , action){
    switch(action.type) {
        case CURRENT_USER_INFO:
      return action.payload
    default:
      return state;
  }
}
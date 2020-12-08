import { GET_USER_ID} from "src/actions/types"
const initialState ={}

export default function(state = initialState , action){
    switch(action.type) {
        case  GET_USER_ID:
      return action.payload
    default:
      return state;
  }
}
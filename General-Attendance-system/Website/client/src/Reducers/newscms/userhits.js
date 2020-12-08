import {  GET_USERS_HITS} from "src/actions/types"
const initialState ={
  data: {}

}

export default function(state = initialState , action){
    switch(action.type) {
        case GET_USERS_HITS:
      return {
           data : action.payload,
      };
    default:
      return state;
  }
}
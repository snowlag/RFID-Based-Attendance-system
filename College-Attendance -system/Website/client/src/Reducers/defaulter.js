import {  GET_DEFAULTER_LIST} from "src/actions/types"
const initialState ={
   data: [],
}

export default function(state = initialState , action){
    switch(action.type) {
        case GET_DEFAULTER_LIST:
      return {
        ...state,
        data: action.payload,        
      };
    default:
      return state;
  }
}
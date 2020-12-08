import {  GET_USER_LIST} from "src/actions/types"
const initialState ={
   data: [],
}

export default function(state = initialState , action){
    switch(action.type) {
        case  GET_USER_LIST:
      return {
        ...state,
        data: action.payload,        
      };
    default:
      return state;
  }
}
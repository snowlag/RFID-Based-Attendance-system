import {GET_CATEGORIES} from "src/actions/types"
const initialState ={
   data: [],

}

export default function(state = initialState , action){
    switch(action.type) {
        case GET_CATEGORIES:
      return {
        data: action.payload.Items,
      };
    default:
      return state;
  }
}
import {  GET_GLOBAL_STATS} from "src/actions/types"
const initialState ={
  data: {}

}

export default function(state = initialState , action){
    switch(action.type) {
        case  GET_GLOBAL_STATS:
      return {
           data : action.payload,
      };
    default:
      return state;
  }
}
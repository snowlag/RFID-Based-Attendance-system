import {  GET_MONTHLY_FAILED_NOTIFICATION} from "src/actions/types"
const initialState ={
  data: {}

}

export default function(state = initialState , action){
    switch(action.type) {
        case GET_MONTHLY_FAILED_NOTIFICATION:
      return {
           data : action.payload,
      };
    default:
      return state;
  }
}
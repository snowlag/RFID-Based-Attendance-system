import {GET_FAILED_NOTIFICATIONS } from "src/actions/types"

const initialState ={
   data:[],
   Key: [],
}

export default function(state = initialState , action){
    switch(action.type) {
        case GET_FAILED_NOTIFICATIONS:
      return {
        data : action.payload.Items,
       Key: action.payload.LastEvaluatedKey,
      };
    default:
      return state;
  }
}
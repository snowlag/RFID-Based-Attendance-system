

import {GET_USER_LIST} from "../actions/types"
const initialState ={
   Data: [],
   key: []
}

export default function(state = initialState , action){
    switch(action.type) {
        case GET_USER_LIST:
      return {
        ...state,
        Data: action.payload.Items,
        key: action.payload.LastEvaluatedKey
        
      };
    default:
      return state;
  }
}
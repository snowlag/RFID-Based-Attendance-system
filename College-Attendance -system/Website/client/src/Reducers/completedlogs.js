import {GET_COMPLETED_LOGS,} from "../actions/types"
const initialState ={
   Data: [],
   key: []
}

export default function(state = initialState , action){
    switch(action.type) {
        case GET_COMPLETED_LOGS:
      return {
        ...state,
        Data: action.payload.Items,
        key: action.payload.LastEvaluatedKey
        
      };
    default:
      return state;
  }
}

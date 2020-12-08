import {GET_PAGINATED_LECTURES,} from "../actions/types"
const initialState ={
   Data: [],
   key: []
}

export default function(state = initialState , action){
    switch(action.type) {
        case GET_PAGINATED_LECTURES:
      return {
        ...state,
        Data: action.payload.Items,
        key: action.payload.LastEvaluatedKey
        
      };
    default:
      return state;
  }
}

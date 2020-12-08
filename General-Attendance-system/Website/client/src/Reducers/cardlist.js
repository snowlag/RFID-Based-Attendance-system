import { GET_CARD_LIST} from "src/actions/types"
const initialState ={
   Data :[],
   Key: []

}

export default function(state = initialState , action){
    switch(action.type) {
        case GET_CARD_LIST:
      return {
       Data : action.payload.Items,
       Key: action.payload.LastEvaluatedKey    
      };
    default:
      return state;
  }
}
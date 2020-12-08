import {GET_ADS} from "src/actions/types"
const initialState ={
   Data :[],
   Key: []

}

export default function(state = initialState , action){
    switch(action.type) {
        case GET_ADS:
      return {
       Data : action.payload.Items,
       Key: action.payload.LastEvaluatedKey    
      };
    default:
      return state;
  }
}
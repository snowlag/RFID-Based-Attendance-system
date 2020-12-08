import {GET_RECENT_POSTS} from "src/actions/types"
const initialState ={
   Data :[],
   Key: []

}

export default function(state = initialState , action){
    switch(action.type) {
        case GET_RECENT_POSTS:
      return {
       Data : action.payload.Items,
       Key: action.payload.LastEvaluatedKey    
      };
    default:
      return state;
  }
}
import {  GET_TOP_POSTS} from "src/actions/types"
const initialState ={
  data: {}

}

export default function(state = initialState , action){
    switch(action.type) {
        case GET_TOP_POSTS:
      return {
           data : action.payload,
      };
    default:
      return state;
  }
}
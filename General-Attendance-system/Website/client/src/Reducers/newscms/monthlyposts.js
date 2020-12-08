import { GET_MONTHLY_POSTS} from "src/actions/types"
const initialState ={
  data: {}

}

export default function(state = initialState , action){
    switch(action.type) {
        case GET_MONTHLY_POSTS:
      return {
           data : action.payload,
      };
    default:
      return state;
  }
}
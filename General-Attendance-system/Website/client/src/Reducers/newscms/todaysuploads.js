import { GET_USER_TODAY_UPLOADS} from "src/actions/types"
const initialState ={
  data: {}

}

export default function(state = initialState , action){
    switch(action.type) {
        case GET_USER_TODAY_UPLOADS:
      return {
           data : action.payload,
      };
    default:
      return state;
  }
}
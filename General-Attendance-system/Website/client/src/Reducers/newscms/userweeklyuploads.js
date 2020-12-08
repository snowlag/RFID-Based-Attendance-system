import { GET_USERWEEKLY_UPLOADS} from "src/actions/types"
const initialState ={
  data: {}

}

export default function(state = initialState , action){
    switch(action.type) {
        case GET_USERWEEKLY_UPLOADS:
      return {
           data : action.payload,
      };
    default:
      return state;
  }
}
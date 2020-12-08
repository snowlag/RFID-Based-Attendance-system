import { SET_POST} from "src/actions/types"
const initialState ={
  Post: {}

}

export default function(state = initialState , action){
    switch(action.type) {
        case SET_POST:
      return {
           Post : action.payload,
      };
    default:
      return state;
  }
}
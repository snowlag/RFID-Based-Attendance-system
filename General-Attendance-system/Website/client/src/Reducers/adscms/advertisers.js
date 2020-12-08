import { GET_ADVERTISERS} from "src/actions/types"
const initialState ={
   data: [],
}

export default function(state = initialState , action){
    switch(action.type) {
        case GET_ADVERTISERS:
      return {
        ...state,
        data: action.payload,        
      };
    default:
      return state;
  }
}
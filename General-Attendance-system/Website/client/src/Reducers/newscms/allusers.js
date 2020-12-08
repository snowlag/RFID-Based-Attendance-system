import { GET_ALL_USERS} from "src/actions/types"
const initialState ={
   data: [],
}

export default function(state = initialState , action){
    switch(action.type) {
        case GET_ALL_USERS:
      return {
        ...state,
        data: action.payload,        
      };
    default:
      return state;
  }
}
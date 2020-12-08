import { GET_MONTHLY_NOTIFICATIONS} from "src/actions/types"
const initialState ={
  data: {}

}

export default function(state = initialState , action){
    switch(action.type) {
        case GET_MONTHLY_NOTIFICATIONS:
      return {
           data : action.payload,
      };
    default:
      return state;
  }
}
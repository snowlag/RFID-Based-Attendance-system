import { USER_MONTHLY_AD_CLICKS} from "src/actions/types"
const initialState ={
  data: {}

}

export default function(state = initialState , action){
    switch(action.type) {
        case USER_MONTHLY_AD_CLICKS:
      return {
           data : action.payload,
      };
    default:
      return state;
  }
}
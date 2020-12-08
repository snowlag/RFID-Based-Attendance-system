import { WEEKLY_AD_CLICKS} from "src/actions/types"
const initialState ={
  data: {}

}

export default function(state = initialState , action){
    switch(action.type) {
        case WEEKLY_AD_CLICKS:
      return {
           data : action.payload,
      };
    default:
      return state;
  }
}
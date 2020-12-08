import axios from "axios"
import keys from "src/keys"
import {
  CLEAR_ERRORS,
  GET_ALL_DEVICE_LIST,
  GET_CARD_LIST,
  GET_COMPLETED_LOGS,
  GET_DEVICE_LIST,
  GET_EARLYLEAVE_LOGS,
  GET_ERRORS,
  GET_PRESENT_LOGS,
  GET_USER_LIST
} from "./types";


//Route to add new device
export const AddNewDevice = (device , navigate) => dispatch=> {
  dispatch(clearErrors());
  axios
  .post("/api/add/device" , {device})
   .then(res => {
    navigate('/app/dashboard', { replace: true })
   })
   .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err
  })
   })
}





//Route to add new user
export const AddNewUser = (user , navigate) => dispatch=> {
  dispatch(clearErrors());
  axios
  .post("/api/add/user" , {user})
   .then(res => {
    navigate('/app/create/device', { replace: true })
   })
   .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err
  })
   })
}


//route to get device list
export const GetDeviceList= (LastEvaluatedKey) => dispatch=> {

  axios
   .post("/api/paginated/devicelist" , {LastEvaluatedKey})
   .then(res =>
      dispatch({
          type: GET_DEVICE_LIST,
          payload: res.data
      })     
      )
   .catch( err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err
    })
   }
);
}

//route to get card list
export const GetCardList= (LastEvaluatedKey) => dispatch=> {

  axios
   .post("/api/paginated/cardlist" , {LastEvaluatedKey})
   .then(res =>
      dispatch({
          type: GET_CARD_LIST,
          payload: res.data
      })     
      )
   .catch( err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err
    })
   }
);
}

//route to get card list
export const GetpaginatedUsers= (id , LastEvaluatedKey) => dispatch=> {
  console.log(id)
  axios
   .post(`/api/paginated/userlist/${id}` , {LastEvaluatedKey})
   .then(res =>
      dispatch({
          type: GET_USER_LIST,
          payload: res.data
      })     
      )
   .catch( err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err
    })
   }
);
}

//route to get card list
export const GetAllDevices= () => dispatch=> {

  axios
   .get("/api/all/devices")
   .then(res =>
      dispatch({
          type: GET_ALL_DEVICE_LIST,
          payload: res.data
      })     
      )
   .catch( err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err
    })
   }
);
}


//route to get card list
export const GetTimeInLogs= (id , LastEvaluatedKey) => dispatch=> {
  console.log(id)
  axios
   .post(`/api/paginated/presentlogs/${id}` , {LastEvaluatedKey})
   .then(res =>
      dispatch({
          type: GET_PRESENT_LOGS,
          payload: res.data
      })     
      )
   .catch( err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err
    })
   }
);
}


//route to get timeout logs
export const GetEarlyLeaveLogs= (id , timestamp , LastEvaluatedKey) => dispatch=> {
  console.log(id)
  axios
   .post(`/api/paginated/earlyleavelogs/${id}/${timestamp}` , {LastEvaluatedKey})
   .then(res =>
      dispatch({
          type: GET_EARLYLEAVE_LOGS,
          payload: res.data
      })     
      )
   .catch( err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err
    })
   }
);
}


//route to get tim logs
export const GetTimeOutLogs= (id , timestamp , LastEvaluatedKey) => dispatch=> {
  console.log(id)
  axios
   .post(`/api/paginated/completedlogs/${id}/${timestamp}` , {LastEvaluatedKey})
   .then(res =>
      dispatch({
          type: GET_COMPLETED_LOGS,
          payload: res.data
      })     
      )
   .catch( err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err
    })
   }
);
}



//clear redux error state
export const clearErrors  = () => dispatch =>{
  dispatch({ 
    type: CLEAR_ERRORS
  })
 }

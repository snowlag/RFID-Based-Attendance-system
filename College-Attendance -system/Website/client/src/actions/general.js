import axios from "axios"
import keys from "src/keys"
import {
  CLEAR_ERRORS,
  GET_ALL_SUBJECT_LIST,
  GET_CARD_LIST,
  GET_COMPLETED_LOGS,
  GET_DEFAULTER_LIST,
  GET_DEVICE_LIST,
  GET_EARLYLEAVE_LOGS,
  GET_ERRORS,
  GET_PAGINATED_LECTURES,
  GET_PRESENT_LOGS,
  GET_USER_LIST
} from "./types";


//Route to add new device
export const AddNewSubject = (subject , navigate) => dispatch=> {
  dispatch(clearErrors());
  axios
  .post("/api/add/subject" , {subject})
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
    navigate('/app/users', { replace: true })
   })
   .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err
  })
   })
}


//route to get device list
export const GetSubjectList= (LastEvaluatedKey) => dispatch=> {

  axios
   .post("/api/paginated/subjectlist" , {LastEvaluatedKey})
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


//route to get all subject list
export const GetAllSubjectList= (LastEvaluatedKey) => dispatch=> {

  axios
   .get("/api/all/subjects" , {LastEvaluatedKey})
   .then(res =>
      dispatch({
          type: GET_ALL_SUBJECT_LIST,
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
export const GetpaginatedUsers= (LastEvaluatedKey) => dispatch=> {
  axios
   .post(`/api/paginated/userlist` , {LastEvaluatedKey})
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
          type: GET_ALL_SUBJECT_LIST,
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
   .post(`/api/paginated/attendance/${id}/${timestamp}` , {LastEvaluatedKey})
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


//route to get timeout logs
export const GetpaginatedLectures= (day , LastEvaluatedKey) => dispatch=> {
  
  axios
   .post(`/api/paginated/lecturelist/${day}` , {LastEvaluatedKey})
   .then(res =>
      dispatch({
          type: GET_PAGINATED_LECTURES,
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


//route to get all subject list
export const GetDefaulterList= (item) => dispatch=> {

  axios
   .post("/api/logs/defaulters" , item)
   .then(res =>
      dispatch({
          type: GET_DEFAULTER_LIST,
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

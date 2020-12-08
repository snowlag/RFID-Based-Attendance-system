import axios from "axios"
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER, GET_ERRORS, GET_USER_LIST, GET_A_USER_LIST, CURRENT_USER_INFO , CLEAR_ERRORS, GET_ALL_USERS, SET_SELECT_USER } from "./types";



//Routes related to Authentication

//-----------------------------------------------------------------------------------------------------------------
//Route to register publisher
//Access = Admin
//POST Method
export const registerAdmin= (userdata , navigate) => dispatch=> {
  dispatch(clearErrors());
    axios
     .post("/auth/register/Admin", userdata)
     .then(res =>
        navigate('/app/customers', { replace: true })
        )
     .catch( err => {
      dispatch({
          type: GET_ERRORS,
          payload: err.response.data
      })
     }
        
  );
}


//Route to register Advertiser
//Access = Admin
//POST Method
export const registerAdvertiser= (userdata , navigate) => dispatch=> {
  dispatch(clearErrors());
    axios
     .post("/auth/register/Advertiser", userdata)
     .then(res =>
        navigate('/app/advertiserlist', { replace: true })
        )
     .catch( err => {
      dispatch({
          type: GET_ERRORS,
          payload: err.response.data
      })
     }
        
  );
}
//-----------------------------------------------------------------------------------------------------------------
//Route to login User
//Access = Public
//Get Access token from server and set to header 
export const loginUser = (userdata , navigate) => dispatch => {
  dispatch(clearErrors());
axios.post("/auth/login" , userdata)
    .then(res => {
        // Save to localStorage
        const { token } = res.data;
        // Set token to ls
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
        console.log(decoded)
        //Go to Dashboard
        navigate('/app/dashboard', { replace: true })
  
       
      })
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response? err.response.data : err
        })
        );
    };
//----------------------------------------------------------------------------------------------------------------------
//Route to set user logged info to state    
// Set logged in user
export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  };
//---------------------------------------------------------------------------------------------
// Log user out
//Route to delete user token 
//redirect to landing page  
export const logoutUser = () => dispatch => {
  dispatch(clearErrors());
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  
  };
export const UpdatePassword = (userdata , navigate) => dispatch=>{
  dispatch(clearErrors());
  axios
     .put("/auth/changePassword", userdata)
     .then(res =>
         navigate('/app/customers')      
        )
     .catch( err => 
         dispatch({
             type: GET_ERRORS,
             payload: err.response.data
         })
        );

} 

//Admin Route
//Route to get users
//Used in manage user section to get user list
export const GetUsers = (LastEvaluatedKey ) => dispatch => {
  axios
   .post("/auth/publisherlist" , {LastEvaluatedKey})
    .then(res => {
      dispatch({
        type: GET_USER_LIST,
        payload: res.data
      }) 
    }

    )
    .catch(err => {
      dispatch({
        type: GET_USER_LIST,
        payload: []
      }) 
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : err.response
    })
    })
    
}

//Admin Route
//Route to get users
//Used in manage user section to get user list
export const GetAdvertisers = (LastEvaluatedKey ) => dispatch => {
  axios
   .post("/auth/advertiserlist" , {LastEvaluatedKey})
    .then(res => {
      dispatch({
        type: GET_USER_LIST,
        payload: res.data
      }) 
    }

    )
    .catch(err => {
      dispatch({
        type: GET_USER_LIST,
        payload: []
      }) 
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : err.response
    })
    })
    
}

export const GetArchiveUsers = (LastEvaluatedKey ) => dispatch => {
  axios
   .post("/auth/archiveuserlist/publishers" , {LastEvaluatedKey})
    .then(res => {
      dispatch({
        type: GET_A_USER_LIST,
        payload: res.data
      }) 
    }

    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : err
      })
      dispatch({
        type: GET_A_USER_LIST,
        payload: []
      }) 
    })
    
}


export const GetArchiveAdvertisers = (LastEvaluatedKey ) => dispatch => {
  axios
   .post("/auth/archiveuserlist/advertisers" , {LastEvaluatedKey})
    .then(res => {
      dispatch({
        type: GET_A_USER_LIST,
        payload: res.data
      }) 
    }

    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : err
      })
      dispatch({
        type: GET_A_USER_LIST,
        payload: []
      }) 
    })
    
}


//Get logged in user inbfo
export const GetUserInfo = () => dispatch => {
  dispatch(clearErrors());
  axios
   .get("/api/user/current")
    .then(res => {
      dispatch({
        type: CURRENT_USER_INFO,
        payload: res.data
      }) 
    }
    )
    .catch(err => {
      dispatch({
        type: CURRENT_USER_INFO,
        payload: {}
      }) 
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : err
      })
    })
};


//Get logged in user inbfo
export const GetSelectedUserInfo = (id) => dispatch => {
  dispatch(clearErrors());
  axios
   .get(`/api/admin/getuser/${id}`)
    .then(res => {
      dispatch({
        type: SET_SELECT_USER,
        payload: res.data
      }) 
    }
    )
    .catch(err => {
      dispatch({
        type: SET_SELECT_USER,
        payload: {}
      }) 
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : err
      })
    })
};

//Admin Route
//Route to get users
//Used in manage user section to get user list
export const GetAllUsers = () => dispatch => {
  axios
   .get("/auth/allusers")
    .then(res => {
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data
      }) 
    }
    )
    .catch(err => {
      dispatch({
        type: GET_ALL_USERS,
        payload: []
      }) 
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : err
      })

    })   
}

//Admin Route
//Route to get all advertisers
export const GetAllAdvertisers = () => dispatch => {
  axios
   .get("/auth/alladvertisers")
    .then(res => {
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data
      }) 
    }
    )
    .catch(err => {
      dispatch({
        type: GET_ALL_USERS,
        payload: []
      }) 
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : err
      })

    })   
}
export const clearErrors  = () => dispatch =>{
  dispatch({ 
    type: CLEAR_ERRORS
  })
 }
import axios from "axios"
import {
    GET_USER_MONTHLY_POSTS,
    GET_USER_WEEKLY_POSTS,
    GET_MONTHLY_POSTS,
    GET_USER_UPLOADS,
    GET_USERS_HITS,
    GET_WEEKLY_POSTS,
    GET_ERRORS,
    GET_ACTIVITY,
    GET_GLOBAL_STATS,
    GET_TOP_POSTS,
    GET_USERMONTHLY_UPLOADS,
    GET_USERWEEKLY_UPLOADS,
    GET_MONTHLY_NOTIFICATIONS,
    GET_MONTHLY_FAILED_NOTIFICATION,
    GET_USER_TODAY_UPLOADS, MONTHLY_AD_CLICKS, WEEKLY_AD_CLICKS, DAILY_AD_CLICKS, USER_MONTHLY_AD_CLICKS , USER_WEEKLY_AD_CLICKS, TOTAL_AD_CLICKS
} from  "./types"



//Get User Book Uploads count
export const GetUserUploads = () => dispatch => {
    console.log("Calling")
    axios.get("/api/useruploads")
    .then(res =>{
      dispatch({
        type: GET_USER_UPLOADS,
        payload:  res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : err.response
      })
     );
  }

  
//Get User Post hits
export const GetUserHits = () => dispatch => {
    axios.get("/api/userhits")
    .then(res =>{
      dispatch({
        type: GET_USERS_HITS,
        payload:  res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : err.response
      })
     );
  }

  //Get User posts Uploads count
export const GetUserMonthlyPostUploads = (item) => dispatch => {
    axios.get(`/api/getUserMonthly/postuploads/${item.monthnum}/${item.year}`)
    .then(res =>{
      dispatch({
        type: GET_USER_MONTHLY_POSTS,
        payload:  res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : err.response
      })
     );
  }
  
//get user post monthly
export const GetUserWeeklyPostUploads = (item) => dispatch => {
    axios.get(`/api/getUserWeekly/postuploads/${item.week}/${item.monthnum}/${item.year}`)
    .then(res =>{
      dispatch({
        type: GET_USER_WEEKLY_POSTS,
        payload:  res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : err.response
      })
     );
  }

  
//Get monthly posts uploads
export const GetMonthlyPostUploads = () => dispatch => {
 
    axios.get("/api/getMonthly/postuploads")
    .then(res =>{
      dispatch({
        type: GET_MONTHLY_POSTS,
        payload:  res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : err.response
      })
     );
  }

  
//Get weekly post uploads
export const GetWeeklyPostUploads = () => dispatch => {
 
    axios.get("/api/getWeekly/postuploads")
    .then(res =>{
      dispatch({
        type: GET_MONTHLY_POSTS,
        payload:  res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : err.response
      })
     );
  }

  
//Get todays user posts upload count
export const GetUserTodaysUpload = () => dispatch => {
 
  axios.get("/api/today/useruploads")
  .then(res =>{
    dispatch({
      type: GET_USER_TODAY_UPLOADS,
      payload:  res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err.response
    })
   );
}

//Get top 10 posts of currewnt user
export const GetTopPosts = () => dispatch => {
 
  axios.get("/api/user/topposts")
  .then(res =>{
    dispatch({
      type: GET_TOP_POSTS,
      payload:  res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err.response
    })
   );
}


//Get top 10 posts of currewnt user
export const GetSelectedUserTopPosts = (id) => dispatch => {
 
  axios.get(`/api/admin/topposts/${id}`)
  .then(res =>{
    dispatch({
      type: GET_TOP_POSTS,
      payload:  res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err.response
    })
   );
}

//Get  User monthly uploads
export const GetUserUploadCount = () => dispatch => {

  axios.get("/api/user/monthlyuploads")
  .then(res =>{
    dispatch({
      type: GET_USERMONTHLY_UPLOADS,
      payload:  res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err.response
    })
   );
}


//Get for particular User monthly uploads
export const GetSelectedUserUploadCount = (id) => dispatch => {

  axios.get(`/api/admin/monthlyuploads/${id}`)
  .then(res =>{
    dispatch({
      type: GET_USERMONTHLY_UPLOADS,
      payload:  res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err.response
    })
   );
}

//Get for particular User mpnthly uploads
export const GetUserWeeklyUploadCount = () => dispatch => {

  axios.get("/api/user/weeklyuploads")
  .then(res =>{
    dispatch({
      type: GET_USERWEEKLY_UPLOADS,
      payload:  res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err.response
    })
   );
}

export const GetSelectedUserWeeklyUploadCount = (id) => dispatch => {
  axios.get(`/api/admin/weeklyuploads/${id}`)
  .then(res =>{
    dispatch({
      type: GET_USERWEEKLY_UPLOADS,
      payload:  res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err.response
    })
   );
}


//Get monthly notification count
export const GetMonthlyNotificationCount = () => dispatch => {

  axios.get("/api/getMonthly/notificationcount")
  .then(res =>{
    dispatch({
      type: GET_MONTHLY_NOTIFICATIONS,
      payload:  res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err.response
    })
   );
}

//Get Weekly Notification count
export const GetWeeklyNotificationCount = () => dispatch => {

  axios.get("/api/getWeekly/notificationcount")
  .then(res =>{
    dispatch({
      type: GET_MONTHLY_NOTIFICATIONS,
      payload:  res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err.response
    })
   );
}

//Get for particular User monthly uploads
export const GetMonthlyFailedNotificationCount = () => dispatch => {

  axios.get("/api/getMonthly/failednotificationcount")
  .then(res =>{
    dispatch({
      type: GET_MONTHLY_FAILED_NOTIFICATION,
      payload:  res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err.response
    })
   );
}

//Get Weekly failed notification count
export const GetWeeklyFailedNotificationCount = () => dispatch => {

  axios.get("/api/getWeekly/failednotificationcount")
  .then(res =>{
    dispatch({
      type: GET_MONTHLY_FAILED_NOTIFICATION,
      payload:  res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err.response
    })
   );
}
  
//Get global counters
export const GetGlobalStats = () => dispatch => {
 
  axios.get("/api/globalstats")
  .then(res =>{
    dispatch({
      type: GET_GLOBAL_STATS,
      payload:  res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err.response
    })
   );
}

 //Get monthly ad clicks
 export const GetUsersMonthlyAdClicks = (item) => dispatch => {
  axios.get(`/api/getUserMonthly/adclicks/${item.monthnum}/${item.year}`)
  .then(res =>{
    dispatch({
      type: MONTHLY_AD_CLICKS,
      payload:  res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err.response
    })
   );
}

//get user post monthly
export const GetUsersWeeklyAdClicks = (item) => dispatch => {
  axios.get(`/api/getUserWeekly/adclicks/${item.week}/${item.monthnum}/${item.year}`)
  .then(res =>{
    dispatch({
      type: WEEKLY_AD_CLICKS,
      payload:  res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err.response
    })
   );
}

//get todays ads clicks of user
export const GetUsersTodaysAdClicks = () => dispatch => {
 
  axios.get("/api/today/adclicks")
  .then(res =>{
    dispatch({
      type: DAILY_AD_CLICKS,
      payload:  res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err.response
    })
   );
}

//Get particular user last 3 months ad clicks
export const GetSelectedUserMonthlyAdClicks = (id) => dispatch => {

  axios.get(`/api/monthlyadclicks/${id}`)
  .then(res =>{
    dispatch({
      type: USER_MONTHLY_AD_CLICKS,
      payload:  res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err.response
    })
   );
}

//Get for particular user weekly ad clicks
export const GetSelectedUserWeeklyAdClicks = (id) => dispatch => {

  axios.get(`/api/weeklyadclicks/${id}`)
  .then(res =>{
    dispatch({
      type: USER_WEEKLY_AD_CLICKS,
      payload:  res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err.response
    })
   );
}

//Get Ads global counters
export const GetGlobalAdCounter = () => dispatch => {
  dispatch({
    type: GET_GLOBAL_STATS,
    payload:  {}
  })
  
  axios.get("/api/globaladcounters")
  .then(res =>{
    dispatch({
      type: GET_GLOBAL_STATS,
      payload:  res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err.response
    })
   );
}

 
//Get   Advertisers clicks
export const GetTotalAdvertisersClicks = () => dispatch => {
  axios.get("/api/advertiserstotalclicks")
  .then(res =>{
    dispatch({
      type: TOTAL_AD_CLICKS,
      payload:  res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err.response
    })
   );
}
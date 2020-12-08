import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer'
import userlist from './userlist';
import globalstats from './globalstats';

//new
import devicelist from './devicelist';
import cardlist from './cardlist';
import userinfo from './userinfo';
import alldevicelist from './alldevicelist';
import presentlogs from './presentlogs';
import earlyleavelogs from './earlyleavelogs';
import completedlogs from './completedlogs';
import lectures from './lectures';
import defaulter from './defaulter';




export default combineReducers({
    auth : authReducer,
    error: errorReducer,
     globalstats: globalstats,
     devicelist: devicelist,
     cardlist: cardlist,
     userinfo: userinfo,
     userlist : userlist,
     allsubjectlist: alldevicelist,
     presentlogs: presentlogs,
     earlyleavelogs: earlyleavelogs,
     completedlogs: completedlogs,
     lectures: lectures,
     defaulterlist : defaulter


})
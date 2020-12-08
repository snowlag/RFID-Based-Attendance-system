import {combineReducers} from 'redux';
import authReducer from './newscms/authReducer';
import errorReducer from './newscms/errorReducer'
import userlist from './userlist';
import globalstats from './newscms/globalstats';

//new
import devicelist from './devicelist';
import cardlist from './cardlist';
import userinfo from './userinfo';
import alldevicelist from './alldevicelist';
import presentlogs from './presentlogs';
import earlyleavelogs from './earlyleavelogs';
import completedlogs from './completedlogs';




export default combineReducers({
    auth : authReducer,
    error: errorReducer,
     globalstats: globalstats,
     devicelist: devicelist,
     cardlist: cardlist,
     userinfo: userinfo,
     userlist : userlist,
     alldevicelist: alldevicelist,
     presentlogs: presentlogs,
     earlyleavelogs: earlyleavelogs,
     completedlogs: completedlogs


})
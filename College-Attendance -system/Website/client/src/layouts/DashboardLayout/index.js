import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import { connect } from "react-redux";
import {logoutUser , GetUserInfo} from 'src/actions/authAction'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = (props) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();
  const [User , setUser] = React.useState({}) 

useEffect( () => {
 setUser(props.userinfo)
}, [props.userinfo])  


  //Admin Authentication
  useEffect( () => {   
    if(!props.auth.isAuthenticated){
     navigate("/login")
    }
   }, [props.auth])
   


useEffect( () => {
  if(props.errors === "Unauthorized"){
    props.logoutUser()
  }
 }, [props.errors])  
 
 


  //Admin Authentication
  useEffect( () => {   
   props.GetUserInfo();
  }, [props.auth])
  

const handlelogoutUser = () => {
  props.logoutUser()
}

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} handlelogoutUser = {handlelogoutUser} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        User= {User}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps =(state) =>({
  auth: state.auth, 
  userinfo: state.userinfo,
  errors: state.error
  });
  
export default connect(mapStateToProps, {logoutUser , GetUserInfo})(DashboardLayout);


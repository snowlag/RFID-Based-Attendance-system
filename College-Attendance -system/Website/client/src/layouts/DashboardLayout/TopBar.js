import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import {logoutUser} from 'src/actions/authAction'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  Tooltip
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  },
  title: {
    flexGrow: 1,
    color: "white"
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: '#3f51b5',
    boxShadow: theme.shadows[1],
    fontSize: 15,
  },
}))(Tooltip);


const TopBar = ({
  className,
  onMobileNavOpen,
  handlelogoutUser,
  ...rest
}) => {
  const classes = useStyles();
  const [notifications] = useState([]);



  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={1}
      {...rest}
    >
      <Toolbar>
    
      <Typography variant="h3"  className={classes.title}>
      <RouterLink to="/app/dashboard">
            <span style={{color: "white"}}>RFID College Attendance System</span>
       </RouterLink>  
      </Typography>
       
        <Box flexGrow={1} />
        <LightTooltip title="Logout">
          <IconButton onClick = {handlelogoutUser}color="inherit">
            <InputIcon />
          </IconButton>
        </LightTooltip>
        <Hidden lgUp>
        <LightTooltip title="Menue">
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </LightTooltip>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
  handlelogoutUser: PropTypes.func,
};

export default TopBar;

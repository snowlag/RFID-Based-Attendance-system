import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import keys from 'src/keys'
import PostAddIcon from '@material-ui/icons/PostAdd';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import DynamicFeedOutlinedIcon from '@material-ui/icons/DynamicFeedOutlined';
import ViewArrayOutlinedIcon from '@material-ui/icons/ViewArrayOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  Plus as Plus
} from 'react-feather';

import NavItem from './NavItem';
import DynamicNavItems from './DynamicNavbar'
import ListIcon from '@material-ui/icons/List';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import { RiAdvertisementLine } from 'react-icons/ri';
import { FaRegNewspaper } from 'react-icons/fa';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import SimCardIcon from '@material-ui/icons/SimCard';
import GroupIcon from '@material-ui/icons/Group';
import DescriptionIcon from '@material-ui/icons/Description';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import SubjectIcon from '@material-ui/icons/Subject';
import DuoIcon from '@material-ui/icons/Duo';

const Dynamicitems = [
  {
    href: '/app/create/device',
    icon: SubjectIcon,
    title: 'Subjects',
    dropdown: false
  },
  {
    href: '/app/card/list',
    icon:  SimCardIcon,
    title: 'Cards',
    dropdown: false
  },
  {
  href: '/app/users',
  icon: GroupIcon,
  title: 'Registered Users',
  dropdown: false
 },
 {
  href: '/app/lectures',
  icon:  DuoIcon,
  title: 'Lectures',
  dropdown: false
 }, 
 {
  href: '/app/logs/attendance',
  icon: EmojiPeopleIcon ,
  title: 'Attendance',
  dropdown: false
 }, 
 {
  href: '/app/logs/defaulter',
  icon: AccessibilityIcon ,
  title: 'Export Defaulters',
  dropdown: false
 },
  {
    menue: 'Admin',
    dropdown: true,
    icon: UsersIcon,
    items : [   
      {
        href: '/app/register/admin',
        icon: UserPlusIcon,
        title: 'Register Admin'
      },
    ]
  }, 
 
];





const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile , User }) => {
  const classes = useStyles();
  const location = useLocation();


  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);


  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {User.Username ? User.Username : 'Ankit Joshi'}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Admin Account
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        {/* <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List> */}
          {Dynamicitems.map((item) => (
            <DynamicNavItems
              href={item.href}
              key={item.title}
              title={item.title}      
              menue = {item.menue}
              childs = {item.items}
              icon={item.icon}
              dropdown = {item.dropdown}
             
            />
          ))}
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

const mapStateToProps =(state) =>({
  auth: state.auth,
  errors: state.error,
  userinfo: state.userinfo
  });
  
export default connect(mapStateToProps, {})(NavBar);

import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import NavItem from './NavItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {
  Button,
  ListItem,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

const DynamicNavItem = ({
  className,
  href,
  icon: Icon,
  title,
  menue,
  childs,
  dropdown,
  item,
  ...rest
}) => {
  const classes = useStyles();
const [toggleclick , setToogleClick] = React.useState(false)

const viewClick = () => {
  setToogleClick(!toggleclick)
}

let option;
if(dropdown ){
    option = 
    <ListItem
    className={clsx(classes.item, className)}
    disableGutters
    {...rest}
  >   
  <Button
      className={classes.button}
      onClick={viewClick}
    >
      {Icon && (
          <Icon
            className={classes.icon}
            size="20"
          />
        )}
        <span className={classes.title}>
                {menue}
         </span>
         {toggleclick ? <ExpandLessIcon /> : <ExpandMoreIcon/>}        
    </Button>
  </ListItem>
}else{
 option =  
         <NavItem
         href={href}
         key={title}
         title={title}
         icon={Icon}

        />
}

let ViewArea;
if(toggleclick){
    ViewArea =  childs.map((item) => (
                    <NavItem
                    href={item.href}
                    key={item.title}
                    title={item.title}
                    icon={item.icon}
                    isChild = {true}
                    />
                ))
}else{
    ViewArea = null
}




  return (
    <>
     {option}
     {ViewArea}
    </>
  );
};

DynamicNavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default DynamicNavItem;

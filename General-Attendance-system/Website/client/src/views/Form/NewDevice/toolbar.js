import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  makeStyles,
  Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import {useNavigate} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
    <Typography
     color="textPrimary"
     variant="h2"
   >
   </Typography>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;

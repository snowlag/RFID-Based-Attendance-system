import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import Toolbar from './toolbar';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import DevicleList from "./devicelist"


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const PostForm = (props) => {
  const classes = useStyles();
  

  return (
    <Page
      className={classes.root}
      title="Cards"
    >
      <Container maxWidth="lg">
      <Toolbar />
      <br></br>
       <div>
         < DevicleList />
       </div>
      </Container>
    </Page>
  );
};
const mapStateToProps =(state) =>({
  auth: state.auth,
  errors: state.error,
  });
  
export default connect(mapStateToProps, {})( PostForm);


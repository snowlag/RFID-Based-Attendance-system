import React, {  } from "react";
import { connect } from "react-redux";
import Toolbar from './toolbar';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Form from './form'
import DevicleList from "./devicelist"


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const PostForm = () => {
  const classes = useStyles();
  

  return (
    <Page
      className={classes.root}
      title="Subjects"
    >
      <Container maxWidth="lg">
      <Toolbar />
      <br></br>
       <Form />
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


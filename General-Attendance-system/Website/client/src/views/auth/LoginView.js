import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { connect } from "react-redux";
import {loginUser} from "../../actions/authAction"
import propTypes from "prop-types";




import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

// backgroundImage: "url(" + "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" + ")",
// backgroundPosition: 'center',
// backgroundSize: 'cover',
// backgroundRepeat: 'no-repeat' ,
// height: "100%"


const LoginView = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [disableButton , setDisableButton] = React.useState(false);
  const [error , setError] = React.useState({})
  
useEffect( () => {
  setError(props.errors)
  setDisableButton(false)
}, [props.errors])



  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            validationSchema={
              Yup.object().shape({
                username: Yup.string().max(255).required('Username is required'),              
                password: Yup.string().max(255).required('password is required').min(8 , 'Password must be more than 8 characters'),
              })
            }
            onSubmit={(values) => {
              setDisableButton(true)
              console.log(values);
              props.loginUser(values , navigate)
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Welcome to snowlag web technologies
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name='username'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={disableButton}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                   Sign in
                  </Button>
                </Box>
                {error.message && (
                    <Typography color="error" variant="subtitle2" gutterBottom>
                     {error.message}
                    </Typography>
                )} 
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  If you are facing the problem with sigin ,  contact other admin
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};
LoginView.propTypes ={
  loginUser : propTypes.func.isRequired
};
const mapStateToProps =(state) =>({
auth: state.auth,
errors: state.error
});

export default connect(mapStateToProps, {loginUser})( LoginView);


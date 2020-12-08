import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { connect } from "react-redux";
import {registerAdmin} from "../../actions/authAction"
import propTypes from "prop-types";


import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
//React state
const [Errors , setError] = React.useState({})
const [disableButton , setDisableButton] = React.useState(false)

useEffect( () => {
  setError(props.errors)
  setDisableButton(false)
}, [props.errors])

  
  return (
    <Page
      className={classes.root}
      title="Register"
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
              email: '',
              username: '',
              password: '',             
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                username: Yup.string().max(255).required('Username is required'),              
                password: Yup.string().max(255).required('password is required').min(8 , 'Password must be more than 8 characters'),
              })
            }

            onSubmit={(values) => {
              console.log(values);
              setDisableButton(true)
              props.registerAdmin(values , navigate)
              
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new admin account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    This users wil have access to all attendace logs
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
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
                    Create Admin
                  </Button>
                  {Errors.message && (
                    <Typography color="error" variant="subtitle2" gutterBottom>
                     {Errors.message}
                    </Typography>
                )} 
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};
RegisterView.propTypes ={
  registerAdmin: propTypes.func.isRequired
};
const mapStateToProps =(state) =>({
auth: state.auth,
errors: state.error

});

export default connect(mapStateToProps, {registerAdmin})( RegisterView);


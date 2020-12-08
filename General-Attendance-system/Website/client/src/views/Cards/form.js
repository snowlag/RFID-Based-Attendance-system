import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { AddNewDevice} from 'src/actions/general'
import LinearProgress from '@material-ui/core/LinearProgress';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles} from '@material-ui/core';



const useStyles = makeStyles(() => ({
  root: {},
  AddButton: {
    marginTop: "15px",
    marginLeft: "10px"
  }
}));

const AddNewDeviceForm = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [values, setValues] = useState({});
  const [error , setErrors] = useState({})
  const [disable , setdisable] = React.useState(false);
  const [loader , setLoader] = React.useState(null)
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


//Form validation
const ValidateForm = () => {
   var allow = true
  const {title , department , hours } = values;
  if(typeof(title) === "undefined"){   
    allow = false;
  }
  if(typeof(department) === "undefined"){ 
    allow = false;
  }
  if(typeof(hours) === "undefined"){   
    allow = false;
  }
  return allow
}




  useEffect( () => {
   
    }, [props.auth])
  
    useEffect( () => {
      if(props.errors && props.errors.message){
        console.log("Triggered")
        setErrors(props.errors)
        setdisable(false)
        setLoader(null)

      }
      }, [props.errors])
    








const onSubmit = (event) => {
  event.preventDefault()
  var valid = ValidateForm();
  if(valid){
   setdisable(true)
   setLoader(<LinearProgress />)
   var items = values;
   props.AddNewDevice(items , navigate );
  }else{
    alert("Please fill all the fields")
    
  }
}


  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit = {onSubmit}
      className={clsx(classes.root)}
    >
      <Card>
        <CardHeader
          subheader = "New Device is the new rfid card reader to be assigned to your department"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
             <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Device Name"
                multiline
                error = {Boolean(error.title)}
                helperText= {error.title}
                name="title"
                onChange={handleChange}
                value={values.title}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Department name"
                multiline
                error = {Boolean(error.department)}
                helperText= {error.department}
                name="department"
                onChange={handleChange}
                value={values.department}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Working hour of employee"
                type="number"
                error = {Boolean(error.hours)}
                helperText= {error.hours}
                name="hours"
                onChange={handleChange}
                value={values.hours}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
            >          
          <Button
            color="primary"
            className={classes.AddButton}
            variant="contained"
            type="submit"
            disabled={disable}
          >
            ADD
          </Button>
            </Grid>        
            {loader}
          </Grid>
        </CardContent>
 
        
      </Card>
    </form>
  );
};
 
AddNewDeviceForm.propTypes = {
  className: PropTypes.string
};

const mapStateToProps =(state) =>({
  auth: state.auth,
  errors: state.error,
  categories: state.categories,
  userinfo: state.userinfo
  });
  
export default connect(mapStateToProps, {AddNewDevice})( AddNewDeviceForm);
  

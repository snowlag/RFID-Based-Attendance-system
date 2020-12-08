import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { AddNewUser} from 'src/actions/general'
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios'
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


  const {device , refreshfunc } = props
  const [values, setValues] = useState({
    "hours": device.hours,
    "title": device.title,
    "id": device.id
  });
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
   console.log(values)
  const {title , hours  } = values;
  if(typeof(title) === "undefined"){   
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
   var device = values;
   axios
   .put("/api/update/device" , {device})
   .then(res =>{
        
        refreshfunc();
   })
   .catch( err => {
    alert("Error updating item")
   }
);
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
          subheader = {"Device Configuration"}
          />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
                <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Device id"
                name="cardid"
                value={device.id}
                variant="outlined"
              />
            </Grid>
             <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Department"        
                name="department"
                value={device.department}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Device name"
                multiline
                error = {Boolean(error.title)}
                helperText= {error.title}
                defaultValue={device.title}
                name="title"
                onChange={handleChange}
                value={values.title}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Working Hours"
                type="number"
                error = {Boolean(error.hours)}
                helperText= {error.hours}
                name="hours"
                defaultValue={device.hours}
                onChange={handleChange}
                value={values.hours}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >          
          <Button
            color="primary"
            className={classes.AddButton}
            variant="contained"
            type="submit"
            disabled={disable}
            fullWidth={true}
          >
            Update
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
  
export default connect(mapStateToProps, { AddNewUser})( AddNewDeviceForm);
  

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { AddNewUser} from 'src/actions/general'
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


  const {card } = props
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
  const {name , phone , email , rollno  } = values;
  if(typeof(name) === "undefined"){   
    allow = false;
  }
  if(typeof(phone) === "undefined"){ 
    allow = false;
  }
  if(typeof(email) === "undefined"){   
    allow = false;
  }
  if(typeof(rollno) === "undefined"){   
    allow = false;
  }
  return allow
}



    
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
   items.cardid = card.id
   console.log(items)
   props.AddNewUser(items , navigate );
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
          subheader = {"Register user to this card"}
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
                label="Card id"
                name="cardid"
                value={card.id}
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
                label="Name of the user"
                multiline
                error = {Boolean(error.name)}
                helperText= {error.name}
                name="name"
                onChange={handleChange}
                value={values.name}
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
                label="Email"
                multiline
                error = {Boolean(error.email)}
                helperText= {error.email}
                name="email"
                onChange={handleChange}
                value={values.email}
                variant="outlined"
                type="email"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Roll No"
                error = {Boolean(error.rollno)}
                helperText= {error.rollno}
                name="rollno"
                onChange={handleChange}
                value={values.rollno}
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone number"
                type="number"
                error = {Boolean(error.phone)}
                helperText= {error.phone}
                name="phone"
                onChange={handleChange}
                value={values.phone}
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
  
export default connect(mapStateToProps, { AddNewUser})( AddNewDeviceForm);
  

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { AddNewUser, GetAllSubjectList } from 'src/actions/general'
import LinearProgress from '@material-ui/core/LinearProgress';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(() => ({
  root: {},
  AddButton: {
    marginTop: "15px",
    marginLeft: "10px"
  }
}));

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const AddNewDeviceForm = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();


  const { className, Devices,  AddLecture, ...rest } = props
  const [values, setValues] = useState({});
  const [error, setErrors] = useState({})
  const [disable, setdisable] = React.useState(false);
  const [loader, setLoader] = React.useState(null);
  const [Subject , setSelectedSubject] = React.useState({});
  const [Day , setSelectedDay] = React.useState(null)

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


  //Form validation
  const ValidateForm = () => {
    var allow = true
    const { start_time_string , end_time_string } = values;
    if (typeof (start_time_string) === "undefined") {
      return false;
    }
    if (typeof (end_time_string) === "undefined") {
      return  false;
    }
    if (typeof (Day) === "undefined") {
      return false;
    }
    var start = Number(start_time_string.replace(":", ""));
    var end = Number(end_time_string.replace(":", ""));
    if(start> end){
      return false;
    }

    return true
  }


const onSubjectChange = (event) => {
   console.log(event.target.value)
  // setSelectedSubject(event.target.value);
  if(Devices){
    var SubjectObj = Devices.find(o => o.id === event.target.value);
    console.log(SubjectObj)
    setSelectedSubject(SubjectObj);
  }
}

const onDayChange = (event => {
  console.log(event.target.value);
  setSelectedDay(event.target.value)
})





  useEffect(() => {
    if (props.errors && props.errors.message) {
      console.log("Triggered")
      setErrors(props.errors)
      setdisable(false)
      setLoader(null)

    }
  }, [props.errors])









  const onSubmit = (event) => {  
    event.preventDefault()
    var valid = ValidateForm();
    
    if (valid) {   
      setLoader(<LinearProgress />)
      var items = values;
      items.subject = Subject;
      items.day = Day
      console.log(items)
      AddLecture(items)
      setValues({})
      setSelectedDay(null)
    } else {
      alert("Incomplete fields or invalid configuration of lecture")

    }
  }


  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={onSubmit}
      className={clsx(classes.root)}
    >
      <Card>
        <CardHeader
          subheader={"Lecture will be recurring at each selected day"}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={6}
            >
              {Devices && Devices.length > 0 &&
                <TextField
                  fullWidth
                  name="subject"
                  label="Select Subject"
                  select
                  variant="outlined"
                  onChange={onSubjectChange}

                >
                  {Devices && Devices.map((option) => (
                    < MenuItem
                      key={option.id}
                      value={option.id}
                    >
                      {option.title}
                    </ MenuItem>
                  ))}
                </TextField>
              }
            </Grid>
            <Grid
              item
              md={6}
              xs={6}
            >
          
                <TextField
                  fullWidth
                  name="subject"
                  label="Select Day"
                  select
                  variant="outlined"
                  onChange={onDayChange}
                  value={Day}

                >
                  {days && days.map((option) => (
                    < MenuItem
                      key={option}
                      value={option}
                    >
                      {option}
                    </ MenuItem>
                  ))}
                </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={6}
            >
              <TextField
                fullWidth
                name="start_time_string"
                value={values.start_time_string}
                onChange={handleChange}
                type="time"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={6}
            >
               <TextField
                fullWidth
             
                error={Boolean(error.name)}
                helperText={error.name}
                name="end_time_string"
                value={values.end_time_string}
                onChange={handleChange}
                type="time"
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.error,
  categories: state.categories,
  userinfo: state.userinfo,
  allsubjectlist: state.allsubjectlist
});

export default connect(mapStateToProps, { AddNewUser, GetAllSubjectList })(AddNewDeviceForm);


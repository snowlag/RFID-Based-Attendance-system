import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { GetDefaulterList, GetAllSubjectList } from 'src/actions/general'
import LinearProgress from '@material-ui/core/LinearProgress';
import { CSVLink } from "react-csv";

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    makeStyles,
    MenuItem
} from '@material-ui/core';



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
    const [error, setErrors] = useState({})
    const [disable, setdisable] = React.useState(false);
    const [loader, setLoader] = React.useState(null);
    const [Subjects, setSubjects] = React.useState([]);
    const [selectedSubject, setSelectedSubject] = React.useState('')
    const [isDataFetched , setIsDataFetched] = React.useState(false)
    const [DefaulterList , setDefaulterList] = React.useState([])
    const [flag , setFlag] = React.useState(false)
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };


    //Form validation
    const ValidateForm = () => {
        var allow = true
        const { limit } = values;
        if (typeof (limit) === "undefined") {
            allow = false;
        }
        if (typeof (selectedSubject) === "undefined" || selectedSubject === "") {
            allow = false;
        }
        return allow
    }


    useEffect(() => {
        props.GetAllSubjectList();
    }, [props.auth])

    useEffect(() => {
        if (props.list && props.list.data && props.list.data.length > 0) {
            setSubjects(props.list.data)
            setSelectedSubject(props.list.data[0].title)
        }

    }, [props.list])


    useEffect(() => {
        if (flag && props.defaulters.length> 0) {
           setIsDataFetched(true);
           
        }
        setdisable(false)
    }, [props.defaulters])



    useEffect(() => {
        if (props.errors && props.errors.message) {
            console.log("Triggered")
            setErrors(props.errors)
            setdisable(false)
            setLoader(null)

        }
    }, [props.errors])


const onSubjectChange = (event) => {
    setSelectedSubject(event.target.value)
}


    const onSubmit = (event) => {
        event.preventDefault()
        setIsDataFetched(false)
        var valid = ValidateForm();
        if (valid) {
            setdisable(true)
            setLoader(<LinearProgress />)
            var items = values;
            items.subjectname = selectedSubject
            console.log(items)
            props.GetDefaulterList(items);
            setFlag(true)
        } else {
            alert("Please fill all the fields")

        }
    }

    let ExportButton 
    if(isDataFetched){
    ExportButton =   <Button
    style={{backgroundColor: "#3cc83c"}}
    className={classes.AddButton}
    variant="contained"
    
>
    <CSVLink
    data={props.defaulters}
    filename={`defaulter_list_${selectedSubject}_${values.limit}.csv`}
    style={{color: "white"}}
    target="_blank"
  >
    {`defaulter_list_${selectedSubject}_${values.limit}.csv`}
  </CSVLink>
  </Button>;
    }else{
        ExportButton = null
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
                    subheader="Export Defaulters"
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid
                            item
                            md={3}
                            xs={12}
                        >
                            {Subjects && Subjects.length > 0 &&
                                <TextField
                                    fullWidth
                                    name="subject"
                                    label="Select Subject"
                                    select
                                    variant="outlined"
                                    onChange={onSubjectChange}

                                >
                                    {Subjects && Subjects.map((option) => (
                                        < MenuItem
                                            key={option.title}
                                            value={option.title}
                                        >
                                            {option.title}
                                        </ MenuItem>
                                    ))}
                                </TextField>
                            }
                        </Grid>
                        <Grid
                            item
                            md={2}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Minimum Lectures"
                                type="number"
                                name="limit"
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={2}
                            xs={12}
                        >
                            <Button
                                color="primary"
                                className={classes.AddButton}
                                variant="contained"
                                type="submit"
                                disabled={disable}
                            >
                                Fetch
                         </Button>
                        </Grid>
                        <Grid
                            item
                            md={5}
                            xs={12}
                        >
                         {ExportButton}
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
    list: state.allsubjectlist,
    defaulters: state.defaulterlist.data
});

export default connect(mapStateToProps, { GetDefaulterList, GetAllSubjectList })(AddNewDeviceForm);


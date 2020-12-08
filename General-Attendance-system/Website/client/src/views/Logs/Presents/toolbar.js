import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Select from '@material-ui/core/Select';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    makeStyles,
    Grid
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import MenuItem from '@material-ui/core/MenuItem';
import { CSVLink, CSVDownload } from "react-csv";


const useStyles = makeStyles((theme) => ({
    root: {},
    importButton: {
        marginRight: theme.spacing(1)
    },
    exportButton: {
        marginTop: "10px"
    }
}));



const Toolbar = (props) => {
    const classes = useStyles();
    const { className, Devices, SelectedDepartment, HandleDepartmentChange , Data , ...rest } = props
    const navigate = useNavigate();
    return (
        <div
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Box mt={3}>
                <Card>
                    <CardContent>
                        <Box maxWidth={800}>
                            <Grid container
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={6}>
                                    {Devices && Devices.length> 0 &&
                                    <TextField
                                        fullWidth
                                        name="department"
                                        label="Select Department"
                                        select
                                        value={SelectedDepartment}
                                        variant="outlined"
                                        onChange={HandleDepartmentChange}

                                    >
                                        {Devices && Devices.map((option) => (
                                            < MenuItem
                                                key={option.id}
                                                value={option.id}
                                            >
                                                {option.department}
                                            </ MenuItem>
                                        ))}
                                    </TextField>
}
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                 <Button className = {classes.exportButton}  color="secondary" variant="outlined" ><CSVLink filename={`todays_attendace.csv`} style={{color: "inherit"}} data={Data}>Export</CSVLink></Button>
                                </Grid>
                            </Grid>

                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
};

Toolbar.propTypes = {
    className: PropTypes.string
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.error,
    categories: state.categories,
    userinfo: state.userinfo
});

export default connect(mapStateToProps, {})(Toolbar);


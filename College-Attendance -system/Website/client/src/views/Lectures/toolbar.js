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

const useStyles = makeStyles((theme) => ({
    root: {},
    importButton: {
        marginRight: theme.spacing(1)
    },
    exportButton: {
        marginRight: theme.spacing(1)
    }
}));



const Toolbar = (props) => {
    const classes = useStyles();
    const { className, Days, SelectedDay, HandleDayChange , ...rest } = props
    const navigate = useNavigate();

    return (
        <div
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Box mt={3}>
                <Card>
                    <CardContent>
                        <Box maxWidth={500}>
                            <Grid container
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        fullWidth
                                        name="day"
                                        label="Select Day"
                                        select
                                        value={SelectedDay}
                                        variant="outlined"
                                        onChange={HandleDayChange}

                                    >
                                        {Days && Days.map((option) => (
                                            < MenuItem
                                                key={option}
                                                value={option}
                                            >
                                                {option}
                                            </ MenuItem>
                                        ))}
                                    </TextField>

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
    userinfo: state.userinfo,
});

export default connect(mapStateToProps, {})(Toolbar);


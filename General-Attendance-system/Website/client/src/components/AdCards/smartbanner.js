import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardMedia from '@material-ui/core/CardMedia';

import Grid from '@material-ui/core/Grid';
import {
  Button,
  Paper
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    maxWidth: 320,
    height: "100%",
  },
  
  cover: {
    textAlign: "center",
    width: "320px",
    height: "50px",
    justifyContent: "center",
    display: "flex",
    margin: "auto",
  },
  

}));


const  MediaControlCard = (props) =>  {
const {data } = props
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className = {classes.initailview}>
        <Card className={classes.root}>
        <CardMedia
        className={classes.cover}
        image={data.banner}
        title="Post"
        /> 
         </Card>   
    </div>
  );
}
export default MediaControlCard
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DateConverter from "src/dateconverter/dateconverter"
import TouchAppIcon from '@material-ui/icons/TouchApp';
import keys from 'src/keys';

import Tooltip from "@material-ui/core/Tooltip";
import {
  Button,
  Divider,
  Avatar
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    maxWidth: "340px",
    maxHeight: "80px"
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    padding: "0px",
    paddingTop: "10px",

  },
  cover: {
    textAlign: "center",
    width: "80px",
    height: "80px",
    justifyContent: "center",
    display: "flex",
    margin: "auto"
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  footerButton: {
      marginTop: '20px',
  },
  titlw:{
    display: "flex"
  },
  LinkButton: {
    margin: "40% auto", 
    backgroundColor: "green"
  },
  adtitle: {
    fontSize: "11px"
  },
  cardscomponents: {
    padding: "2px"
  },
  ButtonText: {
    fontSize: "10px"
  }
  

}));



const  MediaControlCard = (props) =>  {
const {data } = props
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div>
    
    <Card className={classes.root}>
    <Grid container spacing={1}>
        <Grid item xs={4} xm={4} sm={4} md={3}>
              <CardMedia
              className={classes.cover}
              image={data.thumbnail}
              title="thumbnail"

            /> 
      </Grid>
      <Grid item xm={5} sm={5} md={6}>
             <CardContent className={classes.content}>
             <Grid  container spacing={1}>
             <Grid item xs={12} sm={12} md={12}>    
                  <div >
                  <Typography className={classes.adtitle} >
                        {data.title}
                    </Typography>    
                    <Typography  className={classes.adtitle}  color="textSecondary">
                         {data.subtitle}
                   </Typography>   
                   <Typography  className={classes.adtitle}  color="textPrimary">
                       {data.uploader}
                    </Typography>    
                  </div>
             </Grid>
             </Grid>            
             </CardContent>
        </Grid>
    <Grid item xs={2} sm={2} md={3}>                
       <Button
       color="primary"
       variant="contained"   
       className= {classes.LinkButton}
       onClick= {(event => window.open(data.link, "_blank"))}  
       size = "small"
     >
       <span className={classes.ButtonText}>
       {data.button_text}
       </span>  
     </Button>
    </Grid>
    </Grid>
    </Card>
    </div>
  );
}
export default MediaControlCard
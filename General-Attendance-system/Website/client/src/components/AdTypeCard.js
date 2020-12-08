import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { NavLink } from "react-router-dom";
import { Dialog } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  banner: {
    width: "320px",
    height: "50px"
  },
  nativesmallad: {
    width: "320px",
    height: "80px"
  },
  nativemediumad: {
    width: "320px",
    height: "320px"
  }
});

export default function ImgMediaCard(props) {
 const {type , image , desc , path} = props
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <Card className={classes.root}>
    <NavLink style={{ textDecoration: "none" }} to={path ? path : ""}>
      <CardActionArea>
        <CardContent>
          <Typography color="textPrimary"  gutterBottom variant="h5" component="h2">
            {type ? type : ""}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
                {desc ? desc : ""}
          </Typography>
        </CardContent>
      </CardActionArea>
      </NavLink>
      <CardActions>
        <Button size="small" color="primary"  onClick={handleClick}>
          Preview
        </Button>
      </CardActions>
      <Dialog
        id={id}
        open={open}
        onClose={handleClose}    
      >
        <img  src={image ? image : null} alt ="No Preview available" />
      </Dialog>
    </Card>
  );
}
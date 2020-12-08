import React, { useState, useEffect ,forwardRef } from "react";
import MaterialTable from "material-table";
// react plugin for creating charts
// @material-ui/core
import { makeStyles , withStyles } from "@material-ui/core/styles";
import { TablePagination } from '@material-ui/core';
// core components
import propTypes from "prop-types";
import { connect } from "react-redux";
import { GetCardList } from "../../actions/general";

import axios from 'axios'
import { CircularProgress } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Button from '@material-ui/core/Button';
//Material table icons
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import Search from '@material-ui/icons/Search';
import AddBox from '@material-ui/icons/AddBox';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Edit from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from "@material-ui/core/Tooltip";
import Form from "./adduserform";
import { SettingsRemoteRounded } from "@material-ui/icons";
import DateConverter from "src/dateconverter/dateconverter";
const styles = {
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    },
    header: {
        minHeight: "150px",
        width: "100%",
        padding: "10px",
        marginBottom: "30px"
    },
    headertitle: {
        marginLeft: "10px"
    },
    table: {
        marginTop: "20px"
    },
    formControl: {
        minWidth: 120,
        marginBottom: "20px"
      },
      searchButton: {
        marginTop: "10px"
      }
  };


  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'black',
      boxShadow: theme.shadows[1],
      fontSize: 13,
    },
  }))(Tooltip);


const useStyles = makeStyles(styles);

const  ArchiveUsertable = (props) =>{


//Material ui Table for words
const classes = useStyles();
//States for User list Tables 
const  [arr , setArr] = React.useState([]);
const [index , setIndex] = React.useState(-1);
const [disabled , setNext ] = React.useState(true)
const [prevItems , setPrev] = React.useState([])
const [flag , setFlag] = React.useState(false)
const [data , setData] = React.useState([]);
const [page , setPage] = React.useState(-1);
const [loader , setLoader] = React.useState(null)
const [open, setOpen] = React.useState(false);
const [carddata , setCardData] = React.useState(null)
const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};


const [state, setState] = React.useState({
    columns: [
      { title: "Card Uid", field: "id" },
      { title: "Department", field: "department" }, 
      { title: "Registaration Date", field: "timestamp"},
      
    ]
  });

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />), 
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
   
  };

 useEffect( () => {
    var items = {}
    props.GetCardList(items)
     setLoader(
      <CircularProgress color="secondary" />
    )
    setFlag(true)
}, [props.auth])  
 

const deleteItem = (event , item) => {
  axios
  .post("/api/delete/item" , {item})
   .then(res => {
    reset();
    var items = {}
    props.GetCardList(items)
   })
   .catch(err => {
    alert("Error deleting item")
   })
}



//Function to listen to new paginated data 
useEffect( () => {
    if(flag){
     //Push the next key in array
   setIndex(index+1)
   setArr([ ...arr , props.cardlist.Key])
   prevItems.push.apply(prevItems, props.cardlist.Data);
   prevItems.map(data => {
    var obj = DateConverter(data.timestamp)
    data.timestamp = obj.datetime
  })
  setLoader(null)
  setData(prevItems);
    }
   }, [props.cardlist])  
  

const handleOpen = (event ,data) => {
  console.log(data)
  setCardData(data);
  setOpen(true)
}



 // Load more Button to store previous state data and query for next paginated data
  const loadmore = (page) =>{
     console.log(`page = ${page}`)
     console.log(`index = ${index}`);
     if(page > index && arr[index]){
      setLoader(
        <CircularProgress color="secondary" />
      )
      var lastIndexKey = arr[index];
      setPrev(data);
  // Pass evaluated key and state contained dates
      props.GetCardList(lastIndexKey) 
     }
    }
  
  
// Logic to disable load more button when no key is recieved
useEffect( () => {
  if(props.cardlist.Key){
    setNext(false)
  }else{
    setNext(true)
  }
   
 } ,[props.cardlist.Key])


//Reset to clear states when new search is made
  const reset =() => {
      setData([])
      //Reset the array
      setArr([]);
      //reset the previous date
      setPrev([]);
      setIndex(-1);
      

  }
//Archive switch on user


  return (
    <div>
       {loader} 
      <MaterialTable
         title=""
         className={classes.table}
         columns={state.columns}
         data={data.map(x => Object.assign({}, x))}
         options={{
          pageSize: 10,
          search: false
        }}
      icons={tableIcons}
      onChangePage={(page) => {
          console.log(page);
          setPage(page)
          loadmore(page);
        }}
        actions={[
          {
            icon: () =>   <LightTooltip title="Delete Card"><DeleteOutline /></LightTooltip>,
            onClick: deleteItem
          },
          
          {
              icon: () =>  <LightTooltip title="Add User"><AddBox /></LightTooltip>,
              onClick: handleOpen
          },

    ]}
        components={{
         Pagination: props => (
                       <TablePagination
                       {...props}
                       rowsPerPage= {10}
                       rowsPerPageOptions={[10]}
                       
                   
                />
              ),
                    }}
      
    />
    {loader} 
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register User</DialogTitle>
        <DialogContent>
              <Form  card = {carddata}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
ArchiveUsertable.propTypes ={
    GetCardList: propTypes.func.isRequired
};
const mapStateToProps =(state) =>({
  auth: state.auth,
  errors: state.errors,
  cardlist: state.cardlist
});

export default connect(mapStateToProps, {GetCardList})(ArchiveUsertable);
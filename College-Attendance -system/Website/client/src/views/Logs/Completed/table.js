import React, { useEffect ,forwardRef } from "react";
import MaterialTable from "material-table";
// react plugin for creating charts
// @material-ui/core
import { makeStyles , withStyles } from "@material-ui/core/styles";
import { TablePagination } from '@material-ui/core';
// core components
import { connect } from "react-redux";
import {  GetAllSubjectList , GetTimeOutLogs} from "../../../actions/general";

import axios from 'axios'
import { CircularProgress } from '@material-ui/core';
//Material table icons
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';
import AddBox from '@material-ui/icons/AddBox';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Edit from '@material-ui/icons/Edit';
import Tooltip from "@material-ui/core/Tooltip";
import Toolbar from "./toolbar";
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
const [ , setNext ] = React.useState(true)
const [prevItems , setPrev] = React.useState([])
const [flag , setFlag] = React.useState(false)
const [data , setData] = React.useState([]);
const [ , setPage] = React.useState(-1);
const [loader , setLoader] = React.useState(null)
const [, setOpen] = React.useState(false);
const [] = React.useState(null)


const [Devices , setDevices] = React.useState([])
const [SelectedDepartment , setSelectedDepartment] = React.useState(null)

const [SelectedDate , setSelectedDate] = React.useState(new Date().getTime())

const [flag2 , setFlag2] = React.useState(false)
const [state] = React.useState({
  columns: [
   { title: "Username", field: "name" },
   { title: "Roll no", field: "rollno" },
   { title: "Lecture start time", field: "lecture_start_time"}, 
    { title: "Time In", field: "timein"},
    { title: "Lecture end time", field: "lecture_end_time"},
    { title: "status", field: "status"},
    { title: "Date", field: "timestamp"}
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
    props.GetAllSubjectList()
     setLoader(
      <CircularProgress color="secondary" />
    )
    setFlag2(true)
    
}, [props.auth])  
 
useEffect( () => {
    if( flag2 && props.list && props.list.data && props.list.data.length > 0){
        console.log(props.list.data)
        setDevices(props.list.data)
        setSelectedDepartment(props.list.data[0].id)
        props.GetTimeOutLogs(props.list.data[0].id , new Date().getTime() , {}) 
        setFlag(true)
    }   
  
}, [props.list])  



const deleteItem = (event , item) => {
  axios
  .post("/api/delete/item" , {item})
   .then(() => {
    reset();
    props.GetTimeOutLogs(SelectedDepartment , new Date(SelectedDate).getTime() , {}) 
   })
   .catch(() => {
    alert("Error deleting item")
   })
}



//Function to listen to new paginated data 
useEffect( () => {
    if(flag){
     //Push the next key in array
   setIndex(index+1)
   setArr([ ...arr , props.completedlogs.Key])
   prevItems.push.apply(prevItems, props.completedlogs.Data);
   prevItems.map(data => {  
    var obj2 = DateConverter( data.timestamp)
    data.timestamp = obj2.date   
  })
  setLoader(null)
  setData(prevItems);

    }
   }, [props.completedlogs])  
  

const HandleDateChange = (event) => {
  console.log(event.target.value)
  setSelectedDate(event.target.value)
  reset();
  props.GetTimeOutLogs( SelectedDepartment , new Date(event.target.value).getTime() , {}) 
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
      props.GetTimeOutLogs( SelectedDepartment ,lastIndexKey) 
     }
    }
  
  
// Logic to disable load more button when no key is recieved
useEffect( () => {
  if(props.completedlogs.Key){
    setNext(false)
  }else{
    setNext(true)
  }
   
 } ,[props.completedlogs.Key])


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

const HandleDepartmentChange = (event) => {
    console.log("Triggered")
    setSelectedDepartment(event.target.value)
    console.log(event.target.value)
    reset();
    props.GetTimeOutLogs( event.target.value , new Date(SelectedDate).getTime() , {}) 
}


  return (
    <div>
          <Toolbar Devices = {Devices} SelectedDepartment = {SelectedDepartment} Data={data} HandleDepartmentChange = {HandleDepartmentChange} SelectedDate = {SelectedDate} HandleDateChange = {HandleDateChange} />
        <br></br>
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
    </div>
  );
}

const mapStateToProps =(state) =>({
  auth: state.auth,
  errors: state.errors,
  completedlogs: state.completedlogs,
  list: state.allsubjectlist
});

export default connect(mapStateToProps, { GetAllSubjectList , GetTimeOutLogs})(ArchiveUsertable);
import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState, useEffect } from "react";
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import   routes from 'src/Routes/routes';


import { connect } from "react-redux";

const App = (props) => {
const routing = useRoutes(routes);


  return (

    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};
const mapStateToProps =(state) =>({
  auth: state.auth,
  errors: state.error
  
  });
  
export default connect(mapStateToProps, {})(App);
  
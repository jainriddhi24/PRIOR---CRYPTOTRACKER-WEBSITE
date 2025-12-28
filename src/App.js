import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {  makeStyles } from "@material-ui/core";
import './App.css';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import Coinpage from './Pages/Coinpage';
import Alert from "./components/Alert";


 const useStyles = makeStyles(() => ({
   App: {
     backgroundColor: "#ffffff",
     color: "black",
     minHeight: "100vh",
   },
 }));


function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage/>} />  
          <Route path="/coins/:id" element={<Coinpage/>} />
          <Route path="*" element={<h1>404 Page not</h1> }/>
          
        </Routes>
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;

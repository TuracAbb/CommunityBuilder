import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import CommunityList from "./components/community-list.component";
import EditCommunity from "./components/edit-community.component";
import CreateCommunity from "./components/create-community.component";
import CreateUser from "./components/create-user.component";
import CommunityPage from "./components/community-page.component.js";


function App() {
  return (
    <Router>
      <div className = "container">  
      <Navbar />
      <br/>
       <Route path = "/" exact component = {CommunityList}/>
       <Route path = "/edit/:id" exact component = {EditCommunity}/>
       <Route path = "/create" exact component = {CreateCommunity}/>
       <Route path = "/user" exact component = {CreateUser}/>
       <Route path = "/community" exact component = {CommunityPage}/>

       </div> 
     </Router>
  );
}

export default App;

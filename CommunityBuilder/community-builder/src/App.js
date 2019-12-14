import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import CommunityList from "./components/community-list.component";
import EditCommunity from "./components/edit-community.component";
import CreateCommunity from "./components/create-community.component";
import CreateUser from "./components/create-user.component";
import CommunityPage from "./components/community-page.component.js";
import Login from "./components/login.component.js";
import Register from "./components/register.component.js";
import Profile from "./components/profile.component";
import Datatype from "./components/datatype-create.component";
import PostForm from "./components/post-form.component";



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
       <Route path = "/community-page" exact component = {CommunityPage}/>
       <Route path = "/login" exact component = {Login}/>
       <Route path = "/register" exact component = {Register}/>
       <Route path = "/profile" exact component = {Profile}/>
       <Route path = "/datatype" exact component = {Datatype}/>
       <Route path = "/postForm" exact component = {PostForm}/>


       </div> 
     </Router>
  );
}

export default App;

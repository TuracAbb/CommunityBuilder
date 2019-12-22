import React, { Component } from 'react';
import { throws } from 'assert';
import Navbar from '../components/navbar.component'
import { MDBCol, MDBFormInline, MDBBtn } from "mdbreact";


export default class EntryPage  extends React.Component {
    constructor(props) {
        super(props);
       
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    

    }

    handleLogin(){
        this.props.history.push({
            pathname: '/login'
          })
    }
    handleRegister(){
        this.props.history.push({
            pathname: '/register'
          })
    }

  render() {
    return (
      <div>
        <div>
          <MDBBtn gradient="aqua"  rounded size="lg" type="submit" className="mr-auto" onClick ={this.handleLogin}> Login </MDBBtn>        
        </div>
        <div>
          <MDBBtn gradient="aqua" rounded size="lg" type="submit" className="mr-auto" onClick ={this.handleRegister}> Register </MDBBtn>
        </div> 
      </div>
    );
  }
}
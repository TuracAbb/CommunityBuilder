import React, { Component } from 'react';
import { throws } from 'assert';
import Navbar from '../components/navbar.component'

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
          
            <button type="submit" className="btn btn-lg btn-primary btn-block" onClick ={this.handleLogin} >
                Login
            </button> 
            <button type="submit" className="btn btn-lg btn-primary btn-block" onClick ={this.handleRegister}>
                Register
            </button>       
        </div>
    );
  }
}
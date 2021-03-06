import React, { Component } from 'react';
import {register} from './user-functions.component'

export default class CreateUser  extends React.Component {
    constructor() {
        super()
        this.state = {
          username: '',
          password: '',
          surname:'',
          name:'',
          email:'',
          errors: {}
        }
    
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
      }

     
    onChange  = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit= (e) =>  {
        e.preventDefault()
        debugger;
        const user = {
            surname: this.state.surname,
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
    
        register(user).then(res => {
            debugger;
          if (res.error == '') {
            console.log('RES' + res)
            this.props.history.push('/login')
          }
          else{
            this.props.history.push('/register')

          }
        })
        .catch(
            console.log('ERR HAPPND ')
        )
      }
    

  render() {
    return (
        <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <input
                  type="surname"
                  className="form-control"
                  name="surname"
                  placeholder="Surname"
                  value={this.state.surname}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="name"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="username"
                  className="form-control"
                  name="username"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
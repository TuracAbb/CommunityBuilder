import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'


class Profile extends Component {
    constructor() {
      super()
      this.state = {
        name: '',
        surname: '',
        username:'',
        email: '',
        errors: {}
      }
    }
    componentDidMount() {        
        if(localStorage.getItem('usertoken') != undefined){
            console.log('Token : ' + localStorage.getItem('usertoken'))
            const token = localStorage.getItem('usertoken')
            const decoded = jwt_decode(token)
            console.log('D' + decoded.name + decoded.surname)
            this.setState({
                name: decoded.surname,
                surname: decoded.name,
                username: decoded.username,
                email: decoded.email
            })
        }
      }

      render() {
        return (
          <div className="container">
            <div className="jumbotron mt-5">
              <div className="col-sm-8 mx-auto">
                <h1 className="text-center">PROFILE</h1>
              </div>
              <table className="table col-md-6 mx-auto">
                <tbody>
                  <tr>
                    <td>Fist Name</td>
                    <td>{this.state.name}</td>
                  </tr>
                  <tr>
                    <td>Last Name</td>
                    <td>{this.state.surname}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{this.state.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      }
}

export default Profile

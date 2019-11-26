import axios from 'axios'

export const register = newUser => {
  return axios
    .post('http://localhost:5000/users/register', {
      surname: newUser.surname,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
        debugger;
      console.log('Registered' , response)
      return response.data

    })
    .catch(err => {
        console.log(err)
      })
}

export const login = user => {
    console.log('name pass ' + user.username + user.password)
  return axios
    .post('http://localhost:5000/users/login', {
      username: user.username,
      password: user.password
    })
    .then(response => {
       if(response.data.error !=null){
        console.log('response.data is '+ response.data.data)
        localStorage.setItem('usertoken', response.data.data)
       }
       else{
        localStorage.setItem('usertoken', '')
       }
      
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getProfile = user => {
  return axios
    .get('http://localhost:5000/users/profile', {
      headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return ('res data: ' + response.data.data)
    })
    .catch(err => {
      console.log('ERROR IS' + err)
    })
}
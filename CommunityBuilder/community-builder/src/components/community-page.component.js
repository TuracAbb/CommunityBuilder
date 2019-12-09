import React, { Component } from 'react';
import Datatype from '../components/datatype-create.component';
import { throws } from 'assert';
import axios from 'axios';

export default class CommunityPage  extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      communityID: '',
      communityName: '',
      communityDescription: '',
      communityTags: '',
      displayDatatype : false,
      showDatatypes:false,
      deneme :[]
    };

    this.handleAddDatatype = this.handleAddDatatype.bind(this);
    this.getDatatypes = this.getDatatypes.bind(this);

  }
  componentDidMount() {
    this.getDatatypes();
    var denemeq = []
    for (var key in JSON.parse(localStorage.getItem('datatypes'))) {
    console.log('Here it is :' + JSON.parse(localStorage.getItem('datatypes'))[key]);
    const f = { datatypeField : JSON.parse(localStorage.getItem('datatypes'))[key].datatypeField , datatypeName : JSON.parse(localStorage.getItem('datatypes'))[key].datatypeName}
    denemeq.push(JSON.parse(localStorage.getItem('datatypes'))[key]);
  } 

      console.log(this.props.location);
      this.setState({
        communityID: JSON.parse(localStorage.getItem('data'))._id,
        communityName: JSON.parse(localStorage.getItem('data')).communityName,
        communityDescription:  JSON.parse(localStorage.getItem('data')).communityDescription,
        communityTags: JSON.parse(localStorage.getItem('data')).communityTags,
        deneme:denemeq
      })
  }

  handleAddDatatype(){
    console.log('DT: ' + this.state.communityID);
    console.log('DT: ' + this.state.datatypes);
    this.setState({
      displayDatatype : true
    })
    
  }
  handleShowDatatypes(){
    this.setState({
      showDatatypes : true
    })
    
  }

  getDatatypes = () =>{
    axios.get('http://localhost:5000/community/getDatatypes/' + JSON.parse(localStorage.getItem('data'))._id)
      .then(response => {
        localStorage.setItem('datatypes', JSON.stringify(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

  }

  
  render() {
    return ( 
      <div>
        <button type="submit" className="btn btn-warning" > JOIN </button>

      <div>
        
      </div>
          <p> Community : {this.state.communityName} </p>
          <p> Description : {this.state.communityDescription} </p>
          <p> Tags : {this.state.communityTags} </p>
          <p> Datatypes :  {this.state.deneme.map((item, key)=>
            <li>{item.datatypeName}</li>)} 
            </p>
          <p> Posts : {this.state.communityTags} </p>


          <button type="submit" className="btn btn-warning" onClick={this.handleAddDatatype}>  Add Data Type </button>
          {this.state.displayDatatype && 
          <Datatype location = {this.props.location} idGreet = {this.state.communityID}/>
          }
          <button type="submit" className="btn btn-warning" onClick={this.handleShowDatatypes}> Get Data Types </button>
          

      </div>
    );
  }
}
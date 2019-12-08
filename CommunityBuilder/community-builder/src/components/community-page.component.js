import React, { Component } from 'react';
import Datatype from '../components/datatype-create.component';
import { throws } from 'assert';

export default class CommunityPage  extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      communityID: '',
      communityName: '',
      communityDescription: '',
      communityTags: '',
      displayDatatype : false
    };

    this.handleAddDatatype = this.handleAddDatatype.bind(this);

   
  }
  componentDidMount() {
      console.log(this.props.location);
      this.setState({
        communityID: JSON.parse(localStorage.getItem('data'))._id,
        communityName: JSON.parse(localStorage.getItem('data')).communityName,
        communityDescription:  JSON.parse(localStorage.getItem('data')).communityDescription,
        communityTags: JSON.parse(localStorage.getItem('data')).communityTags,
      })
      
      
  }

  handleAddDatatype(){
    this.setState({
      displayDatatype : true
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

          <button type="submit" className="btn btn-warning" onClick={this.handleAddDatatype}>  Add Data Type </button>
          {this.state.displayDatatype && 
          <Datatype location = {this.props.location} idGreet = {this.state.communityID}/>
          }
      </div>
    );
  }
}
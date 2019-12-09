  
import React, { Component } from 'react';
import axios from 'axios';



export default class CreateCommunity extends Component {
  constructor(props){
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

    //this.onChangeTag = this.onChangeTag.bind(this);

    this.state = {
      communityName: '',
      communityDescription: '',
      communityTag:[],
      dataTypes: [] 
    };
  }
  onChangeName = (e) => {
    this.setState({
      communityName: e.target.value
    })
  };
  onChangeDescription= (e) => {
    this.setState({
      communityDescription: e.target.value
    })
  }; 
  

  
  onSubmit = (e) =>{
    e.preventDefault();

  const newCommunity = {
      communityName : this.state.communityName,
      communityDescription : this.state.communityDescription,
      dataTypes : this.state.dataTypes,
      communityTags : this.state.communityTags
    }
    debugger;
    console.log(newCommunity);
    debugger;
    axios.post('http://localhost:5000/community/createCommunity', newCommunity)
      .then(res => alert("CREATED"));
} 

  render() {
    return (
      <div>
          <h3>Create New Community</h3>
          <form onSubmit = {this.onSubmit} onChange={this.handleAdd}>
            <div className="form-group"> 
              <label>Name of community: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value = {this.state.communityName}
                  onChange = {this.onChangeName}
                  />
            </div>
            <div className="form-group"> 
              <label>Description of community: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value = {this.state.communityDescription}
                  onChange = {this.onChangeDescription}
                  />
            </div> 
            
            <div className="form-group">
              <input type="submit" value="Create Community" className="btn btn-primary" />
            </div>
          </form>
      </div>
    );
  }
}
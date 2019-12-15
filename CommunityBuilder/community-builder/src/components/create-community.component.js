  
import React, { Component } from 'react';
import axios from 'axios';
//import { Dropdown } from 'semantic-ui-react';
import { SelectPopover } from "react-select-popover";

export default class CreateCommunity extends Component {
  constructor(props){
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.listTags = this.listTags.bind(this);

    //this.onChangeTag = this.onChangeTag.bind(this);

    this.state = {
      communityName: '',
      communityDescription: '',
      communityTags:[],
      dataTypes: [],
      showTags:false
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

  listTags(){
    
    const name = this.state.communityName;
    axios.get('https://www.wikidata.org/w/api.php?action=wbsearchentities&limit=500&language=en&format=json&search='+ name + '&origin=*')
    .then(response => {
      var tags = []
      for (var key in response.data.search) {
        const f = { value : response.data.search[key].id , label : response.data.search[key].label}
        tags.push(f)
      }
      this.setState({ communityTags: tags })
      console.log(this.state.communityTags)
    })
    .catch((error) => {
      console.log(error);
    })
    this.setState({
      showTags:true
    })
  }
  

  
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
            <button type="button" onClick={this.listTags} className="small">
                List Tags
                {this.state.showTags && 
                  <SelectPopover 
                  options={this.state.communityTags} 
                   />
                }
           </button>
            </div>
            
            <div className="form-group">
              <input type="submit" value="Create Community" className="btn btn-primary" />
            </div>
          </form>
      </div>
    );
  }
}
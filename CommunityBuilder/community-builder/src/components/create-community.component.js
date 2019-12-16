  
import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


export default class CreateCommunity extends Component {
  constructor(props){
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.listTags = this.listTags.bind(this);
    this.handleTags = this.handleTags.bind(this);

    //this.onChangeTag = this.onChangeTag.bind(this);

    this.state = {
      communityName: '',
      communityDescription: '',
      communityTags:[],
      dataTypes: [],
      showTags:false.value,
      selectedTags:[]
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
  handleTags=(e) =>{
    debugger;
      console.log(e[0].value + " " + e[0].label)
      const array =[];
      for (var key in e) {
        const f = { qNum : e[key].value , label : e[key].label}
        array.push(f)
      }
      this.setState({ selectedTags: array })

  }

  listTags(){
    
    const name = this.state.communityName;
    axios.get('https://www.wikidata.org/w/api.php?action=wbsearchentities&limit=500&language=en&format=json&search='+ name + '&origin=*')
    .then(response => {
      var tags = []
      for (var key in response.data.search) {
        const f = { value : response.data.search[key].id , label : response.data.search[key].description}
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
      communityTags : this.state.selectedTags
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
           </button>
           {this.state.showTags && 
                  <Select 
                  options={this.state.communityTags}
                  defaultValue={[this.state.communityTags[2]]}
                  isMulti
                  name="tags"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange = {this.handleTags}
                   />
            }
            </div>
            
            <div className="form-group">
              <input type="submit" value="Create Community" className="btn btn-primary" />
            </div>
          </form>
      </div>
    );
  }
}
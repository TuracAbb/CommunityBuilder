  
import React, { Component } from 'react';
import axios from 'axios';



export default class CreateCommunity extends Component {
  constructor(props){
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDataType = this.onChangeDataType.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.addField = this.addField.bind(this);
    //this.onChangeTag = this.onChangeTag.bind(this);

    this.state = {
      communityName: '',
      communityDescription: '',
      communityDataType: [],
      communityTag:[],
      dataType: [{name: '', fields: ''}]
      //fields: []
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
  
  onChangeDataType = (e) => {
    this.setState({
      communityDataType: e.target.value
    })
  };

 
  handleAdd = (e) => {
    console.log("I am pressed");  
    if (["nameForField", "field"].includes(e.target.className) ) {
      let dataType = [...this.state.dataType]
      dataType[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
      this.setState({ dataType }, () => console.log(this.state.dataType))
    } else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() })
    }
  }
addField = (e) => {
    this.setState((prevState) => ({
      dataType: [...prevState.dataType, {name:"", field:""}],
    }));
  }
  
  onSubmit = (e) =>{
    e.preventDefault();

 const newCommunity = {
      communityName : this.state.communityName,
      communityDescription : this.state.communityDescription,
      communityDatatype : this.state.communityDataType,
      communityTags : this.state.communityDataType
    }
    console.log(newCommunity);

    axios.post('http://localhost:5000/community/createCommunity', newCommunity)
      .then(res => console.log(res.data));
} 

  render() {
    let dataType = this.state.dataType

    return (
      <div>
          <h3>Create New Community</h3>
          <form onSubmit = {this.onSubmit}>
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
              <label>DataType of community: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value = {this.state.communityDataType}
                  onChange = {this.onChangeDataType}
                  />
            </div>
            <div className="form-group"> 
              <label>DataType of community: </label>
              <button type="button" onClick={() => this.handleAdd}>
                  + Add
              </button>{
                dataType.map((val, idx)=>{
                  let nameId = `name-${idx}`, fieldId = `field-${idx}`
                  return (
                    <div key={idx}>
                      <label htmlFor={fieldId}>Field</label>
                      <input
                        type="text"
                        name={nameId}
                        data-id={idx}
                        id={nameId}
                        value={dataType[idx].names} 
                        className="name"
                      />
                      <label htmlFor={fieldId}>Field</label>
                      <input
                        type="text"
                        name={fieldId}
                        data-id={idx}
                        id={fieldId}
                        value={dataType[idx].field} 
                        className="field"
                      />
                    </div>
                  )
                })
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
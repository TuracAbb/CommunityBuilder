  
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import nextId from "react-id-generator";



export default class Datatype extends React.Component{
  constructor(props) {
    super(props);
    this.state ={
      datatypeID:"",
      datatypeName: "",
      datatypeField:[{ name : "" , type : "", required : ""}],
      communityId : ""
    }
}
componentDidMount(){
  
}


handleNameChange = evt => {
  this.setState({ datatypeName: evt.target.value });
};

handleFieldNameChange = idx => evt => {
  debugger;
  const newFields = this.state.datatypeField.map((field, sidx) => {
    if (idx !== sidx) return field;
    return { ...field, name: evt.target.value };
  });

  this.setState({ datatypeField: newFields });
  const y = this.state.datatypeField;
};

handleFieldTypeChange = idx => evt => {
  const newFields = this.state.datatypeField.map((field, sidx) => {
    if (idx !== sidx) return field;
    return { ...field, type: evt.target.value };
  });

  this.setState({ datatypeField: newFields });
}; 

  handleFieldRequireChange = idx => evt => {
    const newFields = this.state.datatypeField.map((field, sidx) => {
      if (idx !== sidx) return field;
      return { ...field, required: evt.target.value };
    });

  this.setState({ datatypeField: newFields });
};

handleAddField = () => {
  this.setState({
    datatypeField: this.state.datatypeField.concat([{ name: "" }])
  });
};

handleRemoveField = idx => () => {
  this.setState({
    datatypeField: this.state.datatypeField.filter((s, sidx) => idx !== sidx)
  });
};
handleSubmit = evt => {
 
  const idOfCurrentCommunity = this.props.idGreet;  
  const { datatypeName, datatypeField } = this.state;

  //Getting fields of new datatype
  const arr = [];
  for (var key in this.state.datatypeField) {
      const f = { name : datatypeField[key].name , type : datatypeField[key].type,  required : datatypeField[key].required}
      arr.push(f);
  }

  //Get old datatypes
  var s  = JSON.parse(localStorage.getItem('datatypes'));

  //create json
  const g = {
      datatypeName : datatypeName,
      datatypeField : arr
  }
  //merge old and new datatypes
  s.push(g);

  //add to datatypes header
  const result = {
    dataTypes : s
  }

  //Send request
    axios.post('http://localhost:5000/community/updateCommunityDatatype/' + idOfCurrentCommunity, result)
    //.then(res => console.log(res.data))
    .then(() => alert("update"))
    .catch(err=> console.log('eroor' + err));
};
  
  render() {
    
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Datatype Name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />

        <h4>Fields</h4> 

        {this.state.datatypeField.map((field, idx) => (
          <div className="field">
            <input
              type="text"
              placeholder={`Field #${idx + 1} name`}
              value={field.name}
              onChange={this.handleFieldNameChange(idx)}
            />
             <select id="inputState" onChange={this.handleFieldTypeChange(idx)}>
                <option selected>Type</option>
                <option>Number</option>
                <option>Text</option>
                <option>Image</option>
                <option>URL</option>
                <option>GeoLocation</option>
            </select>
            <select id="inputState" onChange={this.handleFieldRequireChange(idx)}>
                <option selected>Required?</option>
                <option>Yes</option>
                <option>No</option>
                </select>
            <button
              type="button"
              onClick={this.handleRemoveField(idx)}
              className="small"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={this.handleAddField}
          className="small"
        >
          Add Field
        </button>
        <button>Submit</button>
      </form>
    );
  }
  
}
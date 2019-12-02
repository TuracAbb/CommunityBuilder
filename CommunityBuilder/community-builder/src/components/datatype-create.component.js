  
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Datatype extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      datatypeName: "",
      fields:[{ name : "" , type : "", required : ""}]
    }
}

handleNameChange = evt => {
  this.setState({ datatypeName: evt.target.value });
};


handleFieldNameChange = idx => evt => {
  const newFields = this.state.fields.map((field, sidx) => {
    if (idx !== sidx) return field;
    return { ...field, name: evt.target.value };
  });

  this.setState({ fields: newFields });
};

handleFieldTypeChange = idx => evt => {
  const newFields = this.state.fields.map((field, sidx) => {
    if (idx !== sidx) return field;
    return { ...field, type: evt.target.value };
  });

  this.setState({ fields: newFields });
}; 

  handleFieldRequireChange = idx => evt => {
    const newFields = this.state.fields.map((field, sidx) => {
      if (idx !== sidx) return field;
      return { ...field, required: evt.target.value };
    });

  this.setState({ fields: newFields });
};



handleAddField = () => {
  this.setState({
    fields: this.state.fields.concat([{ name: "" }])
  });
};

handleRemoveField = idx => () => {
  this.setState({
    fields: this.state.fields.filter((s, sidx) => idx !== sidx)
  });
};
handleSubmit = evt => {
  const { datatypeName, fields } = this.state;
  debugger;
  alert(`Incorporated: ${datatypeName} with ${fields.length  + fields[0].name + fields[0].type + fields[0].required} fields`);
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

        {this.state.fields.map((field, idx) => (
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
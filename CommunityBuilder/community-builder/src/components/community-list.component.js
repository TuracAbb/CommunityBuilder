  
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Community = props => (
  <tr>
    <td>{props.community.communityName}</td>
    <td>{props.community.communityDescription}</td>
    <td>
      <Link to={"/join/"+props.community._id}>Join</Link> 
    </td>
  </tr>
)

export default class CommunityList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {communities: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/community/')
      .then(response => {
        this.setState({ communities: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  communityList() {
    return this.state.communities.map(currentCommunity => {
      return <Community community={currentCommunity} key={currentCommunity._id}/>;
    })
  }
  render() {
    return (
      <div>
        <h3>Communities</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.communityList() }
          </tbody>
        </table>
      </div>
    );
  }
}
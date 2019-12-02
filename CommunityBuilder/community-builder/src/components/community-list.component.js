  
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CommunityListingRow = ({row, click}) =>{
  
  return (
    <tr className = "">
      <td> <Link to={"/communityPage" } onClick = {click}>{row.communityName}</Link></td>
      <td>{row.communityDescription}</td>
    </tr>

  )
}

export default class CommunityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {communities: [], list: {
        communityID: '',
        communityName: '',
        communityDescription: '',
        communityTags: ''
    }};
    this.handleClick = this.handleClick.bind(this);
    this.clickCommunity = this.clickCommunity.bind(this);


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
  handleClick = (e) => {
    console.log(e.target._id)
  };

  getCommunityDetails = (id) =>{
    axios.get('http://localhost:5000/community/' + id)
      .then(response => {
        localStorage.setItem('data', JSON.stringify(response.data));
        debugger;
        console.log(response.data);
        this.props.history.push({
          pathname: '/community-page',
          state:{detail: response.data}
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  clickCommunity = (id) => {
    console.log( 'HERE IS ID ' + id)
    //once, id verip community alan bir router yazacagim ve burada o idyi biliglerini linkte state koy , sonra, donen bilgileri de create-page sayfasina pushlayacagim
    //how to pass params with history push
    this.getCommunityDetails(id);
  };

  communityList() {
    return this.state.communities
    //.map(currentCommunity => {
     // return <Community community={currentCommunity} key={currentCommunity._id} onClick={this.handleClick}/>;
    //})
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
            </tr>
          </thead>
          <tbody>
            { this.state.communities.map(c=>
              <CommunityListingRow key={c._id} list = {this.state.list} row= {c} click = {() =>this.clickCommunity(c._id)}/>
            )}
          </tbody>
        </table>
      </div>
    );
  }
  
}
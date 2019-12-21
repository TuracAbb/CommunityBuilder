import React, { Component } from 'react';
import Datatype from '../components/datatype-create.component';
import PostForm from '../components/post-form.component'
import { throws } from 'assert';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {ButtonToolbar, ListGroup, ButtonGroup} from 'react-bootstrap';
import {Modal, Button} from 'react-bootstrap';
import { MDBCol, MDBFormInline, MDBBtn } from "mdbreact";




const datatypeListingRow = ({row, click}) =>{
  debugger;
}

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
      datatypesOfCommunity :[],
      postsOfCommunity:[],
      modalShow:false,
      formArray:["a"],
    };

    this.handleAddDatatype = this.handleAddDatatype.bind(this);
    this.getDatatypes = this.getDatatypes.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.getTags = this.getTags.bind(this);
    this.clickDatatype =  this.clickDatatype.bind(this);
    //this.handleShowModal = this.handleShowModal.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
  }
  componentDidMount() {
    this.getDatatypes();
    this.getPosts();
    this.getTags();

    var dtType = []
    for (var key in JSON.parse(localStorage.getItem('datatypes'))) {
      const f = { datatypeField : JSON.parse(localStorage.getItem('datatypes'))[key].datatypeField , datatypeName : JSON.parse(localStorage.getItem('datatypes'))[key].datatypeName}
      dtType.push(JSON.parse(localStorage.getItem('datatypes'))[key]);
    }
    var posts = []
    for (var key in JSON.parse(localStorage.getItem('posts'))) {
      posts.push(JSON.parse(localStorage.getItem('posts'))[key]);
      console.log(posts[key])
    } 
    var tags = []
    for (var key in JSON.parse(localStorage.getItem('posts'))) {
      tags.push(JSON.parse(localStorage.getItem('posts'))[key]);
      console.log(posts[key])
    } 
  
      console.log(this.props.location);
      this.setState({
        communityID: JSON.parse(localStorage.getItem('data'))._id,
        communityName: JSON.parse(localStorage.getItem('data')).communityName,
        communityDescription:  JSON.parse(localStorage.getItem('data')).communityDescription,
        communityTags: JSON.parse(localStorage.getItem('data')).communityTags,
        datatypesOfCommunity:dtType,
        postsOfCommunity:posts,
        tagsOfCommunity:tags
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
  clickDatatype = (item) => {
    console.log('jsdnk' + item );
  }

  clickCommunity = (id) => {
    console.log( 'HERE IS ID ' + id)
    //once, id verip community alan bir router yazacagim ve burada o idyi biliglerini linkte state koy , sonra, donen bilgileri de create-page sayfasina pushlayacagim
    //how to pass params with history push
    this.getCommunityDetails(id);
  };

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
  getPosts = () =>{
    axios.get('http://localhost:5000/community/getPosts/' + JSON.parse(localStorage.getItem('data'))._id)
      .then(response => {
        localStorage.setItem('tags', JSON.stringify(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

  }
  getTags = () =>{
    axios.get('http://localhost:5000/community/getTags/' + JSON.parse(localStorage.getItem('data'))._id)
      .then(response => {
        localStorage.setItem('posts', JSON.stringify(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

  }
    handleShowModal(id){
      this.setState({
        modalShow :{
          [id] :true
      } 
    });
    console.log(this.state.setModalShow)
  }
    handleHideModal(){
      debugger;
      console.log('hiding modal')
      this.setState({
        modalShow : false
      })
    }
  

  
  render() {
    return ( 
      <div>

      <div>
        
      </div>
      <div>
      <p> Community : {this.state.communityName} </p> 
      <button type="submit" className="btn btn-warning" > JOIN </button>

      </div>
          <p> Community : {this.state.communityName} </p>
          <p> Description : {this.state.communityDescription} </p>
          <p> Tags : </p>
           
         <p>Datatypes : </p> 
         {this.state.datatypesOfCommunity.map((item, key)=>
          <div >
            <ButtonGroup aria-label="Basic example">
          <MDBBtn gradient="aqua"  rounded size="lg" type="submit" className="mr-auto" onClick={this.handleShowModal.bind(this, item._id)}> {item.datatypeName} </MDBBtn>        
              {this.state.modalShow[item._id] && 
                <PostForm
                location = {this.props.location}
                show={this.state.modalShow[item._id]}
                onHide={this.handleHideModal}
                communityId = {this.state.communityID}
                datatypeName = {item.datatypeName}
                datatypeId = {item._id}
              />
            }
            </ButtonGroup>
          </div>
        )}

          <p> Posts : </p>
          {this.state.postsOfCommunity.map((item, key)=>
            <div>
              Post - {key}
              {Object.keys(item).map(function(key){
                return <div>{key}: {item[key]}</div>;
              })}
            </div>
          )} 

          <button type="submit" className="btn btn-warning" onClick={this.handleAddDatatype}>  Add Data Type </button>
          {this.state.displayDatatype && 
          <Datatype location = {this.props.location} idGreet = {this.state.communityID}/>
          }
          
      </div>
      
    );
  }
}
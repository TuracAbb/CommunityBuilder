import React, { Component } from 'react';
import Datatype from '../components/datatype-create.component';
import PostForm from '../components/post-form.component'
import GenericPost from '../components/generic-post.component'
import { throws } from 'assert';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {ButtonToolbar, ListGroup, ButtonGroup, Card} from 'react-bootstrap';
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
      tagsOfCommunity:[],
      modalShow:false,
      showGeneric:false,
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
    for (var key in JSON.parse(localStorage.getItem('tags'))) {
      tags.push(JSON.parse(localStorage.getItem('tags'))[key]);
      console.log(tags[key])
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
    console.log(JSON.parse(localStorage.getItem('data')).communityName);
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
    debugger;
    axios.get('http://localhost:5000/community/getPosts/' + JSON.parse(localStorage.getItem('data'))._id)
      .then(response => {
        localStorage.setItem('posts', JSON.stringify(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

  }
  getTags = () =>{
    console.log('MY ID IS : ' + JSON.parse(localStorage.getItem('data'))._id)
    axios.get('http://localhost:5000/community/getTags/' + JSON.parse(localStorage.getItem('data'))._id)
      .then(response => {
        localStorage.setItem('tags', JSON.stringify(response.data));
        console.log("RES HERE"  + response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      console.log("SETTED")

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
    handleShowGeneric(id){
      this.setState({
        showGeneric:true
      
    });
    
  }
  
    handleHideGeneric(){
      debugger;
      console.log('hiding modal')
      this.setState({
        showGeneric : false
      })
    }
  

  
  render() {
    return ( 
      <div>

      <div>
        
      </div>
      <div>
        Community : {this.state.communityName}  <button type="submit" className="btn btn-warning" > JOIN </button>
      </div>
          <p> Description : {this.state.communityDescription} </p>
          <p> Tags : </p>
            {this.state.tagsOfCommunity.map((item, key)=>
              <div>
                  #{item.label}
              </div>
            )} 
           
         <p>Datatypes : </p> 
         
         <button type="submit" className="btn btn-warning" onClick={this.handleAddDatatype}>  Add Data Type </button>
          {this.state.displayDatatype && 
          <Datatype location = {this.props.location} idGreet = {this.state.communityID}/>
          }
           <button type="submit" className="btn btn-info" onClick={this.handleShowGeneric.bind(this)}> Generic Post </button>
           {this.state.showGeneric && 
                <GenericPost
                location = {this.props.location}
                show={this.state.showGeneric}
                onHide={this.handleHideGeneric}
                communityId = {this.state.communityID}
              />
            }

          <ButtonGroup aria-label="Basic example">
          {this.state.datatypesOfCommunity.map((item, key)=>
          <div >
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
            }</div>)}
            </ButtonGroup>          
      
          <p> Posts : </p>
          {this.state.postsOfCommunity.map((item, key)=>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Post - {key}</Card.Title>
            <Card.Text>
              {Object.keys(item).map(function(key){
                  return <div>{key}: {item[key]}</div>;
                })}
            </Card.Text>
          </Card.Body>
        </Card>
        )} 
          
      </div>
      
    );
  }
}
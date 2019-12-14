import React, { Component } from 'react';
import Datatype from '../components/datatype-create.component';
import PostForm from '../components/post-form.component'
import { throws } from 'assert';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {ButtonToolbar} from 'react-bootstrap';
import {Modal, Button} from 'react-bootstrap';


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
      deneme :[],
      modalShow:false,
      formArray:["a"],
    };

    this.handleAddDatatype = this.handleAddDatatype.bind(this);
    this.getDatatypes = this.getDatatypes.bind(this);
    this.clickDatatype =  this.clickDatatype.bind(this);
    //this.handleShowModal = this.handleShowModal.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
  }
  componentDidMount() {
    this.getDatatypes();
    var denemeq = []
    for (var key in JSON.parse(localStorage.getItem('datatypes'))) {
    console.log('Here it is :' + JSON.parse(localStorage.getItem('datatypes'))[key]);
    const f = { datatypeField : JSON.parse(localStorage.getItem('datatypes'))[key].datatypeField , datatypeName : JSON.parse(localStorage.getItem('datatypes'))[key].datatypeName}
    denemeq.push(JSON.parse(localStorage.getItem('datatypes'))[key]);
  } 

      console.log(this.props.location);
      this.setState({
        communityID: JSON.parse(localStorage.getItem('data'))._id,
        communityName: JSON.parse(localStorage.getItem('data')).communityName,
        communityDescription:  JSON.parse(localStorage.getItem('data')).communityDescription,
        communityTags: JSON.parse(localStorage.getItem('data')).communityTags,
        deneme:denemeq
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
        <button type="submit" className="btn btn-warning" > JOIN </button>

      <div>
        
      </div>
          <p> Community : {this.state.communityName} </p>
          <p> Description : {this.state.communityDescription} </p>
          <p> Tags : {this.state.communityTags} </p>
         <p>Datatypes : </p> 
         {this.state.deneme.map((item, key)=>
          <div>
            <ButtonToolbar>
              <Button variant="primary" onClick={this.handleShowModal.bind(this, item._id)}> {item.datatypeName}</Button>
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
            </ButtonToolbar>
          </div>
 )}

          <p> Posts : {this.state.communityTags} </p>

          <button type="submit" className="btn btn-warning" onClick={this.handleAddDatatype}>  Add Data Type </button>
          {this.state.displayDatatype && 
          <Datatype location = {this.props.location} idGreet = {this.state.communityID}/>
          }
          
      </div>
      
    );
  }
}
import React, { Component } from 'react';
import Datatype from '../components/datatype-create.component';
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
    this.MyVerticallyCenteredModal = this.MyVerticallyCenteredModal.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
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
    handleShowModal(){
      console.log("clicked")
      this.setState({
      modalShow : true
    })
    console.log(this.state.setModalShow)
  }
    handleHideModal(){
      debugger;
      console.log('hiding modal')
      this.setState({
        modalShow : false
      })
    }
  MyVerticallyCenteredModal(props) {
    console.log('Aciliyor ' + props)
    const y = "";
    const arr = [];
    if(props.datatypeId !== null && props.show == true){
      axios.get('http://localhost:5000/community/getFieldsOfDatatype/' + this.state.communityID+ '/' + props.datatypeId)
      .then(response => {
        var a = (response.data).datatypeField;
        for (var key in a) {
                const f = { name :a[key].name , type :a[key].type,  required :a[key].required}
                arr.push(f);
            }
          this.setState({
            formArray : arr
          })
          debugger;
      })
      .catch((error) => {
        console.log(error);
      })
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
          Fields will be here
          DatatypeName = {props.datatypeName}
          DatatypeId = {props.datatypeId}
          Array = {this.state.formArray[0].name}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
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
              <Button variant="primary" onClick={this.handleShowModal}>
                {item.datatypeName}
              </Button>

              <this.MyVerticallyCenteredModal
                show={this.state.modalShow}
                onHide={this.handleHideModal}
                datatypeName = {item.datatypeName}
                datatypeId = {item._id}
              />
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
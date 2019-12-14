import React, { Component } from 'react';
import {ButtonToolbar} from 'react-bootstrap';
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios';

export default class PostForm  extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            modalShow:false,
            formArray:["a"],
        }
    }
    componentDidMount(){
      
    }

  render() {
        console.log('Aciliyor ' + this.props)
        const y = "";
        const arr = [];
        if(this.props.datatypeId !== null && this.props.show == true){
          axios.get('http://localhost:5000/community/getFieldsOfDatatype/' + this.props.communityId+ '/' + this.props.datatypeId)
          .then(response => {
            var a = (response.data).datatypeField;
            for (var key in a) {
                    const f = { name :a[key].name , type :a[key].type,  required :a[key].required}
                    arr.push(f);
                }
              this.setState({
                formArray : arr
              })
              debugger;
          })
          .catch((error) => {
            console.log(error);
          })
        }
        // </div><CommunityListingRow key={c._id} list = {this.state.list} row= {c} click = {() =>this.clickCommunity(c._id)}/>
        return (
          <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Create post for {this.props.datatypeName}</h4>
              <p>
              
              { this.state.formArray.map(c=>
              <div>
                <div class="form-group">
                   <label for="exampleFormControlInput1">{c.name}</label>
                   <input type="email" class="form-control" id="exampleFormControlInput1" placeholder={c.type}/>
                </div>
              </div>   
                 
              )}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }
}

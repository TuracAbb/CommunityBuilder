import React, { Component } from 'react';
import {ButtonToolbar} from 'react-bootstrap';
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios';

export default class PostForm  extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            modalShow:false,
            formArray:[],
            nameOfField:"",
            //postFields:[{adi: "Turac", Resim:"jpg", numara: "port"},{adi: "Turac", Resim:"jpg", numara: "port"}],
            postFields:[],
            name:"",
            value:"",
            genericName:"",
            genericDesc:""
        }
    }
    componentDidMount(){
      
    }
    onChangeName = (e) => {
        this.setState({
        genericName: e.target.value
        })
    };
    onChangeDescription= (e) => {
        this.setState({
        genericDesc: e.target.value
        })
    }; 
   
    handleSubmit = evt => {
        debugger;
        const idOfCurrentCommunity = this.props.communityId;  
        var a =this.state.genericName
        var b = this.state.genericDesc
        const c = {
            nameOfField:a , 
            valueOfField:b
        }
        
        this.setState({postFields: c });
        var y = "{\"Name\"" + ":\"" + a + "\", \"Description\"" +  ":\"" + b + "\"}";
        
    
        //Get old posts
        var s  = JSON.parse(localStorage.getItem('posts'));
        var t = JSON.parse(y)
        //merge old and new datatypes
        s.push(t);
      
        //add to datatypes header
        const result = {
          posts : s
        }
      
        //Send request
          axios.post('http://localhost:5000/community/updateCommunityPost/' + idOfCurrentCommunity, result)
          //.then(res => console.log(res.data))
          .then(() => alert("updated"))
          .catch(err=> console.log('eroor' + err));

        this.props.history.push({
            pathname: '/community-page' + this.state.communityId,
        })
      };
   

  render() {
        
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
              <h4>Create generic Post</h4>
              <p>
             

    <form onSubmit={this.handleSubmit}>
    <div className="form-group"> 
              <label>Name of post: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value = {this.state.communityName}
                  onChange = {this.onChangeName}
                  />
            </div>
            <div className="form-group"> 
              <label>Description of post: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value = {this.state.communityDescription}
                  onChange = {this.onChangeDescription}
                  />
            </div> 
       
        <button>Submit</button>
      </form>
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
)

     
      }
}

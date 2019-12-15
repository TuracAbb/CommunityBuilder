import React, { Component } from 'react';
import {ButtonToolbar} from 'react-bootstrap';
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios';

export default class PostForm  extends React.Component {
    constructor(props) {
        super(props);
        this.handleFieldNameChange = this.handleFieldNameChange.bind(this);
        this.setFieldName = this.setFieldName.bind(this);
        this.state ={
            modalShow:false,
            formArray:[],
            nameOfField:"",
            //postFields:[{adi: "Turac", Resim:"jpg", numara: "port"},{adi: "Turac", Resim:"jpg", numara: "port"}],
            postFields:[],
            name:"",
            value:""
        }
    }
    componentDidMount(){
      
    }
   handleFieldNameChange = idx => evt => { 
        debugger;  
        const nme = evt.target.name
        const k = this.state.postFields[idx];


        //Eger o fielde ilk yazilirsa
        if(this.state.postFields[idx] == undefined){
            const newFields = this.state.postFields.map((field,sidx) => {
                console.log("IDX :" + idx + "SDIX: " + sidx)
                if (idx !== sidx) return field;
                return {  ...field,
                        nameOfField :nme,
                        valueOfField: evt.target.value };
                });
            this.setState({postFields: newFields });

        }
        else{
            const newFields = this.state.postFields.map((field, sidx) => {
                console.log("IDX :" + idx + "SDIX: " + sidx)
                if (idx !== sidx) return field;
                return { ...field, 
                    nameOfField :nme,
                    valueOfField: evt.target.value };
            });
            this.setState({postFields: newFields });

        }

        const y = this.state.postFields;


        /*
        console.log('Yoxlama ' + this.state.postFields[idx])
        if(this.state.postFields[idx] == undefined){ //ilk defe gelir
            console.log("ilk")
            const newField = {
                ...field, 
                nameOfField :nme,
                valueOfField: evt.target.value 
            };
        }
        
        else{
            console.log("duzeltme")
            if(this.state.postFields[idx] != undefined){  //buraya birsey girilib
                const newFields = this.state.postFields.map((field, sidx) => {
                    console.log("IDX :" + idx + "SDIX: " + sidx)
                    if (idx !== sidx) return field;
                    return { ...field, 
                        nameOfField :nme,
                        valueOfField: evt.target.value };
                });
            }
        }
        
        this.setState({postFields: newFields });
        const y = this.state.postFields;*/
    }
    setFieldName(field){
        debugger;
        this.setState({
            nameOfField: field.name})
    }


    handleSubmit = evt => {
        debugger;
        const idOfCurrentCommunity = this.props.communityId;  
        const { name, value } = this.state;
      
        //Getting fields of new datatype
        const arr = [];
        for (var key in this.state.postFields) {
            const f = { name : this.state.postFields[key].nameOfField , value : this.state.postFields[key].valueOfField}
            arr.push(f);
        }
      
        //Get old datatypes
        var s  = JSON.parse(localStorage.getItem('posts'));
      
        //create json
        const g = {
             arr
        }
        //merge old and new datatypes
        s.push(g);
      
        //add to datatypes header
        const result = {
          dataTypes : s
        }
      
        //Send request
          axios.post('http://localhost:5000/community/updateCommunityPost/' + idOfCurrentCommunity, result)
          //.then(res => console.log(res.data))
          .then(() => alert("update"))
          .catch(err=> console.log('eroor' + err));
      };
   

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
             

    <form onSubmit={this.handleSubmit}>
        {this.state.formArray.map((field, idx) => (
            <div className="field">
             <h3>{field.name}</h3>
            <input
              type="text"
              name ={field.name}
              placeholder={`Field #${idx + 1} name`}
              value ={this.state.postFields.nameOfField}
              onChange={this.handleFieldNameChange(idx)}
            />
          </div>
        ))}
       
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

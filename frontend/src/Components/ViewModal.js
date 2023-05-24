import React, { useState, useEffect } from 'react';
import '../App.css';
import Modal from 'react-bootstrap/Modal';
import { ModalFooter, Button } from 'reactstrap';

const UpdateStatusUrl = 'http://127.0.0.1:5000/update_status'


function ViewModal(props) {

    const [inputText, setInputText] = useState("");
    const [formData, setFormData] = useState({
        status:"",
        comment:"",
        id:""
    });

    // Handle comment chane
    const handleCommentChange = event => {
        setInputText(event.target.value);
    
        console.log('value is:', event.target.value);
      };

    // function to handle the change event on the form elements
    function handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(values => ({...values, [name]: value}))       
      };

    // Call API endpoint
    function callSubmitApi() {
        fetch(UpdateStatusUrl, { 
            method: 'POST', 
            headers: { 
                'Content-type' : 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "comment":inputText,
                "number":props.todos.number,
                "id":formData.status
            }) 
            
        })
        .then(response => {response.json();
            props.onHide(); // Close Modal on submit
            console.log(response)})
          
      };


    return (
        <Modal
            {...props}
            size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered  >
            <Modal.Header closeButton>
                <Modal.Title>{props.todos.number}: {props.todos.issues}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Description: </h5>
                <p>{props.todos.description}</p>
                <h5>Due Date: </h5>
                <p>{props.todos.due_date}</p>
                <h5>Reporter: </h5>
                <p>{props.todos.reporter}</p>
                <h5>Current status: </h5>
                <p>{props.todos.status}</p>
                <h5><label htmlFor="status">Change Status:</label></h5>
                <select 
                    name="status" 
                    value={formData.status || ""}
                    onChange={handleInputChange} 
                >
                    <option value="11">TO DO</option>
                    <option value="21">IN PROGRESS</option>
                    <option value="31">DONE</option>
                </select>
                <h5><label htmlFor="comment">Add Comment:
                    <input type="text" 
                    id="inputText" 
                    name="inputText" 
                    onChange={handleCommentChange}
                    value={inputText}></input>
                </label></h5>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    color="primary"
                    onClick={callSubmitApi}
                >Submit</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewModal;



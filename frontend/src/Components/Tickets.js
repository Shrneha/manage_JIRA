import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import {
    Container,
    Table,
    Card,
    CardImg,
    CardText,
    CardTitle,
    CardBody,
    Row, Col
} from "reactstrap";
import Axios from "axios";
//import ViewModal from "./ViewModal";
import { Form } from "react-bootstrap";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import styled, { css } from 'styled-components';


const Button = styled.button`
    min-width: 100px;
    padding: 16px 32px;
    border-radius: 4px;
    border: none;
    background: #141414;
    color: #fff;
    cursor:pointer;
    font-size: 24px;
`;

const FetchAPIUrl = 'http://127.0.0.1:5000/fetch_issues'


function Tickets() {
    const [todoData, setTodoData]= useState([]);
    const [modalShow, setModalShow] = useState(false);

    const toggleModal = () => {
        setModalShow(!modalShow);
    };

    // const handleClose = () => {setModalShow(false);};
    // const handleShow = () => {setModalShow(true);};

    const fetchTickets = async () => {

        
        const {data} = await Axios.get(FetchAPIUrl)
        //console.log("data",data)
        
        // clone an array 
        const issues = [...data];
        console.log("issues",issues);
        

        const allTickets = issues.map(issue => ({
            issues : issue.issues,
            number: issue.number,
            description: issue.description,
            reporter: issue.reporter,
            status: issue.status,
            due_date:issue.due_date,
            story_points:issue.story_points
        }));

        setTodoData(allTickets);

    };

    

    useEffect(() => {
        fetchTickets()
    }, [])

   

    

    return (
        <Container>
            <Row> 
            <Col style={{margin: '10px'}}>
            <h4>To Do</h4> 
                   
                {todoData.filter(record =>record.status === "To Do").map((issue,id) => (
                <Row key={issue.number}>    
                    <Card>
                        <CardBody>
                            <CardTitle>{issue.number}</CardTitle>
                            <Button 
                                color="success"
                                key={issue.id}
                                >{issue.status}
                            </Button>
                        </CardBody>
                    </Card>
                </Row>
                ))}
            </Col> 
            <Col style={{margin: '10px'}}>
            <h4>Done</h4>          
                {todoData.filter(record =>record.status === "Done").map((issue,id) => (
                <Row key={issue.number}>    
                    <Card>
                        <CardBody>
                            <CardTitle>{issue.number}</CardTitle>
                            <Button 
                                color="success"
                                key={issue.id}
                                >{issue.status}
                            </Button>
                        </CardBody>
                    </Card>
                </Row>
            ))}
            </Col>
            <Col style={{margin: '10px'}}>
            <h4>In Progress</h4>          
                {todoData.filter(record =>record.status === "In Progress").map((issue,id) => (
                <Row key={issue.number}>    
                    <Card>
                        <CardBody>
                            <CardTitle>{issue.number}</CardTitle>
                                <Button 
                                    className="btn-modal"
                                    color="success"
                                    key={issue.id}
                                    onClick={toggleModal}
                                    >{issue.status}  
                                </Button>
                        </CardBody>
                    </Card>
                </Row>
            ))}
            </Col>
            </Row>
            <Container>
            <Button>click here
            </Button>
            
            </Container>
           
          
        </Container>
    )

};


export default Tickets;
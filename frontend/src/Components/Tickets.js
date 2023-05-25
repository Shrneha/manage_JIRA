import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Table,  
    CardImg,
    CardText,
    CardTitle,
    CardBody,
    Row, Col,
    Button
} from "reactstrap";
import Axios from "axios";
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import ViewModal from "./ViewModal";




const FetchAPIUrl = 'http://127.0.0.1:5000/fetch_issues'


function Tickets() {
    const [todoData, setTodoData]= useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [card, setCard] = useState();

   
    const handleClose = () => setModalShow(false);
    // const handleShow = (todo,id) => {
        
    //     console.log("todo",todo);
    //     setCard(todo);
    //     console.log("card",card);
    //     setModalShow(true);
    // }

    const fetchTickets = async () => {
        
        const {data} = await Axios.get(FetchAPIUrl)
        //console.log("data",data)
        
        // clone an array 
        const issues = [...data];
        //console.log("issues",issues);
        

        const allTickets = issues.map((issue,id) => ({
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
    }, []);

   
    // Fetch modal data with API
    const getModalData = async(todo) => {
        console.log("todo",todo["number"])
        
        const {data} = await Axios.post(FetchAPIUrl,{
                        "id":todo["number"]}) 
        
        
        // clone an array 
        const filtered_issues = data;
        console.log("filtered_issues",data);
        

        const tickets = filtered_issues.map(ticket => ({
            issues : ticket.issues,
            number: ticket.number,
            description: ticket.description,
            reporter: ticket.reporter,
            status: ticket.status,
            due_date:ticket.due_date,
            story_points:ticket.story_points
        }));
        console.log("tickets",tickets)

        setCard(tickets);
        setModalShow(true);
        
       
    };


       
    return (
        <Container>
            <Row> 
            <Col style={{margin: '10px'}}>
            <h4>To Do</h4>                  
                {todoData.filter(todo =>todo.status === "To Do").map((todo,id) => (
                <Row key={todo.number}>    
                    <Card>
                        <CardBody>
                            <CardTitle>{todo.number}</CardTitle>
                                <Button 
                                    className="btn-modal"
                                    color="success"
                                    key={todo.id}
                                    onClick={() => {getModalData(todo) }}
                                    >{todo.status}  
                                   
                                </Button>
                        
                        </CardBody>
                    </Card> 
                </Row>
                ))}
                
            </Col> 
            <Col style={{margin: '10px'}}>
            <h4>In Progress</h4>          
                {todoData.filter(todo =>todo.status === "In Progress").map((todo,id) => (
                <Row key={todo.number}>    
                    <Card>
                        <CardBody>
                            <CardTitle>{todo.number}</CardTitle>
                                <Button 
                                    className="btn-modal"
                                    color="success"
                                    key={todo.id}  
                                    //onClick={()=>{getModalData(todo) }}                             
                                    >{todo.status}  
                                </Button>
                        </CardBody>
                    </Card>   
                </Row>
            ))}
            </Col>
            <Col style={{margin: '10px'}}>
            <h4>Done</h4>          
                {todoData.filter(todo =>todo.status === "Done").map((todo,id) => (
                <Row key={todo.number}>    
                    <Card>
                        <CardBody>
                            <CardTitle>{todo.number}</CardTitle>
                                <Button 
                                    className="btn-modal"
                                    color="success"
                                    key={todo.id}
                                    //onClick={()=>{getModalData(todo) }}                             
                                    >{todo.status}  
                                </Button>
                            </CardBody>
                                                        
                    </Card>                  
                </Row>
            ))}
            </Col>
            
            </Row>
            {
                modalShow && (
                    <ViewModal 
                    show={modalShow} 
                    onHide={handleClose}
                    todos= {card} 
                />  

                )
            }
            
            
          
        </Container>
    )

};


export default Tickets;
//() => getModalData({todo,id})
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
    const [card, setCard] = useState([])

   
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

    // // Call API endpoint
    // function getModalData(id) {
    //     fetch(FetchAPIUrl, { 
    //         method: 'POST', 
    //         headers: { 
    //             'Content-type' : 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             "id":id["todo"]["number"]
    //         }) 
            
    //     })
    //     .then(response => {response.json(); 
    //         setCard({response});
    //         console.log("card",card)
    //     })

          
    //   };
    const getModalData = async (id) => {
        
        const {data} = await Axios.post(FetchAPIUrl,{
                        "id":id["todo"]["number"]}) 
        //console.log("data",data)
        
        // clone an array 
        const filtered_issues = [...data];
        //console.log("issues",issues);
        

        const allTickets = filtered_issues.map((issue,id) => ({
            issues : issue.issues,
            number: issue.number,
            description: issue.description,
            reporter: issue.reporter,
            status: issue.status,
            due_date:issue.due_date,
            story_points:issue.story_points
        }));

        setCard(allTickets);
        console.log("card",card)
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
                                    onClick={() => getModalData({todo,id})}
                                    >{todo.status}  
    
                                    <ViewModal 
                                        show={modalShow} 
                                        onHide={handleClose}
                                        todos= {card} 
                                    />   
                                </Button>
                        </CardBody>
                    </Card> 
                </Row>
                ))}
            </Col> 
            <Col style={{margin: '10px'}}>
            <h4>In Progress</h4>          
                {todoData.filter(record =>record.status === "In Progress").map((todo,id) => (
                <Row key={todo.number}>    
                    <Card>
                        <CardBody>
                            <CardTitle>{todo.number}</CardTitle>
                                <Button 
                                    className="btn-modal"
                                    color="success"
                                    key={todo.id}
                                  
                                    >{todo.status}  
                                </Button>
                        </CardBody>
                    
                    <ViewModal 
                        show={modalShow} 
                        onHide={handleClose}
                        todos= {todo} 
                    /> 
                    </Card>   
                </Row>
            ))}
            </Col>
            <Col style={{margin: '10px'}}>
            <h4>Done</h4>          
                {todoData.filter(record =>record.status === "Done").map((todo,id) => (
                <Row key={todo.number}>    
                    <Card>
                        <CardBody>
                            <CardTitle>{todo.number}</CardTitle>
                                <Button 
                                    className="btn-modal"
                                    color="success"
                                    key={todo.id}
                                    
                                    >{todo.status}  
                                </Button>
                            </CardBody>
                            <ViewModal 
                                show={modalShow} 
                                onHide={handleClose}
                                todos= {todo} 
                            />                                
                    </Card>                  
                </Row>
            ))}
            </Col>
            
            </Row>
          
        </Container>
    )

};


export default Tickets;

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
                    <Card style={{ width: '18rem' , color:'black'}}>
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
          
        </Container>
    )

};


export default Tickets;

// <Col style={{margin: '10px'}}>
//             <h4>Done</h4>          
//                 {todoData.filter(record =>record.status === "Done").map((issue,id) => (
//                 <Row key={issue.number}>    
//                     <Card>
//                         <CardBody>
//                             <CardTitle>{issue.number}</CardTitle>
//                             <Button 
//                                 color="success"
//                                 key={issue.id}
//                                 >{issue.status}
//                             </Button>
//                         </CardBody>
//                     </Card>
//                 </Row>
//             ))}
//             </Col>
//             <Col style={{margin: '10px'}}>
//             <h4>In Progress</h4>          
//                 {todoData.filter(record =>record.status === "In Progress").map((issue,id) => (
//                 <Row key={issue.number}>    
//                     <Card>
//                         <CardBody>
//                             <CardTitle>{issue.number}</CardTitle>
//                                 <Button 
//                                     className="btn-modal"
//                                     color="success"
//                                     key={issue.id}
//                                     onClick={toggleModal}
//                                     >{issue.status}  
//                                 </Button>
//                         </CardBody>
//                     </Card>
//                 </Row>
//             ))}
//             </Col>
import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Container,Table } from "reactstrap";
import {
    Card,
    CardImg,
    CardText,
    CardTitle,
    Button,
    CardBody,
    Row, Col
} from "reactstrap";
import Axios from "axios";
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";



const FetchAPIUrl = 'http://127.0.0.1:5000/fetch_issues'


const Tickets = () => {
    const [todoData, setTodoData]= useState([])

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
        <div className="row">
        <div className="span6">
            <Col>
                <h4>To Do
                </h4>          
                {todoData.filter(record =>record.status === "To Do").map((issue,id) => (
                <Row md={4} key={issue.number}>    
                    <Card className="mt-2 mb-1">
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
        </div>
        <div className="span6"> 
            <Col>
            <Row md={4}>Done
                </Row>           
                {todoData.filter(record =>record.status === "Done").map((issue,id) => (
                <Row md={4} key={issue.number}>    
                    <Card className="mt-2 mb-1">
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
            </div> 
        </div>
        </Container>
    )

};


export default Tickets;
import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "reactstrap";
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

const FetchAPIUrl = 'http://127.0.0.1:5000/fetch_issues'


const Tickets = () => {
    const [jiraData, setJiraData] = useState([])
    const [todoData, setTodoData]= useState([])

    const fetchTickets = async () => {
        const {data} = await Axios.get(FetchAPIUrl)
        //console.log("data",data)
        
        // clone an array 
        const issues = [...data];
        console.log("issues",issues[0])

        setTodoData(...issues)
        console.log("todoData",todoData)

        const allTickets = issues.map(issue => ({
            issues: issue.issues,
            number: issue.number,
            description: issue.description,
            reporter: issue.reporter,
            status: issue.status,
            due_date:issue.due_date,
            story_points:issue.story_points
        }));

        setJiraData(allTickets);


    };

    useEffect(() => {
        fetchTickets()
    }, [])


    return (
        <Container>
            <Row>
                {jiraData.map(jiraData => (
                <Col md={4} key={jiraData.number}>
                
                    <Card className="mt-2 mb-1">
                        <CardBody>
                            <CardTitle>{jiraData.number}</CardTitle>
                            <Button 
                                color="success"
                                >{jiraData.status}
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
                ))}
            </Row>
        </Container>
    )

};


export default Tickets;
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


    const fetchTickets = async () => {
        const {data} = await Axios.get(FetchAPIUrl)
        console.log("data",data)

        const {tickets} = {data};
        console.log("tickets",tickets)

        // const allTickets = tickets.map(ticket => ({
        //     issues: ticket.issues,
        //     number: ticket.number,
        //     description: ticket.description,
        //     reporter: ticket.reporter,
        //     status: ticket.status,
        //     due_date:ticket.due_date,
        //     story_points:ticket.story_points
        // }));

        setJiraData(tickets);

    };

    useEffect(() => {
        fetchTickets()
    }, [])


    return (
        <Container>
            <Row>
                {jiraData.map(jiraData => (
                <Col md={8} key={jiraData.number}>
                    <Card className="mt-2 mb-1">
                        <CardBody>
                            <CardTitle>TITLE</CardTitle>
                            <Button 
                                color="success"
                                >View
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
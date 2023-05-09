import React, {useState} from "react";
import './App.css';
import {Container, Row, Col} from "reactstrap";
import Tickets from "./Components/Tickets";


function App() {
  return (
    <Container fluid>
      <h1 style={{textAlign:"center"}}>JIRA Dashboard</h1>
      <Row>
        <Col md="8">
          <Tickets />
        </Col>
      </Row>
    </Container>
    
  );
}

export default App;

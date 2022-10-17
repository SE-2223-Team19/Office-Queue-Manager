//Added by Shahab
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";

export default function NextCall() {
  const [servicetype,setservicetype]=useState();

     async function HandleNextCall(){
      //const url = "http://localhost:3001/NextCall"
      let user = localStorage.getItem('auth')
      user = JSON.parse(user)
      const response = await fetch(url, {
        method: 'POST', 
        mode: 'cors',
        cache: 'no-cache',
        credentials:'same-origin',
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify({servicetype}) 
      });
  
  }  

  return (
    <div>
      <Container>
      <Row style={{ height: "200px" }} className="border border-primary m-2">
          <Col className="text-start">
            
                <div>
    
                 <Form>

        <h2>Officer Desk</h2>
          
<div onChange={(e)=>{setservicetype(e.target.value)}}>

          <Form.Check inline label="Service #1" name="group1" type="radio" value="1" />

          <Form.Check inline label="Service #2" name="group1" type="radio" value="2" />

          <Form.Check inline label="Service #3" name="group1" type="radio" value="3" />

          </div>


                  <Button  variant="primary" onClick={()=> {HandleNextCall()}}>Call Next Customer </Button></Form>
                </div>
          </Col>
        </Row>
        
      </Container>
    </div>
  );
}



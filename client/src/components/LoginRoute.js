import { Alert, Col, Row, Card  } from "react-bootstrap";
import LoginForm from "./AuthComponents";
import React, { useEffect } from 'react';

function LoginRoute(props) {

    useEffect(() => {
        document.body.style = 'background: #0089c9;';
    })
    return (
        <Row>
            <Col>
                <Card style={{
                    position: 'absolute', left: '50%', top: '40%',
                    transform: 'translate(-50%, -50%)', width: "329px", borderRadius: "8px", boxShadow: "1px 2px 8px rgba(0, 0, 0, 0.65)"
                }}>
                    <Card.Header><h3>Office Queue Management</h3></Card.Header>
                    <Card.Body>
                        {props.message && <Row>
                            <Alert variant={props.message.type} onClose={() => props.setMessage('')} dismissible>{props.message.msg}</Alert>
                        </Row>}
                        <Card.Title style={{ textAlign: "center" }}>Login</Card.Title>
                        <LoginForm login={props.login} />
                    </Card.Body>
                </Card>
            </Col>
        </Row>)
}

export default LoginRoute;
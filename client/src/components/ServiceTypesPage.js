import { Button, Container, Col, ListGroup, Row } from "react-bootstrap"

function ServiceRow(props) {

    let name = props.service.name;

    return (<ListGroup.Item>
        <Row style={{height: '60px', alignItems: 'center'}}><Col style={{textAlign: 'center'}}><strong>{name}</strong></Col>
        <Col style={{textAlign: 'center'}}><Button variant = "danger" onClick={() => console.log("You have choosen " + name)}>Press</Button></Col></Row>
    </ListGroup.Item>)
}

function ServiceList(props) {

    let servicesTypes = props.typesServices;
    let loading = props.loading;

    if (loading) {
        return <Container fluid className='p-4 rounded-3 bg-light' style={{ position: 'absolute', width: '95%', height: '70%', left: '2.5%' }}>
            <Container fluid>
                <div className="text-center">
                    <div className="spinner-border" role="status" style={{ width: '10rem', height: '10rem', position: 'relative', top: '100px' }}></div>
                </div>
            </Container>
        </Container>
    } else {
        return (<>{servicesTypes && <Container fluid className='p-4 rounded-3 bg-light' style={{ position: 'absolute', width: '50%', height: '70%', left: '25%', bottom: '15%' }}>
            <Container fluid>
                <ListGroup className="list-group list-group-flush rounded-3 p-5" >
                    {servicesTypes.map((service, idx) => <ServiceRow key={idx} service={service} />)}
                </ListGroup>
            </Container>
        </Container>}</>)
    }
}

function ServicePage(props) {

    let typesServices = props.typesServices;
    let loading = props.loading;

    return <Container fluid className='bg-primary' style={{ position: 'fixed', width: '100%', height: '100%' }}>
        <Container style={{position: 'absolute', top: '5%', left: '27%'}}><strong><h1>Office Queue Management System</h1></strong></Container>
        <ServiceList typesServices={typesServices} loading={loading} />
    </Container>
}

export default ServicePage



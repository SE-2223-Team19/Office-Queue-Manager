import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import API from '../src/API';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ServicePage from '../src/components/ServiceTypesPage'
import { useEffect, useState } from 'react';
import LoginRoute from '../src/components/LoginRoute';
import { Container } from 'react-bootstrap'


function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.body.style = '';
    const checkAuth = async () => {
      const user = await API.getUserInfo();
      if (user !== null) {
        setLoggedIn(true);
      }
    };
    checkAuth();
    setLoading(false);
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({ msg: `Welcome, ${user.name} s${user.id}!`, type: 'success' });
    }
    catch (err) {
      setMessage({ msg: `Incorrect username or password`, type: 'danger' });
    }
  };

  // const handleLogout = async () => {
  //   await API.logOut();
  //   setLoggedIn(false);
  //   setMessage({ msg: `Logout successful!`, type: 'success' });
  // };

  const insertTicket = async (service_types) => {
    try {
      const insertedTicket = await API.insertTicket(service_types);
      setMessage("Insert a prenotation for service " + service_types + " and you are number: " + insertedTicket.id);
    } catch (error) {
      setMessage({ msg: `Ticket entry failed!`, type: 'danger' })
    }
  }


  if (loading) {
    return <Container fluid className='p-4 rounded-3 bg-light' style={{ position: 'absolute', width: '95%', height: '70%', left: '2.5%' }}>
      <Container fluid>
        <div className="text-center">
          <div className="spinner-border" role="status" style={{ width: '10rem', height: '10rem', position: 'relative', top: '100px' }}></div>
        </div>
      </Container>
    </Container>
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Layout mode="serviceTypes" insertTicket={insertTicket} message={message} setMessage={setMessage} />} />
        <Route path='/login' element={
          loggedIn ? <Navigate replace to='/' /> : <LoginRoute message={message} setMessage={setMessage} login={handleLogin} />
        } />
        <Route path='*' element={
          <div>
            <h1>Ops... something went wrong :(</h1>
          </div>
        }></Route>
      </Routes>
    </BrowserRouter>

  );
}

function Layout(props) {

  let mode = props.mode;
  let outlet = undefined;
  const [loading, setLoading] = useState(true)
  const [typesServices, setTypeServices] = useState([])


  useEffect(() => {
    async function loadServicesTypes() {
      try {
        setLoading(true)
        const servicesTypes = await API.loadServiceTypes();
        setTypeServices(servicesTypes)
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    loadServicesTypes()
  }, []);


  if (mode === "serviceTypes") {
    outlet = <ServicePage typesServices={typesServices} loading={loading} insertTicket={props.insertTicket} message={props.message} setMessage={props.setMessage} />
  }

  return outlet

}

export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import API from '../src/API';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ServicePage from '../src/components/ServiceTypesPage'
import { useEffect, useState } from 'react';
import LoginRoute from '../src/components/LoginRoute';


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
      // console.log(err);
      setMessage({ msg: `Incorrect username or password`, type: 'danger' });
    }
  };

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    setMessage({ msg: `Logout successful!`, type: 'success' });
  };

  if (loading) { return <h1>Loading...</h1> }

  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Layout mode="serviceTypes" />} />
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
    outlet = <ServicePage typesServices={typesServices} loading={loading} />
  }

  return outlet

}

export default App;

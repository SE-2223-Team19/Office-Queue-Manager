import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import API from '../src/API';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ServicePage from '../src/components/ServiceTypesPage'
import { useEffect, useState } from 'react';

function App() {

  

  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element = {<Layout mode = "serviceTypes" />} />
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
      } catch(err) {
        console.log(err)
      }
    }
    loadServicesTypes()
  }, []);


  if(mode === "serviceTypes") {
    outlet = <ServicePage typesServices = {typesServices} loading = {loading} />
  }

  return outlet

}

export default App;

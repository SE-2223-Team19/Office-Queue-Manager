'use strict';

const express = require('express');
const { nextcall } = require('./dao/Nextcall');




// init express
const app = new express();
const port = 3001;

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.get('/api/callcustomer/:customerid/:serviceType',async(req,res)=>{

const id = req.params.customerid;
const type= req.params.Servicetype;
try {
  const call= await nextcall(id,type)
  return res.status(201).json(call)
  
} catch (error) {

  return res.status(500).json({error:"Generic Error"})
  
}

})
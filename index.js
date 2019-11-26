const express = require('express');
const path = require('path')
const app = express();
app.listen(8080,()=>{
    console.log('Server started on port 8080')
})

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname,'./index.html'));
})

app.get('/assets/js/CRM.js',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./assets/js/CRM.js'))
})

app.get('/assets/css/index.css',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./assets/css/index.css'))
})

app.post('/marketing',(req,res)=>{
    console.log('Add marketing campaign');

    //ToDo create and save the marketing campaign data
});

app.post('/clientdata',(req,res)=>{
    //ToDo save the client data received in the database
});




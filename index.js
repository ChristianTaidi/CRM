const express = require('express');
const path = require('path')
const app = express();
app.listen(443,()=>{
    console.log('Server started on port 443')
})

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname,'./index.html'));
})

app.get('/assets/js/CRM.js',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./assets/js/CRM.js'))
})


app.get('/')


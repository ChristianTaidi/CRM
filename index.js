const express = require('express');
const path = require('path');
const cors = require('cors');
const appDAO = require('./main');
var bodyParser = require('body-parser')
const dao = new appDAO('./database.db');
const app = express();
let idCounter = 0;
let idCounterCostumer = 0;
app.listen(8080,()=>{
    console.log('Server started on port 8080')
})

app.use(cors({origin:'http://localhost:8080'}));
app.use(bodyParser.json());

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
    console.log(req.body);
    let campaign = req.body;
    idCounter += 1;
    campaignId = dao.run('INSERT INTO CAMPAIGN (ID_CAMPAIGN,TPYE_CAMPAIGN,OBJECTIVE_COSTUMER,DESCRIPTION,START_DATE,END_DATE) values ($1,$2,$3,$4,$5,$6)',[idCounter,campaign.campaign,campaign.user,campaign.description,campaign.dateStart, campaign.dateEnd]);

    //ToDo create and save the marketing campaign data
});

app.post('/costumer',(req,res)=>{
    console.log('Add costumer');
    console.log(req.body);
    let costumer = req.body;
    idCounterCostumer += 1
    costumerId = dao.run('INSERT INTO COSTUMER (ID_COSTUMER,NAME_COSTUMER,TYPE_COSTUMER,CITY, COUNTRY) values ($1,$2,$3,$4,$5)',[idCounterCostumer,costumer.name,costumer.type,costumer.city,costumer.country]);
    //ToDo save the client data received in the database
});




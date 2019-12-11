const express = require('express');
const path = require('path');
const cors = require('cors');
const appDAO = require('./main');

const dao = new appDAO('./database.db');
const app = express();

app.listen(8080, () => {
    console.log('Server started on port 8080')
})

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'));
})

app.get('/assets/js/CRM.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, './assets/js/CRM.js'))
})

app.get('/assets/css/index.css', (req, res) => {
    res.sendFile(path.resolve(__dirname, './assets/css/index.css'))
})

app.post('/marketing', (req, res) => {
    console.log('Add marketing campaign');
    console.log(req.body);
    let campaign = req.body;
    campaignId = dao.run('INSERT INTO CAMPAIGN (TYPE_CAMPAIGN,OBJECTIVE_CUSTOMER,DESCRIPTION,START_DATE,FINISH_DATE) values ($1,$2,$3,$4,$5)', [campaign.type, campaign.target, campaign.description, campaign.startDate, campaign.endDate]);
    res.status(200).sendFile(path.resolve(__dirname, './index.html'));
});

app.get('/data', (req, res) => {
    console.log('Load Data');
    var designerData;
    var customerData;
    var designData;
    var orderData;
    var designDesigner;
    var campaign;
    dao.getAll("SELECT * FROM DESIGNER").then(
        (result) => {
            designerData = result;
            dao.getAll("SELECT * FROM CUSTOMER").then(
                (result) => {
                    customerData = result;
                    dao.getAll("SELECT dsn.ID_DESIGN,dsn.VALUE,dsn.DESCRIPTION, dsg.NAME_DESIGNER FROM DESIGN dsn, DESIGNER dsg where dsn.ID_DESIGNER=dsg.ID_DESIGNER").then(
                        (result) => {
                            designData = result;
                            dao.getAll("SELECT  * FROM DESIGN_ORDER do, CUSTOMER c, DESIGNER dsg,DESIGN dsn WHERE do.ID_CUSTOMER=c.ID_CUSTOMER AND do.ID_DESIGN=dsn.ID_DESIGN AND dsg.ID_DESIGNER=dsn.ID_DESIGNER").then(
                                (result) => {
                                    orderData = result;
                                    dao.getAll("select d.NAME_DESIGNER, avg(value) avg_value from DESIGNER d, DESIGN d2 where d.ID_DESIGNER = d2.ID_DESIGNER GROUP BY d.NAME_DESIGNER;").then(
                                        (result) => {
                                            designDesigner = result;
                                            dao.getAll("SELECT * FROM CAMPAIGN").then(
                                                (result) => {
                                                    campaign = result;
                                                    res.status(200).json({
                                                        designers: designerData,
                                                        customers: customerData,
                                                        designs: designData,
                                                        orders: orderData,
                                                        designDesigner: designDesigner,
                                                        campaigns: campaign
                                                    });
                                                }
                                            )
                                        }
                                    )

                                }
                            )

                        }
                    )
                }
            )
        }
    )

})

app.post('/customer', (req, res) => {
    console.log('Add customer');
    console.log(req.body);
    let customer = req.body;
    if (customer.customerType == "user") {
        let budget = Math.floor(Math.random() * 1000) + 100;
        let age = Math.floor(Math.random() * 55) + 18;
        customerId = dao.run('INSERT INTO CUSTOMER (NAME_CUSTOMER,CITY, COUNTRY, CUSTOMER_AGE, BUDGET) values ($1,$2,$3,$4,$5)', [customer.name, customer.city, customer.country, age, budget]);
    } else {
        customerId = dao.run('INSERT INTO DESIGNER (NAME_DESIGNER,NUMBER_OF_DESIGNS,CITY, COUNTRY) values ($1,$2,$3,$4)', [customer.name, 0, customer.city, customer.country]);

    }
    res.status(200).sendFile(path.resolve(__dirname, './index.html'));
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')({ origin: true });

const app = express();
app.use(cors);
app.use(bodyParser.json());

app.post('/insert_prescription', async (request, response) => {
response.send(JSON.stringify(request.body));
});

app.listen(3130,	()	=>	console.log('VIOS tester ready'))
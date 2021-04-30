const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')({ origin: true });
const app = express();
var session = require('express-session');
const mongoose = require('mongoose');
const { response } = require("express");

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
  }));

  const global_static_var = {
    db:null
}

  mongoose.Promise = global.Promise;

  mongoose.connect("mongodb://localhost:27017/Funding-api",function (err,db){
    useNewUrlParser: true
    global_static_var.db = db;
    try{
        app.post('/user/sign-up', async (request, response) => {
            try{
                const firstName = request.body.firstName;
                const lastName = request.body.lastName;
                const middleName = request.body.middleName;
                const phone = request.body.phone;
                const email = request.body.email;
                const address = request.body.address;
                const user_name = request.body.user_name;
                const password = request.body.password;
                const farmer = request.body.farmer;
                const investor = request.body.investor;
                const consultant = request.body.consultant;

                const query = {email:email,user_name:user_name};
                node = db.collection("users").findOne(query,{projection:{nodeIP:1}},function (err,result){
                    try{
                        if(result == null){
                        
                            const data = {
                                firstName: firstName,
                                lastName: lastName,
                                middleName: middleName,
                                phone: phone,
                                email: email,
                                address: address,
                                user_name: user_name,
                                password: password,
                                farmer: farmer,
                                investor: investor,
                                consultant: consultant
                            };
    
                            db.collection("users").insertOne(data, function(err, res) {
                                if (err) throw err;
                                 request.session.email = email;
                                 response.send(res);
                            });
    
                        }else{
                            response.send("Username or Email already exsist");
                        }
                    }catch(e){
                        response.send("Erro checking DB"+e);
                    }
                    
                });

            }catch(e){
                response.send("Erro geting posts");
            }
        });
        app.post('/user/login', async (request, response) => {
            try{
                const email = request.body.email;
                const password = request.body.password;

                const query = {email:email,password:password};
                node = db.collection("users").findOne(query,{projection:{nodeIP:1}},function (err,result){
                    try{
                        if(result == null){
                        
                            request.session.email = email;
                            response.send(res);
    
                        }else{
                            response.send("Username or Email already exsist");
                        }
                    }catch(e){
                        response.send("Erro checking DB"+e);
                    }
                    
                });

            }catch(e){
                response.send("Erro geting posts");
            }
        });
        app.post('/newFundRequest', async (request, response) => {
            try{
                const projectName = request.body.projectName;
                const subTitle = request.body.subTitle;
                const amountNeeded = request.body.amountNeeded;
                const aboutProject = request.body.aboutProject;
                const itemsNeeded = request.body.itemsNeeded;

                            const data = {
                                projectName: projectName,
                                subTitle: subTitle,
                                amountNeeded: amountNeeded,
                                aboutProject: aboutProject,
                                itemsNeeded: itemsNeeded,
                                email: request.session.email
                            };
    
                            db.collection("fundsRequest").insertOne(data, function(err, res) {
                                if (err) throw err;
                                 response.send(res);
                            });
    
            }catch(e){
                response.send("Erro geting posts");
            }
        });
        app.get('/get_FundRequests', async (request, response) => {
            // every professional schould have clerance for this operation
            try{

                var staticVars={
                    collectionA: []
                };

                const query = {
                };

                db.collection("fundsRequest").find(query,{projection:{_id:1,projectName:1,subTitle:1,amountNeeded:1,aboutProject:1,itemsNeeded:1,email:1}}).forEach(e => {
                    staticVars.collectionA.push(e);
                }).then(e => {
                    response.send(staticVars.collectionA);
                }).catch(e => {
                    response.send("1100101");
                });

               }catch{
                response.send('1110016');
            }  
            
        });
     
        app.get('/', async (request, response) => {
            response.send(`FARMFUND API V.1.00`);
        });
    }catch(e){
        response.send("Erro connecting to DB")
    }
       });

    

    app.listen(4000,	()	=>	console.log('FARMFUND API ready'))
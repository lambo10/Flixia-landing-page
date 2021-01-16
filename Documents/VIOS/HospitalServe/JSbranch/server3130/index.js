const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')({ origin: true });

const app = express();
const dbConfig = require('../../config/database.config.js');
const mongoose = require('mongoose');
const fs = require('fs');
const instiConfig = require('../../config/instiConfig.js');
const multer = require('multer');

mongoose.Promise = global.Promise;

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(express.urlencoded());
const full_name_of_institution = instiConfig.institution_name;
const name_of_institution = instiConfig.institution_Abrivation;
const global_static_var = {
    db:null
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'HospitalServe/uploadFormImg')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'_'+file.originalname)
    }
  })
   
  var upload = multer({ storage: storage }).array('file',1);

  
  
mongoose.connect(dbConfig.url,function (err,db){
    useNewUrlParser: true
    if (err) throw err;
    global_static_var.db = db;
    app.get('/get_doctors_logedin_id', async (request, response) => {
        try{
            const cleranceLevel = ["Record_manager"];
        const query = {job:"Doctor"};
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
    
                            db.collection("session_log").find(query,{projection:{_id:0,data:1,first_name:1,last_name:1}}).forEach(e => {
                                e.Shift = get_shifts(e._id);
                                e.Asg_patients = get_no_assigned_patients(e._id);
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                response.send(staticVars.collectionA);
                            }).catch(e => {
                                response.send("1100101");
                            });
        
                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });   
        }catch{
            response.send('1110016');
        }
        
    });
    app.get('/get_pharmacist_logedin_id', async (request, response) => {
        try{
            const cleranceLevel = ["Record_manager"];
        const query = {job:"Pharmacist"};
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
    
                            db.collection("session_log").find(query,{projection:{_id:0,data:1,first_name:1,last_name:1}}).forEach(e => {
                                e.Shift = get_shifts(e._id);
                                e.Asg_patients = get_no_assigned_patients(e._id);
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                response.send(staticVars.collectionA);
                            }).catch(e => {
                                response.send("1100101");
                            });
        
                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });   
        }catch{
            response.send('1110016');
        }
        
    });
    app.get('/get_lab_logedin_id', async (request, response) => {
        try{
            const cleranceLevel = ["Record_manager"];
        const query = {job:"LabScientist"};
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
    
                            db.collection("session_log").find(query,{projection:{_id:0,data:1,first_name:1,last_name:1}}).forEach(e => {
                                e.Shift = get_shifts(e._id);
                                e.Asg_patients = get_no_assigned_patients(e._id);
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                response.send(staticVars.collectionA);
                            }).catch(e => {
                                response.send("1100101");
                            });
        
                        }else{
                            response.send('1110013');
                        }
                    }
    
                });
            }
        });   
        }catch{
            response.send('1110016');
        }
        
    });

    app.get('/get_radiologist_logedin_id', async (request, response) => {
        try{
            const cleranceLevel = ["Record_manager"];
        const query = {job:"Radiologist"};
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
    
                            db.collection("session_log").find(query,{projection:{_id:0,data:1,first_name:1,last_name:1}}).forEach(e => {
                                e.Shift = get_shifts(e._id);
                                e.Asg_patients = get_no_assigned_patients(e._id);
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                response.send(staticVars.collectionA);
                            }).catch(e => {
                                response.send("1100101");
                            });
        
                        }else{
                            response.send('1110013');
                        }
                    }
    
                });
            }
        });   
        }catch{
            response.send('1110016');
        }
        
    });

    app.get('/assign_patient', async (request, response) => {
        try{
            const professional_ID = request.query["professional_ID"];
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            opQuerry1 = {_id: mongoose.Types.ObjectId(usrID)};
                            db.collection("patient_profile").findOne(opQuerry1,{projection:{_id:0,first_name:1,last_name:1}}, function(err3,result3){
                                if (err3) throw response.send("1110012");
                                if(result3 == null){
                                    response.send("1110014");
                                }else{
                                    var user_name = result3.first_name+" "+result3.last_name;
                                opQuerry2 = {_id: mongoose.Types.ObjectId(professional_ID)};
                                db.collection("employee_profile").findOne(opQuerry2,{projection:{_id:0,first_name:1,last_name:1,job:1}}, function(err4,result4){
                                if (err4) throw response.send("1110012");
                                if(result4 == null){
                                    response.send("1110015");
                                }else{
                                    var prof_name = result4.first_name+" "+result4.last_name;
                                    var assigned_by_name = result2.first_name +" "+result2.last_name;
                                    var currentDate = new Date();

                                    var date = currentDate.getDate();
                                    var month = currentDate.getMonth();
                                    var year = currentDate.getFullYear();

                                    var dateString = date + "-" +(month + 1) + "-" + year;

                                    var today = new Date();
                                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                                    var insertionDoc = { name: user_name, usrID: usrID, age: result4.age, gender: result4.gender, professional_name: prof_name, professional_ID: professional_ID,professional_job: result4.job, assigned_by_name:assigned_by_name, assigned_by_ID:JSON.parse(result2.data).$oid, date: dateString, time: time};
                                    db.collection("assign").insertOne(insertionDoc, function(err, res) {
                                        if (err) throw err;
                                        response.send("11111");
                                    });

                                }
                            });

                                }
                            });
        
                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });


    app.get('/check_if_p_is_assigned', async (request, response) => {
        try{
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
        
                            opQuerry1 = {usrID:usrID};
                            db.collection("assign").findOne(opQuerry1,{projection:{_id:0}}, function(err3,result3){
                                if (err3) throw response.send("1110012");
                                if(result3 == null){
                                    response.send("1110014");
                                }else{
                                    response.send("11111");
                                }
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });

    app.get('/get_assigned_details', async (request, response) => {
        try{
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
        
                            opQuerry1 = {usrID:usrID};
                            db.collection("assign").findOne(opQuerry1,{projection:{_id:0}}, function(err3,result3){
                                if (err3) throw response.send("1110012");
                                if(result3 == null){
                                    response.send("1110014");
                                }else{
                                    response.send(result3);
                                }
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });

    app.get('/search_patient', async (request, response) => {
        try{
            const cleranceLevel = ["Record_manager","Doctor","Pharmacist"];
            const tosearch = request.query["tosearch"];
            const skip = request.query["skip"];
        const staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            if(skip == ""){
                                const query = {$text:{$search:tosearch}}
                                db.collection("patient_profile").find(query,{projection:{_id:1,first_name:1,last_name:1,middle_name:1,age:1,gender:1,email:1,phone_no:1}}).limit(5).forEach(e => {
                                    staticVars.collectionA.push(e);
                                }).then(e => {
                                    response.send(staticVars.collectionA);
                                }).catch(e => {
                                    response.send("1100101");
                                });
                            }else{
                                const query = {$text:{$search:tosearch}}
                                db.collection("patient_profile").find(query,{projection:{_id:1,first_name:1,last_name:1,middle_name:1,age:1,gender:1,email:1,phone_no:1}}).skip(parseInt(skip)).limit(5).forEach(e => {
                                    staticVars.collectionA.push(e);
                                }).then(e => {
                                    response.send(staticVars.collectionA);
                                }).catch(e => {
                                    response.send("1100101");
                                });
                            }
        
                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });   
        }catch{
            response.send('1110016');
        }
        
    });

    app.get('/dispense_drug', async (request, response) => {
        try{
            const cleranceLevel = ["Pharmacist"];
            const dispense_string = request.query["data"];
            const usrID = request.query["patient_id"];
        const staticVars={
            dispenseCollection: [],
            numberOfDrugs_t_dispe:0
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                           dispensed_drugs = JSON.parse(dispense_string);
                           dispensed_drugs.forEach(e => {
                            drug_query = {_id: mongoose.Types.ObjectId(e.id)}
                            db.collection("drugs").findOne(drug_query, {projection:{_id:1,name:1,price:1,quantity:1}},function(opErr,opRes){
                                if(opRes == null){
                                }else{
                                    if(parseInt(e.price) == (parseInt(opRes.price)*e.quantity)){
                                        staticVars.numberOfDrugs_t_dispe += parseInt(e.quantity);
                                    new_drugQuantity =  parseInt(opRes.quantity) - parseInt(e.quantity);
                                    if(new_drugQuantity < 0){
                                    }else{
                                        queryPatient = {_id: mongoose.Types.ObjectId(usrID)};
                                        db.collection("patient_profile").findOne(queryPatient,{projection:{_id:0,first_name:1,last_name:1,phone_no:1,age:1,home_address:1,gender:1,patientno:1}}, function(opErr3,opRes3){
                                            if (opErr3) throw response.send("1110012");
                                            if(opRes3 == null){
                                                response.send("1110014");
                                            }else{
                                        var currentDate = new Date();
                                        var date = currentDate;
                                        dispens_doc = {
                                            DrugID: opRes._id.toString(),
                                            DrugName: opRes.name,
                                            Price_per_drug: opRes.price,
                                            Quantity: e.quantity,
                                            Cost: (opRes.price * e.quantity),
                                            Date: date,
                                            Patient_name: opRes3.first_name+" "+opRes3.last_name
                                        }
                                        db.collection("dispensing_log").insertOne(dispens_doc,function(opErr2,opRes2){
                                            if (opErr2) throw opErr2;
                                        upQuery = {_id: mongoose.Types.ObjectId(opRes._id)}
                                        newUPvalue = {$set:{quantity:(parseInt(opRes.quantity) - parseInt(staticVars.numberOfDrugs_t_dispe))}}
                                        db.collection("drugs").updateOne(upQuery,newUPvalue,function(upErr2,upRes2){
                                            staticVars.dispenseCollection.push(dispens_doc);
                                            //
                                            
                                            if(staticVars.dispenseCollection.length >= dispensed_drugs.length){
                                                insurQuery = {usrID: usrID};
                                            db.collection("user_insurance").findOne(insurQuery,{projection:{_id:0,name:1,address:1,NHIS_NO:1,HMO_NO:1,tel_fax:1}}, function(opErr3s,opRes3s){
                                                if (opErr3s) throw response.send("1110012");
                                                usr_dispens_doc = {};
                                                if(opRes3s == null){
                                                    usr_dispens_doc = {
                                                        usrID:usrID,
                                                        name:opRes3.first_name+" "+opRes3.last_name,
                                                        phone_no: opRes3.phone_no,
                                                        home_address: opRes3.home_address,
                                                        gender: opRes3.gender,
                                                        patientno: opRes3.patientno,
                                                        insti_name: "",
                                                        indti_address: "",
                                                        insti_HMO_NO: "",
                                                        insti_NHIS_NO: "",
                                                        insti_tel_fax: "",
                                                        date: date,
                                                        drugs: staticVars.dispenseCollection
                                                    };
                                                }else{
                                                    usr_dispens_doc = {
                                                        usrID:usrID,
                                                        name:opRes3.first_name+" "+opRes3.last_name,
                                                        phone_no: opRes3.phone_no,
                                                        home_address: opRes3.home_address,
                                                        gender: opRes3.gender,
                                                        patientno: opRes3.patientno,
                                                        insti_name: opRes3s.name,
                                                        indti_address: opRes3s.address,
                                                        insti_HMO_NO: opRes3s.HMO_NO,
                                                        insti_NHIS_NO: opRes3s.NHIS_NO,
                                                        insti_tel_fax: opRes3s.tel_fax,
                                                        drugs: staticVars.dispenseCollection
                                                    };
                                                }
                
                                                db.collection("dispensed_drugs").insertOne(usr_dispens_doc,function(opErr4,opRes4){
                                                 if (opErr4) throw opErr4;
                                                 split_inserted_txt = dispense_string.substr(0,100);
                                                 opQuerry1 = {_id: mongoose.Types.ObjectId(usrID)};
                                                 db.collection("patient_profile").findOne(opQuerry1,{projection:{_id:0,first_name:1,last_name:1}}, function(err3,result3){
         
                                                     const insertion_doc = {
                                                         usrID:usrID,
                                                         professional_ID:JSON.parse(result2.data).$oid,
                                                         inserted_txt:split_inserted_txt,
                                                         user_name:result3.first_name+" "+result3.last_name,
                                                         type:"Dispanse"
                                                     }
                                                     db.collection("attended_patients").insertOne(insertion_doc,function(err4,result4){
                                                         if (err4) throw  console.log("Erro adding to attended patients");
                                                     });
                                                 
                                                 });
                                                 
                                             });
                                            });
                                                
                                            
                                            }
                                        });
                                        });
                                    }
                                });
                                    }
                                    }
                                }
                            });
                           });
                           
                           response.send("11111");
                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });   
        }catch{
            response.send('1110016');
        }
        
    });

    app.get('/register_patient', async (request, response) => {
        try{
        const first_name = request.query['first_name'];
        const last_name = request.query['last_name'];
        const middle_name = request.query['middle_name'];
        const phone_no = request.query['phone_no'];
        const email = request.query['email'];
        const home_address = request.query['home_address'];
        const date_of_birth = request.query['date_of_birth'];
        const occupation = request.query['occupation'];
        const next_of_kin = request.query['next_of_kin'];
        const department = request.query['department'];
        const patientno = request.query['patientno'];
        const age = request.query['age'];
        const height = request.query['height'];
        const sex = request.query['sex'];
        const allergies = request.query['allergies'];

        const cleranceLevel = ["Record_manager"];
        const staticVars={
            collectionA: [],
            wkr_patient_no: patientno
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){

                            opQuerry3 = {email:email};
                            db.collection("patient_profile").findOne(opQuerry3,{projection:{_id:0}}, function(err4,result4){
                                if (err4) throw response.send("1110012");
                                if(result4 == null){
                                opQuerry4 = {patientno:patientno};
                                db.collection("patient_profile").findOne(opQuerry4,{projection:{_id:0}}, function(err4,result5){
                                    if (err4) throw response.send("1110012");
                                    if(result5 == null){
                                        var currentDate = new Date();
                                        var date = currentDate.getDate();
                                        var month = currentDate.getMonth();
                                        var year = currentDate.getFullYear();
    
                                        var dateString = date + "-" +(month + 1) + "-" + year;
    
                                        var today = new Date();
                                        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                                        //Generate patientno if empty ---- Generation should ba according to institutions pathern
                                        if(staticVars.wkr_patient_no == ""){
                                            staticVars.wkr_patient_no = name_of_institution+"/"+date + (month + 1) + year+today.getHours() + today.getMinutes() + today.getSeconds()+"/"+Math.round((Math.random()*10)*(Math.random()*10));
                                        }
                                        var em_prof_row = {first_name:first_name,
                                            last_name:last_name, 
                                            middle_name:middle_name,
                                            phone_no:phone_no,
                                            email:email,
                                            home_address:home_address,
                                            password:"",
                                            date_of_birth:date_of_birth,
                                            occupation:occupation,
                                            next_of_kin:next_of_kin,
                                            age:age,
                                            height:height,
                                            sex:sex,
                                            allergies:allergies,
                                            department:department,
                                            patientno:staticVars.wkr_patient_no,
                                            date_registerd: dateString,
                                            time_registerd: time,
                                            who__registerd:result2.data
                                            }
                                            
                                        db.collection("patient_profile").insertOne(em_prof_row, function(err, res) {
                                            if (err) throw err;
                                        const emp_search_json_consNB = {'character':first_name+' '+last_name+' '+middle_name,'id':res.insertedId,'patientno':staticVars.wkr_patient_no,'icon':'http://localhost:4417/patient/'+res.insertedId+'/profile/usr_profile.jpg'}
                                        const emp_search_json_consIDB = {'character':staticVars.wkr_patient_no,'id':res.insertedId,'patientno':first_name+' '+last_name+' '+middle_name,'icon':'http://localhost:4417/patient/'+res.insertedId+'/profile/usr_profile.jpg'}
                                            write_to_patient_sugestions(emp_search_json_consNB,emp_search_json_consIDB);
                                            response.send(res);
                                        });
    
                                    }else{
                                        response.send("100246");
                                    }
                                });
                            }else{
                                response.send("100245");
                            }  
                                

                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/institution_info', async (request, response) => {
        response.send();
    });
    app.get('/get_dispense_log', async (request, response) => {
        try{
        const range1 = request.query["range1"];
        const range2 = request.query["range2"];
        const cleranceLevel = ["Pharmacist"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            query = {
                                Date:{
                                    $gte: new Date(new Date(range1).setHours(00, 00, 00)),
                                    $lt: new Date(new Date(range2).setHours(23, 59, 59))
                                }
                            };
                            const check_collected_doc = {
                                check:false
                            }
                            db.collection("dispensing_log").find(query,{projection:{_id:0,DrugID:1,DrugName:1,Price_per_drug:1,Quantity:1,Cost:1}}).forEach(e => {
                               
                                staticVars.collectionA.forEach(v =>{
                                    if(check_string_equality(v.DrugID,e.DrugID)){
                                        check_collected_doc.check = true;
                                        v.Quantity = parseInt(v.Quantity) + parseInt(e.Quantity);
                                        v.Cost = parseInt(v.Cost) + parseInt(e.Cost);
                                        v.numberOfdrugs++;
                                    }else{
                                        check_collected_doc.check = false;
                                    }
                                });
                                if(!check_collected_doc.check){
                                    e.numberOfdrugs = 1;
                                    staticVars.collectionA.push(e);
                                }
                                
                            }).then(e => {
                                response.send(staticVars.collectionA);
                            }).catch(e => {
                                response.send("1100101");
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_dispense_log_with_id', async (request, response) => {
        try{
        const range1 = request.query["range1"];
        const range2 = request.query["range2"];
        const DrugID = request.query["DrugID"];
        const cleranceLevel = ["Pharmacist"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            query = {
                                Date:{
                                    $gte: new Date(new Date(range1).setHours(00, 00, 00)),
                                    $lt: new Date(new Date(range2).setHours(23, 59, 59))
                                },
                                DrugID:DrugID
                            };
                            db.collection("dispensing_log").find(query,{projection:{_id:0,DrugName:1,Price_per_drug:1,Quantity:1,Cost:1,Date:1,Patient_name:1}}).forEach(e => {
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                response.send(staticVars.collectionA);
                            }).catch(e => {
                                response.send("1100101");
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_drug_with_id', async (request, response) => {
        try{
        const DrugID = request.query["DrugID"];
        const cleranceLevel = ["Pharmacist"];
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            query = {_id: mongoose.Types.ObjectId(DrugID)};
                            db.collection("drugs").findOne(query,{projection:{_id:0,name:1,type:1,price:1,quantity:1,batch_price:1,brand:1,drug_shortage_point:1,strength:1,expDate:1,category:1}},function (operr,opresult){
                                if (operr) throw response.send("1110011");
                                if(opresult == null){
                                    response.send('100101');
                                }else{
                                    response.send(opresult);
                                }
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_drug_shortage', async (request, response) => {
        try{
        const cleranceLevel = ["Pharmacist"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            db.collection("drug_shortages").find({},{projection:{_id:0,name:1,type:1,price:1,quantity:1,brand:1,strength:1,category:1}}).forEach(e => {
                                e.cost = parseInt(e.price) * parseInt(e.quantity);
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                response.send(staticVars.collectionA);
                            }).catch(e => {
                                response.send("1100101");
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_expired_drugs', async (request, response) => {
        try{
        const range1 = request.query["range1"];
        const range2 = request.query["range2"];
        const cleranceLevel = ["Pharmacist"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            query = {
                                expDate:{
                                    $gte: new Date(new Date(range1).setHours(00, 00, 00)),
                                    $lt: new Date(new Date(range2).setHours(23, 59, 59))
                                }
                            };
                            db.collection("expired_drugs").find(query,{projection:{_id:1,name:1,type:1,price:1,quantity:1,batch_price:1,brand:1,strength:1,expDate:1,category:1,batch_number:1}}).forEach(e => {
                                e.cost = e.price * e.quantity;
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                response.send(staticVars.collectionA);
                            }).catch(e => {
                                response.send("1100101");
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_assigned_patients', async (request, response) => {
         // every professional schould have clerance for this operation
        try{
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
        
                            opQuerry1 = {professional_ID:JSON.parse(result2.data).$oid};
                            db.collection("assign").find(opQuerry1,{projection:{_id:1,name:1,usrID:1,age:1,gender:1,assigned:1}}).forEach(e => {
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                response.send(staticVars.collectionA);
                            }).catch(e => {
                                response.send("1100101");
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_patient_d_f_static_vars', async (request, response) => {
        try{
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            opQuerry1 = {_id: mongoose.Types.ObjectId(usrID)};
                            db.collection("patient_profile").findOne(opQuerry1,{projection:{_id:0,first_name:1,last_name:1,phone_no:1,home_address:1,email:1,age:1,height:1,sex:1,allergies:1,patientno:1,occupation:1}}, function(err3,result3){
                                if (err3) throw response.send("1110012");
                                if(result3 == null){
                                    response.send("1110014");
                                }else{
                                   
                            opQuerry2 = {usrID: usrID};
                            db.collection("user_insurance").findOne(opQuerry2,{projection:{_id:0,name:1,address:1,NHIS_NO:1,HMO_NO:1,tel_fax:1}}, function(err4,result4){
                                if (err4) throw response.send("1110012");
                                var currentDate = new Date();
                                        var date = currentDate.getDate();
                                        var month = currentDate.getMonth();
                                        var year = currentDate.getFullYear();
    
                                        var dateString = date + "-" +(month + 1) + "-" + year;
                                        var final_output_json = {};
                                if(result4 == null){
                                    final_output_json = {
                                        p_name: result3.first_name+" "+result3.last_name,
                                        p_address: result3.home_address,
                                        p_phone_no: result3.phone_no,
                                        p_email: result3.email,
                                        p_age: result3.age,
                                        p_height: result3.height,
                                        p_sex: result3.sex,
                                        p_Alerg: result3.allergies,
                                        p_Dept: result3.department,
                                        p_occup: result3.occupation,
                                        p_patient_no: result3.patientno,
                                        doc_name: result2.first_name+" "+result2.last_name,
                                        date: dateString,
                                        insti_name: "",
                                        indti_address: "",
                                        insti_HMO_NO: "",
                                        insti_NHIS_NO: "",
                                        insti_tel_fax: ""
                                    }
                                }else{
                                    final_output_json = {
                                        p_name: result3.first_name+" "+result3.last_name,
                                        p_address: result3.home_address,
                                        p_phone_no: result3.phone_no,
                                        p_gender: result3.gender,
                                        p_age: result3.age,
                                        p_patient_no: result3.patientno,
                                        doc_name: result2.first_name+" "+result2.last_name,
                                        date: dateString,
                                        insti_name: result4.name,
                                        indti_address: result4.address,
                                        insti_HMO_NO: result4.HMO_NO,
                                        insti_NHIS_NO: result4.NHIS_NO,
                                        insti_tel_fax: result4.tel_fax,
                                        _id:usrID
                                    }
                                }
                                response.send(final_output_json);
                            });


                                }
                            });
        
                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/de_assign_all_patients', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            var query_main = {professional_ID:JSON.parse(result2.data).$oid};
                                    db.collection("assign").deleteMany(query_main, function(err, res) {
                                        if (err) throw response.send("110098");
                                        response.send("11111");
                                    });
        
                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/testip', async (request, response) => {
        console.log(request.connection.remoteAddress);
        response.send(getRealIP(request.connection.remoteAddress));
    });
    app.get('/display_users', async (request, response) => {
       db.collection("patient_profile").find({}).toArray(function(err, result) {
        if (err) throw err;
        response.send(result);
      });        
    });
    app.get('/get_r_attended_patients', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
        
                            opQuerry1 = {professional_ID:JSON.parse(result2.data).$oid};
                            db.collection("attended_patients").find(opQuerry1,{projection:{_id:1,usrID:1,inserted_txt:1,user_name:1,type:1}}).forEach(e => {
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                response.send(staticVars.collectionA);
                            }).catch(e => {
                                response.send("1100101");
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/insert_encounterNote', async (request, response) => {
        try{
        const usrName = request.query["usrName"];
        const usrAddress = request.query["usrAddress"];
        const usrAge = request.query["usrAge"];
        const usrSex = request.query["usrSex"];
        const usrPhoneNo = request.query["usrPhoneNo"];
        const usrPatientId = request.query["usrPatientId"];
        const serverDate = request.query["serverDate"];
        const cc = request.query["cc"];
        const hpi = request.query["hpi"];
        const pmh = request.query["pmh"];
        const sh = request.query["sh"];
        const fh = request.query["fh"];
        const ros = request.query["ros"];
        const vs = request.query["vs"];
        const pe = request.query["pe"];
        const labInv = request.query["labInv"];
        const currMed = request.query["currMed"];
        const bodyWeight = request.query["bodyWeight"];
        const height = request.query["height"];
        const bmi = request.query["bmi"];
        const assesment = request.query["assesment"];
        const plan = request.query["plan"];
        const education = request.query["education"];
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Doctor"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            const insertion_doc = {
                                usrName: usrName,
                                usrAddress: usrAddress,
                                usrAge: usrAge,
                                usrSex: usrSex,
                                usrPhoneNo: usrPhoneNo,
                                usrPatientId: usrPatientId,
                                cc:cc,
                                hpi:hpi,
                                pmh:pmh,
                                sh:sh,
                                fh:fh,
                                ros:ros,
                                vs:vs,
                                pe:pe,
                                labInv:labInv,
                                currMed:currMed,
                                bodyWeight:bodyWeight,
                                height:height,
                                bmi:bmi,
                                assesment:assesment,
                                plan:plan,
                                education:education,
                                usrID:usrID,
                                doctor:result2.first_name+" "+result2.last_name,
                                date:serverDate
                            }
                            db.collection("encounterNotes").insertOne(insertion_doc,function(err3,result3){
                                if (err3) throw err3;
                                deassign_set_rAttended_to(usrID,result2.data,"Took Encounter Note","Encounter Note")
                                response.send("11111");
                            });
                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/add_new_batch', async (request, response) => {
        try{
        const price = request.query["price"];
        const quantity = request.query["quantity"];
        const drug_shortage_point = request.query["drug_shortage_point"];
        const batch_price = request.query["batch_price"];
        const brand = request.query["brand"];
        const strength = request.query["strength"];
        const expDate = request.query["expDate"];
        const DrugID = request.query["DrugID"];

        const cleranceLevel = ["Pharmacist"];
        const staticVars={
            count: 0
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            upQuery = {_id: mongoose.Types.ObjectId(DrugID)}
                            loged_in_session = db.collection("drugs").findOne(upQuery,{projection:{name:1,type:1,category:1,quantity:1}}, function(operr1,opresult1){
                                if (operr1) throw response.send("1110012");
                                if(opresult1 == null){
                                    response.send("1110012");
                                }else{
                                    newUPvalue = {$set:{
                                        price:price,
                                        quantity:(parseInt(quantity) + parseInt(opresult1.quantity)),
                                        drug_shortage_point:drug_shortage_point,
                                        batch_price:batch_price,
                                        brand:brand,
                                        strength:strength,
                                        expDate:new Date(expDate)
                                    }}
                            db.collection("drugs").updateOne(upQuery,newUPvalue,function(upErr2,upRes2){
                                const opQuerry1 = {DrugID:DrugID}
                                db.collection("drugs_batch").find(opQuerry1,{projection:{name:1}}).forEach(e => {
                                    staticVars.count++
                                }).then(e => {
                                    
                                    insertion_doc = {
                                        name:opresult1.name,
                                        type:opresult1.type,
                                        category:opresult1.category,
                                        price:price,
                                        quantity:quantity,
                                        drug_shortage_point:drug_shortage_point,
                                        batch_price:batch_price,
                                        brand:brand,
                                        strength:strength,
                                        expDate:new Date(expDate),
                                        DrugID:DrugID,
                                        batch_number:(staticVars.count + 1),
                                        expired_flag:0
                                    }
                                    db.collection("drugs_batch").insertOne(insertion_doc,function(err3,result3){
                                        if (err3) throw response.send("110011");
                                        
                                        response.send("11111");
                                    });

                                }).catch(e => {
                                    response.send("1100101");
                                });
    
                               

                            });
                                }
                                });
                            

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/add_drug_adjustment', async (request, response) => {
        try{
        const name = request.query["name"];
        const type = request.query["type"];
        const category = request.query["category"];
        const price = request.query["price"];
        const quantity = request.query["quantity"];
        const drug_shortage_point = request.query["drug_shortage_point"];
        const batch_price = request.query["batch_price"];
        const brand = request.query["brand"];
        const strength = request.query["strength"];
        const expDate = request.query["expDate"];
        const DrugID = request.query["DrugID"];

        const cleranceLevel = ["Pharmacist"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            upQuery = {_id: mongoose.Types.ObjectId(DrugID)}
                            loged_in_session = db.collection("drugs").findOne(upQuery,{projection:{name:1,type:1,category:1,quantity:1}}, function(operr1,opresult1){
                                if (operr1) throw response.send("1110012");
                                if(opresult1 == null){
                                    response.send("1110012");
                                }else{
                                    newUPvalue = {$set:{
                                        name:name,
                                        type:type,
                                        category:category,
                                        price:price,
                                        quantity:(parseInt(quantity) + parseInt(opresult1.quantity)),
                                        drug_shortage_point:drug_shortage_point,
                                        batch_price:batch_price,
                                        brand:brand,
                                        strength:strength,
                                        expDate:new Date(expDate)
                                    }}
                            db.collection("drugs").updateOne(upQuery,newUPvalue,function(upErr2,upRes2){
                                response.send("11111");
                            });
                                }
                                });
                            

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/add_losses', async (request, response) => {
        try{
        const no_of_losses = request.query["no_of_losses"];
        const causes = request.query["causes"];
        const DrugID = request.query["DrugID"];

        const cleranceLevel = ["Pharmacist"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            upQuery = {_id: mongoose.Types.ObjectId(DrugID)}
                            loged_in_session = db.collection("drugs").findOne(upQuery,{projection:{name:1,type:1,category:1,quantity:1,price:1,brand:1,strength:1,expDate:1}}, function(operr1,opresult1){
                                if (operr1) throw response.send("1110012");
                                if(opresult1 == null){
                                    response.send("1110012");
                                }else{
                                    subtracted_quantity = (parseInt(opresult1.quantity) - parseInt(no_of_losses));
                                    newUPvalue = {$set:{
                                        quantity:subtracted_quantity
                                    }}
                                    if(subtracted_quantity < 0){
                                        response.send("11008");
                                    }else{
                                        db.collection("drugs").updateOne(upQuery,newUPvalue,function(upErr2,upRes2){
                                            insertion_doc = {
                                                name:opresult1.name,
                                                type:opresult1.type,
                                                category:opresult1.category,
                                                price:opresult1.price,
                                                quantity:opresult1.quantity,
                                                brand:opresult1.brand,
                                                strength:opresult1.strength,
                                                expDate:new Date(opresult1.expDate),
                                                date:new Date(),
                                                no_of_losses:parseInt(no_of_losses),
                                                causes:causes
                                            }
                                            db.collection("drug_losses").insertOne(insertion_doc,function(err3,result3){
                                                if (err3) throw response.send("110011");
            
                                                response.send("11111");
                                            });
                                        });
                                    }
                            
                                }
                                });
                            

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/remove_expired_drug', async (request, response) => {
        try{
        const batchID = request.query["batchID"];

        const cleranceLevel = ["Pharmacist"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            upQuery = {_id: mongoose.Types.ObjectId(batchID)}
                            db.collection("expired_drugs").findOne(upQuery,{projection:{quantity:1,DrugID:1}}, function(operr1,opresult1){
                                if (operr1) throw response.send("1110012");
                                if(opresult1 == null){
                                    response.send("1110012");
                                }else{
                                    const upQuery2 = {_id: mongoose.Types.ObjectId(opresult1.DrugID)}
                                    db.collection("drugs").findOne(upQuery2,{projection:{quantity:1}}, function(operrs2,opresults2){
                                    subtracted_quantity = (parseInt(opresults2.quantity) - parseInt(opresult1.quantity));
                                    newUPvalue = {$set:{
                                        quantity:subtracted_quantity
                                    }}
                                    if(subtracted_quantity < 0){
                                        response.send("11008");
                                    }else{
                                        db.collection("expired_drugs").deleteOne(upQuery,function(operr2,opresult2){
                                            if (operr2) throw response.send("111017");
                                            db.collection("drugs").updateOne(upQuery2,newUPvalue,function(upErr2,upRes2){
                                                response.send("11111");
                                            });
                                        });
                                    }
                                });
                                    
                                 }
                                });
                            

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/add_to_poision_log', async (request, response) => {
        try{
        const DrugID = request.query["DrugID"];

        const cleranceLevel = ["Pharmacist"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            upQuery = {_id: mongoose.Types.ObjectId(DrugID)}
                            db.collection("drugs").findOne(upQuery,{projection:{_id:1,name:1,type:1,category:1,quantity:1,price:1,brand:1,strength:1}}, function(operr1,opresult1){
                                if (operr1) throw response.send("1110012");
                                if(opresult1 == null){
                                    response.send("1110018");
                                }else{
                                    db.collection("poison_log").insertOne(opresult1,function(err3,result3){
                                        if (err3) throw response.send("110011");
    
                                        response.send("11111");
                                    });
                                }
                                });
                            

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/remove_from_poision_log', async (request, response) => {
        try{
        const DrugID = request.query["DrugID"];

        const cleranceLevel = ["Pharmacist"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            upQuery = {_id: mongoose.Types.ObjectId(DrugID)}
                            db.collection("poison_log").deleteOne(upQuery,function(operr1,opresult1){
                                if (operr1) throw response.send("1110012");
                                response.send("11111");
                                });
                            

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_poision_log', async (request, response) => {
        try{
        const cleranceLevel = ["Pharmacist"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            
                                db.collection("poison_log").find().forEach(e => {
                                    e.cost = parseInt(e.price) * parseInt(e.quantity);
                                    staticVars.collectionA.push(e);
                                }).then(e => {
                                    response.send(staticVars.collectionA);
                                }).catch(e => {
                                    response.send("1100101");
                                });
                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_drug_batches', async (request, response) => {
        try{
        const DrugID = request.query["DrugID"];
        const cleranceLevel = ["Pharmacist"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            upQuery = {DrugID:DrugID}
                                db.collection("drugs_batch").find(upQuery).forEach(e => {
                                    staticVars.collectionA.push(e);
                                }).then(e => {
                                    response.send(staticVars.collectionA);
                                }).catch(e => {
                                    response.send("1100101");
                                });
                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_drug_losses', async (request, response) => {
        try{
        const range1 = request.query["range1"];
        const range2 = request.query["range2"];
        const cleranceLevel = ["Pharmacist"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            query = {
                                date:{
                                    $gte: new Date(new Date(range1).setHours(00, 00, 00)),
                                    $lt: new Date(new Date(range2).setHours(23, 59, 59))
                                }
                            };
                                db.collection("drug_losses").find(query).forEach(e => {
                                    e.cost = parseInt(e.price) * parseInt(e.quantity);
                                    staticVars.collectionA.push(e);
                                }).then(e => {
                                    response.send(staticVars.collectionA);
                                }).catch(e => {
                                    response.send("1100101");
                                });
                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.post('/add_raw_form', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const clerance = request.body.clerance;
        const rawForm = request.body.rawForm;
        const category = request.body.category;
        const formName = request.body.form_name;

        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            if(clerance === result2.job){
                                newvalue = {
                                    clerance:clerance,
                                    category:category,
                                    rawForm:rawForm,
                                    formName:formName,
                                    date:new Date(),
                                    created_by:result2.data
                                }
                                db.collection("forms").insertOne(newvalue,function(opErr4,opRes4){
                                    if (opErr4) throw opErr4;
                                    response.send("11111");
                                });
                            }else{
                                response.send("10028");
                            }
                            

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_professionals_job', async (request, response) => {
        // every professional schould have clerance for this operation
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager","Admin_Manager"];
        try{
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            response.send(result2.job);
                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_formsName_ID', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            
                            opQuerry1 = {clerance:result2.job};
                            db.collection("forms").find(opQuerry1,{projection:{_id:1,formName:1,category:1}}).forEach(e => {
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                response.send(staticVars.collectionA);
                            }).catch(e => {
                                response.send("1100101");
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_raw_form', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const formID = request.query["formID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            
                            opQuerry1 = {_id: mongoose.Types.ObjectId(formID)};
                            db.collection("forms").findOne(opQuerry1,{projection:{rawForm:1}}, function(opErr,opRes){
                                if (opErr) throw response.send("1110101");
                                response.send(opRes);
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_latest_prescription', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            
                            query = {
                                usrID:usrID
                            };

                            

                            db.collection("Prescription").find(query,{projection:{_id:1,date:1,disp_data:1}}).sort({_id: -1}).limit(1).forEach(e => {
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                if(staticVars.collectionA.hasOwnProperty("userPermission")){
                                    if(staticVars.collectionA[0].userPermission == true){
                                        response.send(staticVars.collectionA);
                                    }else{
                                        response.send("90923");
                                    }
                                }else{
                                    response.send(staticVars.collectionA);
                                }
                            }).catch(e => {
                                response.send("1100101");
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.post('/add_form_op_data', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const category = request.body.category;
        const data = request.body.data;
        const formID = request.body.formID;
        const usrID = request.body.usrID;

        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                           if(formID === "11111"){
                                newvalue = {
                                    formID:formID,
                                    data:data,
                                    usrID:usrID,
                                    date:new Date()
                                }
                                db.collection("operation_"+category).insertOne(newvalue,function(opErr4,opRes4){
                                    if (opErr4) throw opErr4;

                                    let split_inserted_txt = data.substr(0, 100);
                                    opQuerry1 = {_id: mongoose.Types.ObjectId(usrID)};
                                    db.collection("patient_profile").findOne(opQuerry1,{projection:{_id:0,first_name:1,last_name:1}}, function(err3,result3){

                                        const insertion_doc = {
                                            usrID:usrID,
                                            professional_ID:JSON.parse(result2.data).$oid,
                                            inserted_txt:split_inserted_txt,
                                            user_name:result3.first_name+" "+result3.last_name,
                                            type:category
                                        }
                                        db.collection("attended_patients").insertOne(insertion_doc,function(err4,result4){
                                            if (err4) throw  console.log("Erro adding to attended patients");
                                        });
                                    
                                    });

                                    response.send("11111");
                                });
                           }else{
                            queryOPR = {_id: mongoose.Types.ObjectId(formID)};
                                db.collection("forms").findOne(queryOPR,{projection:{clerance:1,formName:1}},function(err5,result5){
                                    if (err5) throw response.send("1110012");
                                    if(result5.clerance === result2.job){
                                        newvalue = {
                                            formID:formID,
                                            data:data,
                                            usrID:usrID,
                                            date:new Date()
                                        }
                                        db.collection("operation_"+category).insertOne(newvalue,function(opErr4,opRes4){
                                            if (opErr4) throw opErr4;

                                            let split_inserted_txt = data.substr(0, 100);
                                            opQuerry1 = {_id: mongoose.Types.ObjectId(usrID)};
                                            db.collection("patient_profile").findOne(opQuerry1,{projection:{_id:0,first_name:1,last_name:1}}, function(err3,result3){
    
                                                const insertion_doc = {
                                                    usrID:usrID,
                                                    professional_ID:JSON.parse(result2.data).$oid,
                                                    inserted_txt:split_inserted_txt,
                                                    user_name:result3.first_name+" "+result3.last_name,
                                                    type:result5.formName
                                                }
                                                db.collection("attended_patients").insertOne(insertion_doc,function(err4,result4){
                                                    if (err4) throw  console.log("Erro adding to attended patients");
                                                });
                                            
                                            });

                                            response.send("11111");
                                        });
                                    }else{
                                        response.send("1110078");
                                    }
                                });
                           }
                                
                            

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.post('/add_form_disp_data', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const category = request.body.category;
        const disp_data = request.body.disp_data;
        const formID = request.body.formID;
        const usrID = request.body.usrID;

        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            if(formID === "11111"){
                                const date = new Date();
                                        newvalue = {
                                            formID:formID,
                                            disp_data:disp_data,
                                            usrID:usrID,
                                            date:date
                                        }
                                        db.collection(category).insertOne(newvalue,function(opErr4,opRes4){
                                            if (opErr4) throw opErr4;
                                            add_to_full_rec_index(newvalue._id,usrID,category,date);
                                            response.send("11111");
                                        });
                            }else{
                                queryOPR = {_id: mongoose.Types.ObjectId(formID)};
                                db.collection("forms").findOne(queryOPR,{clerance:1},function(err5,result5){
                                    if (err5) throw response.send("1110012");
                                    if(result5.clerance === result2.job){
                                        const date = new Date();
                                        newvalue = {
                                            formID:formID,
                                            disp_data:disp_data,
                                            usrID:usrID,
                                            date:date
                                        }
                                        db.collection(category).insertOne(newvalue,function(opErr4,opRes4){
                                            if (opErr4) throw opErr4;
                                            add_to_full_rec_index(newvalue._id,usrID,category,date);
                                            response.send("11111");
                                        });
                                    }else{
                                        response.send("1110078");
                                    }
                                });
                                
                        }
                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });

    app.get('/get_disp_radiograph_dateTime', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            
                            query = {
                                usrID:usrID
                            };

                            db.collection("Radiograph").find(query,{projection:{_id:1,date:1}}).forEach(e => {
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                response.send(staticVars.collectionA);
                            }).catch(e => {
                                response.send("1100101");
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_latest_disp_radiograph_dateTime', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            
                            query = {
                                usrID:usrID
                            };

                            

                            db.collection("Radiograph").find(query,{projection:{_id:1,date:1,disp_data:1}}).sort({_id: -1}).limit(1).forEach(e => {
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                if(staticVars.collectionA.hasOwnProperty("userPermission")){
                                    if(staticVars.collectionA[0].userPermission == true){
                                        response.send(staticVars.collectionA);
                                    }else{
                                        response.send("90923");
                                    }
                                }else{
                                    response.send(staticVars.collectionA);
                                }
                            }).catch(e => {
                                response.send("1100101");
                            });

                            

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
   
    app.get('/get_latest_radiograph', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            
                            query = {
                                usrID:usrID
                            };
                            
                            db.collection("Radiograph").find(query,{projection:{_id:1,date:1,disp_data:1}}).sort({_id: -1}).limit(1).forEach(e => {
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                if(staticVars.collectionA.hasOwnProperty("userPermission")){
                                    if(staticVars.collectionA[0].userPermission == true){
                                        response.send(staticVars.collectionA);
                                    }else{
                                        response.send("90923");
                                    }
                                }else{
                                    response.send(staticVars.collectionA);
                                }
                            }).catch(e => {
                                response.send("1100101");
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_radiograph_with_id', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const DocID = request.query["DocID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            query = {_id: mongoose.Types.ObjectId(DocID)};
                            db.collection("Radiograph").findOne(query,{projection:{disp_data:1,date:1}},function (operr,opresult){
                                if (operr) throw response.send("1110011");
                                if(opresult == null){
                                    response.send('100101');
                                }else{
                                    response.send(opresult);
                                }
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });

    app.get('/get_disp_Lab_dateTime', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            
                            query = {
                                usrID:usrID
                            };

                            db.collection("Lab").find(query,{projection:{_id:1,date:1}}).forEach(e => {
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                response.send(staticVars.collectionA);
                            }).catch(e => {
                                response.send("1100101");
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_latest_Lab', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            
                            query = {
                                usrID:usrID
                            };
                            
                            db.collection("Lab").find(query,{projection:{_id:1,date:1,disp_data:1}}).sort({_id: -1}).limit(1).forEach(e => {
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                if(staticVars.collectionA.hasOwnProperty("userPermission")){
                                    if(staticVars.collectionA[0].userPermission == true){
                                        response.send(staticVars.collectionA);
                                    }else{
                                        response.send("90923");
                                    }
                                }else{
                                    response.send(staticVars.collectionA);
                                }
                                
                            }).catch(e => {
                                response.send("1100101");
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_Lab_with_id', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const DocID = request.query["DocID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            query = {_id: mongoose.Types.ObjectId(DocID)};
                            db.collection("Lab").findOne(query,{projection:{disp_data:1,date:1}},function (operr,opresult){
                                if (operr) throw response.send("1110011");
                                if(opresult == null){
                                    response.send('100101');
                                }else{
                                    response.send(opresult);
                                    
                                }
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });

    app.get('/get_disp_Prescription_dateTime', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            
                            query = {
                                usrID:usrID
                            };

                            db.collection("Prescription").find(query,{projection:{_id:1,date:1}}).forEach(e => {
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                response.send(staticVars.collectionA);
                            }).catch(e => {
                                response.send("1100101");
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_latest_Prescription', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){

                            query = {
                                usrID:usrID
                            };
                            
                            db.collection("Prescription").find(query,{projection:{_id:1,date:1,disp_data:1}}).sort({_id: -1}).limit(1).forEach(e => {
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                if(staticVars.collectionA.hasOwnProperty("userPermission")){
                                    if(staticVars.collectionA[0].userPermission == true){
                                        response.send(staticVars.collectionA);
                                    }else{
                                        response.send("90923");
                                    }
                                }else{
                                    response.send(staticVars.collectionA);
                                }
                            }).catch(e => {
                                response.send("1100101");
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_Prescription_with_id', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const DocID = request.query["DocID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            query = {_id: mongoose.Types.ObjectId(DocID)};
                            db.collection("Prescription").findOne(query,{projection:{disp_data:1,date:1}},function (operr,opresult){
                                if (operr) throw response.send("1110011");
                                if(opresult == null){
                                    response.send('100101');
                                }else{
                                    response.send(opresult);
                                }
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_prof_and_institu_name', async (request, response) => {
        try{
        // every professional schould have clerance for this operation
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{_id:0,job:1,first_name:1,last_name:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            result2.instiName = full_name_of_institution;
                            result2.fullName = result2.first_name+" "+result2.last_name;
                           response.send(result2);
        
                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });   
        }catch{
            response.send('1110016');
        }
        
    });
    app.post('/add_note_disp_data', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const disp_data = request.body.disp_data;
        const formID = request.body.formID;
        const usrID = request.body.usrID;

        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            const date = new Date();
                            newvalue = {
                                formID:formID,
                                disp_data:disp_data,
                                usrID:usrID,
                                date:date
                            }
                            db.collection("Note").insertOne(newvalue,function(opErr4,opRes4){
                                if (opErr4) throw opErr4;
                                add_to_full_rec_index(newvalue._id,usrID,"Note",date);
                                response.send("11111");
                            });
                                
                            
                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.post('/add_dispenseD_disp_data', async (request, response) => {
        try{
        const disp_data = request.body.disp_data;
        const formID = request.body.formID;
        const usrID = request.body.usrID;

        const cleranceLevel = ["Pharmacist"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            const date = new Date();
                            newvalue = {
                                formID:formID,
                                disp_data:disp_data,
                                usrID:usrID,
                                date:date
                            }
                            db.collection("Dispense").insertOne(newvalue,function(opErr4,opRes4){
                                if (opErr4) throw opErr4;
                                add_to_full_rec_index(newvalue._id,usrID,"Dispense",date);
                                response.send("11111");
                            });
                                
                            
                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });

    app.get('/get_disp_Dispensed_dateTime', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            
                            query = {
                                usrID:usrID
                            };

                            db.collection("Dispense").find(query,{projection:{_id:1,date:1}}).forEach(e => {
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                response.send(staticVars.collectionA);
                            }).catch(e => {
                                response.send("1100101");
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_latest_Dispensed', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const range1 = request.query["range1"];
        const range2 = request.query["range2"];
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            
                            query = {
                                usrID:usrID
                            };
                            
                            db.collection("Dispense").find(query,{projection:{_id:1,date:1,disp_data:1}}).sort({_id: -1}).limit(1).forEach(e => {
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                if(staticVars.collectionA.hasOwnProperty("userPermission")){
                                    if(staticVars.collectionA[0].userPermission == true){
                                        response.send(staticVars.collectionA);
                                    }else{
                                        response.send("90923");
                                    }
                                }else{
                                    response.send(staticVars.collectionA);
                                }
                            }).catch(e => {
                                response.send("1100101");
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_Dispensed_with_id', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const DocID = request.query["DocID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            query = {_id: mongoose.Types.ObjectId(DocID)};
                            db.collection("Dispense").findOne(query,{projection:{disp_data:1,date:1}},function (operr,opresult){
                                if (operr) throw response.send("1110011");
                                if(opresult == null){
                                    response.send('100101');
                                }else{
                                    response.send(opresult);
                                }
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });

    app.get('/get_disp_Note_dateTime', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            
                            query = {
                                usrID:usrID
                            };

                            db.collection("Note").find(query,{projection:{_id:1,date:1}}).forEach(e => {
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                response.send(staticVars.collectionA);
                            }).catch(e => {
                                response.send("1100101");
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_latest_Note', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){

                            query = {
                                usrID:usrID
                            };
                            
                            db.collection("Note").find(query,{projection:{_id:1,date:1,disp_data:1}}).sort({_id: -1}).limit(1).forEach(e => {
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                if(staticVars.collectionA.hasOwnProperty("userPermission")){
                                    if(staticVars.collectionA[0].userPermission == true){
                                        response.send(staticVars.collectionA);
                                    }else{
                                        response.send("90923");
                                    }
                                }else{
                                    response.send(staticVars.collectionA);
                                }
                            }).catch(e => {
                                response.send("1100101");
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_Note_with_id', async (request, response) => {
         // every professional schould have clerance for this operation
        try{
        const DocID = request.query["DocID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            query = {_id: mongoose.Types.ObjectId(DocID)};
                            db.collection("Note").findOne(query,{projection:{disp_data:1,date:1}},function (operr,opresult){
                                if (operr) throw response.send("1110011");
                                if(opresult == null){
                                    response.send('100101');
                                }else{
                                    response.send(opresult);
                                }
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });

    app.get('/get_disp_Ecounter_Note_dateTime', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            
                            query = {
                                usrID:usrID
                            };
    
                            db.collection("Encounter_Note").find(query,{projection:{_id:1,date:1}}).forEach(e => {
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                response.send(staticVars.collectionA);
                            }).catch(e => {
                                response.send("1100101");
                            });
    
                        }else{
                            response.send('1110013');
                        }
                    }
    
                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_latest_Ecounter_Note', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){

                            query = {
                                usrID:usrID
                            };
                            
                            db.collection("Encounter_Note").find(query,{projection:{_id:1,date:1,disp_data:1}}).sort({_id: -1}).limit(1).forEach(e => {
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                if(staticVars.collectionA.hasOwnProperty("userPermission")){
                                    if(staticVars.collectionA[0].userPermission == true){
                                        response.send(staticVars.collectionA);
                                    }else{
                                        response.send("90923");
                                    }
                                }else{
                                    response.send(staticVars.collectionA);
                                }
                            }).catch(e => {
                                response.send("1100101");
                            });
    
                        }else{
                            response.send('1110013');
                        }
                    }
    
                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    app.get('/get_Ecounter_Note_with_id', async (request, response) => {
         // every professional schould have clerance for this operation
        try{
        const DocID = request.query["DocID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            query = {_id: mongoose.Types.ObjectId(DocID)};
                            db.collection("Encounter_Note").findOne(query,{projection:{disp_data:1,date:1}},function (operr,opresult){
                                if (operr) throw response.send("1110011");
                                if(opresult == null){
                                    response.send('100101');
                                }else{
                                    response.send(opresult);
                                }
                            });
    
                        }else{
                            response.send('1110013');
                        }
                    }
    
                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });

    app.get('/get_disp_Fullrec_dateTime', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
        const usrID = request.query["usrID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            
                            query = {
                                usrID:usrID
                            };

                            db.collection("fullCollection_indexs").find(query,{projection:{DocID:1,DocCategory:1,date:1}}).forEach(e => {
                                e.id_and_category = e.DocID +"|"+ e.DocCategory;
                                staticVars.collectionA.push(e);
                            }).then(e => {
                                response.send(staticVars.collectionA);
                            }).catch(e => {
                                response.send("1100101");
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });
    
    app.get('/get_Fullrec_with_id', async (request, response) => {
         // every professional schould have clerance for this operation
        try{
        const DocID = request.query["DocID"];
        const category = request.query["category"];

        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            query = {_id: mongoose.Types.ObjectId(DocID)};
                            db.collection(category).findOne(query,{projection:{disp_data:1,date:1}},function (operr,opresult){
                                if (operr) throw response.send("1110011");
                                if(opresult == null){
                                    response.send('100101');
                                }else{
                                    response.send(opresult);
                                }
                            });

                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });

      app.post('/uploadfile',function(req,response){
        
        try{
            
            const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
              staticVars={
                  collectionA: []
              };
              var usr_remote_ip = getRealIP(req.connection.remoteAddress);
              if(usr_remote_ip == '1'){
                  usr_remote_ip = "127.0.0.1";
              }
              // check if node is permitted
              const queryPN = {nodeIP:usr_remote_ip};
              node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
                  if (err) throw response.send("1110011");
                  if(result == null){
                      response.send("1110011");
                  }else{
                      //check session loged in
                      const querySL = {id:usr_remote_ip};
                      loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                          if (err2) throw response.send("1110012");
                          if(result2 == null){
                              response.send("1110012");
                          }else{
                              if(check_clerance_level(cleranceLevel,result2.job)){
                                upload(req,response,function(err) {
                                    //console.log(req.body);
                                    //console.log(req.files);
                                    if(err) {
                                        return response.send("110011");
                                    }
                                    response.send(req.files[0].filename);
                                });
                                  
                              }else{
                                  response.send('1110013');
                              }
                          }
      
                      });
                  }
              });
          
                }catch{
                    response.send('1110016');
                }  
        


    });
    
    app.get('/set_currOpratP_coll', async (request, response) => {
        try{
        const usrID = request.query["usrID"];

        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                            
                    query = {mIP: usr_remote_ip};
                    db.collection("currOpratP_coll").findOne(query,{projection:{date:1}},function (operr,opresult){
                        if (operr) throw response.send("1110011");
                        if(opresult == null){
                            const date = new Date();
                            newvalue = {
                                mIP:usr_remote_ip,
                                usrID:usrID,
                                job:result2.job,
                                date: date
                            }
                            db.collection("currOpratP_coll").insertOne(newvalue,function(opErr4,opRes4){
                                if (opErr4) throw opErr4;
                                response.send("11111");
                            });
                        }else{
                            newUPvalue = {$set:{usrID:usrID}}
                            db.collection("currOpratP_coll").updateOne(query,newUPvalue,function(upErr2,upRes2){
                                response.send("11111");
                            });
                        }
                    });
                   
                        
                    
               
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });

    app.get('/get_currOpratP_coll', async (request, response) => {
        try{
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                query = {mIP: usr_remote_ip};
                    db.collection("currOpratP_coll").findOne(query,{projection:{_id:0,usrID:1}},function (operr,opresult){
                        if (operr) throw response.send("1110011");
                        if(opresult == null){
                            response.send('100101');
                        }else{
                            response.send(opresult);
                        }
                    });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });

    app.get('/de_assign_particular_patient', async (request, response) => {
        // every professional schould have clerance for this operation
        try{
            const assignID = request.query["assignID"];
        const cleranceLevel = ["Pharmacist","Doctor","Nurse","LabScientist","Radiologist","Record_manager"];
        staticVars={
            collectionA: []
        };
        var usr_remote_ip = getRealIP(request.connection.remoteAddress);
        if(usr_remote_ip == '1'){
            usr_remote_ip = "127.0.0.1";
        }
        // check if node is permitted
        const queryPN = {nodeIP:usr_remote_ip};
        node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
            if (err) throw response.send("1110011");
            if(result == null){
                response.send("1110011");
            }else{
                //check session loged in
                const querySL = {id:usr_remote_ip};
                loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                    if (err2) throw response.send("1110012");
                    if(result2 == null){
                        response.send("1110012");
                    }else{
                        if(check_clerance_level(cleranceLevel,result2.job)){
                            query = {_id: mongoose.Types.ObjectId(assignID)};
                                    db.collection("assign").deleteOne(query, function(err, res) {
                                        if (err) throw response.send("110098");
                                        response.send("11111");
                                    });
        
                        }else{
                            response.send('1110013');
                        }
                    }

                });
            }
        });
        }catch{
            response.send('1110016');
        }  
        
    });

    app.get('/w_passed_usrID', async (request, response) => {
       try{
       const empID = request.query["empID"];
       const cleranceLevel = ["Admin_Manager"];
       var usr_remote_ip = getRealIP(request.connection.remoteAddress);
       if(usr_remote_ip == '1'){
           usr_remote_ip = "127.0.0.1";
       }
       // check if node is permitted
       const queryPN = {nodeIP:usr_remote_ip};
       node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
           if (err) throw response.send("1110011");
           if(result == null){
               response.send("1110011");
           }else{
               //check session loged in
               const querySL = {id:usr_remote_ip};
               loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                   if (err2) throw response.send("1110012");
                   if(result2 == null){
                       response.send("1110012");
                   }else{
                       if(check_clerance_level(cleranceLevel,result2.job)){
                           console.log(result2.data);
                        query = {adminID:result2.data};
                    db.collection("curr_emp_registerd").findOne(query,{projection:{date:1}},function (operr,opresult){
                        if (operr) throw response.send("1110011");
                        if(opresult == null){
                            newvalue = {
                                empID:empID,
                                adminID:result2.data
                            }
                            db.collection("curr_emp_registerd").insertOne(newvalue,function(opErr4,opRes4){
                                if (opErr4) throw opErr4;
                                response.send("11111");
                            });
                        }else{
                            newUPvalue = {$set:{empID:empID}}
                            db.collection("curr_emp_registerd").updateOne(query,newUPvalue,function(upErr2,upRes2){
                                response.send("11111");
                            });
                        }
                    });
   
                       }else{
                           response.send('1110013');
                       }
                   }
   
               });
           }
       });
       }catch{
           response.send('1110016');
       }  
       
   });

   app.get('/r_passed_usrID', async (request, response) => {
   try{
   const cleranceLevel = ["Admin_Manager"];
   var usr_remote_ip = getRealIP(request.connection.remoteAddress);
   if(usr_remote_ip == '1'){
       usr_remote_ip = "127.0.0.1";
   }
   // check if node is permitted
   const queryPN = {nodeIP:usr_remote_ip};
   node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
       if (err) throw response.send("1110011");
       if(result == null){
           response.send("1110011");
       }else{
           //check session loged in
           const querySL = {id:usr_remote_ip};
           loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
               if (err2) throw response.send("1110012");
               if(result2 == null){
                   response.send("1110012");
               }else{
                   if(check_clerance_level(cleranceLevel,result2.job)){
                       query = {adminID:result2.data};
                       db.collection("curr_emp_registerd").findOne(query,{projection:{_id:0,empID:1}},function (operr,opresult){
                           if (operr) throw response.send("1110011");
                           if(opresult == null){
                               response.send('100101');
                           }else{
                               response.send(opresult.empID);
                           }
                       });

                   }else{
                       response.send('1110013');
                   }
               }

           });
       }
   });
   }catch{
       response.send('1110016');
   }  
   
});

app.get('/request_drug_dispense', async (request, response) => {
    try{
        const cleranceLevel = ["Nurse"];
        const dispense_string = request.query["data"];
        const usrID = request.query["patient_id"];
   
    var usr_remote_ip = getRealIP(request.connection.remoteAddress);
    if(usr_remote_ip == '1'){
        usr_remote_ip = "127.0.0.1";
    }
    // check if node is permitted
    const queryPN = {nodeIP:usr_remote_ip};
    node = db.collection("permitted_nodes").findOne(queryPN,{projection:{nodeIP:1}},function (err,result){
        if (err) throw response.send("1110011");
        if(result == null){
            response.send("1110011");
        }else{
            //check session loged in
            const querySL = {id:usr_remote_ip};
            loged_in_session = db.collection("session_log").findOne(querySL,{projection:{job:1,first_name:1,last_name:1,data:1}}, function(err2,result2){
                if (err2) throw response.send("1110012");
                if(result2 == null){
                    response.send("1110012");
                }else{
                    if(check_clerance_level(cleranceLevel,result2.job)){
                        newvalue = {
                            usrID:usrID,
                            dispense_string:dispense_string,
                            nurseID:result2.data,
                            nurseName:result2.first_name+" "+result2.last_name
                        }
                        db.collection("requested_dispense").insertOne(newvalue,function(opErr4,opRes4){
                            if (opErr4) throw opErr4;
                            response.send("11111");
                        });

                    }else{
                        response.send('1110013');
                    }
                }

            });
        }
    });   
    }catch{
        response.send('1110016');
    }
    
});
  

});

function add_to_full_rec_index(DocID,usrID,DocCategory,date){
    const db = global_static_var.db;
    const insertion_doc = {
        DocID:DocID,
        usrID:usrID,
        DocCategory:DocCategory,
        date:date
    }
    db.collection("fullCollection_indexs").insertOne(insertion_doc,function(err4,result4){
        if (err4) throw  console.log("Erro adding to attended patients");
    });
}

function deassign_set_rAttended_to(usrID,professional_ID,inserted_txt,type){
    const db = global_static_var.db;
    db.collection("assign").updateOne({'usrID':usrID,'professional_ID':JSON.parse(professional_ID).$oid},{
        $set:{'assigned':'1'}
    });
    opQuerry1 = {_id: mongoose.Types.ObjectId(usrID)};
    db.collection("patient_profile").findOne(opQuerry1,{projection:{_id:0,first_name:1,last_name:1}}, function(err3,result3){
    
        const insertion_doc = {
            usrID:usrID,
            professional_ID:JSON.parse(professional_ID).$oid,
            inserted_txt:inserted_txt,
            user_name:result3.first_name+" "+result3.last_name,
            type:type
        }
        db.collection("attended_patients").insertOne(insertion_doc,function(err4,result4){
            if (err4) throw  console.log("Erro adding to attended patients");
        });
    
    });
    
}

function getCurrentDate(){
    var currentDate = new Date();
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();

    var dateString = date + "-" +(month + 1) + "-" + year;
    return dateString;
}

function write_to_patient_sugestions(namebsed_data,idbased_data){
let raw_data = fs.readFileSync('../../general_server_files/patient_sugestions.json');
let prv_suggestions = JSON.parse(raw_data);
prv_suggestions.name_based.push(namebsed_data);
prv_suggestions.id_based.push(idbased_data);
let newdata = JSON.stringify(prv_suggestions);
fs.writeFileSync('../../general_server_files/patient_sugestions.json',newdata)
}

function check_clerance_level(cleranceLevelArray,level){
    const result = {
        value: false
    }
    cleranceLevelArray.forEach((e) => {
        if(check_string_equality(e,level)){
            result.value = true;
        }
    });
    return result.value;
}

function get_shifts(id){
    return '00:00AM - 00:00PM';
}
function get_no_assigned_patients(id){
    return '0';
}

function getRealIP(data){
can_collect = false;
const result = {
    data:""
};
i = 0;
while(i < data.length){
        e = data.charAt(i);
        if(e == '1' || e == '2' || e == '3' || e == '4' || e == '5' || e == '6' || e == '7' || e == '8' || e == '9' || e == '0'){
        can_collect = true;
        }
        if(can_collect){
            result.data = result.data + e;
        }
        i++
};
return result.data;
}

function check_string_equality(dat1,dat2){
    if(dat1 === dat2){
        return true;
    }else{
        return false;
    }
  }

app.get('/', async (request, response) => {
    response.send(`VIOSTEC API V.00.JS.0.1`);
});



app.listen(3130,	()	=>	console.log('VIOS server ready'))
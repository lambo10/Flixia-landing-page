const dbConfig = require('../config/database.config.js');
const mongoose = require('mongoose');

mongoose.connect(dbConfig.url,function (err,db){
    if (err) throw err;
    try{
        db.collection("employee_profile").createIndex({_id:'text',first_name:'text',last_name:'text',middle_name:'text'});
    db.collection("drugs").createIndex({type:'text',category:'text',name:'text'});
    db.collection("patient_profile").createIndex({_id:'text',first_name:'text',last_name:'text',middle_name:'text'});
    console.log("Done");
    }catch(e){
        console.log("Index Creation Failed"+e);
    }    
});

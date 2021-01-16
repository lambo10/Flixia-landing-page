const dbConfig = require('../../config/database.config.js');
const mongoose = require('mongoose');
const fs = require('fs');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url,function (err,db){
    if (err) throw err;
    db.collection("drugs").find().forEach(e => {
         if(parseInt(e.quantity) <= parseInt(e.drug_shortage_point)){
             let drug_query = {_id: mongoose.Types.ObjectId(e._id)};
            db.collection("drug_shortages").findOne(drug_query,{projection:{_id:0}}, function(opErr1,opRes1){
                if (opErr1) throw console.log("Erro -- 100042");
                if(opRes1 == null){
                    db.collection("drug_shortages").insertOne(e,function(err3,result3){
                        if (err3) throw err3;
                    });
                }
        });
         } 
                
});
db.collection("drugs_batch").find().forEach(e => {
    todayDate = new Date();
         d_exp = new Date(e.expDate); 
         if(parseInt(e.expired_flag) == 0){
         if(todayDate.getTime() >= d_exp.getTime()){
            let drug_query = {_id: mongoose.Types.ObjectId(e._id)};
            db.collection("expired_drugs").findOne(drug_query,{projection:{_id:0}}, function(opErr2,opRes2){
                if (opErr2) throw console.log("Erro -- 100045");
                if(opRes2 == null){
                        e.expDate = new Date(new Date(e.expDate).toISOString());
                    db.collection("expired_drugs").insertOne(e,function(err4,result4){
                        if (err4) throw err4;
                        newUPvalue = {$set:{expired_flag:1}};
                        upQuerry = {DrugID:e._id};
                        db.collection("drugs_batch").updateOne(drug_query,newUPvalue,function(upErr2,upRes2){

                        });
                    });
                    
                    
                }
        });
         }  
        }
});

});

const dbConfig = require('../config/database.config.js');
const mongoose = require('mongoose');

mongoose.connect(dbConfig.url,function (err,db){
    if (err) throw err;
    args = process.argv.slice(2);
    switch(args[0]){
        case 'add':
            addObj = {name: args[1],nodeIP:args[2]};
            db.collection("permitted_nodes").insertOne(addObj,function (err,res){
                if(err) throw err;
                console.log("Node Added Successfully");
                db.close();
            })
            break;
        case 'delete':
                querry = {nodeIP:args[1]};
                db.collection("permitted_nodes").deleteOne(querry,function (err,res){
                    if(err) throw err;
                    console.log("Node deleted Successfully");
                    db.close();
                })
                break;
        case 'rename':
                querry = {nodeIP:args[1]};
                newValue = {$set:{name:args[2]}};
                db.collection("permitted_nodes").updateOne(querry,newValue,function (err,res){
                    if(err) throw err;
                    console.log("Node renamed Successfully");
                    db.close();
                })
                break;
        case 'display_nodes':
                db.collection("permitted_nodes").find({}).toArray(function (err,res){
                    if(err) throw err;
                    console.log(res);
                    db.close();
                })
                break;
        default:
            console.log("Argument can not be empty");
    }
});

var express = require('express'),
app = express(),
cors = require('cors'),
body_parse = require('body-parser');
// jwt =  require('jsonwebtoken');
// mongoose = require('mongoose'),


app.use(body_parse.urlencoded({extended:false}));
app.use(body_parse.json());

function splitRequestDataWithoutZero(value) {
    let str = value.data;
    let pattern = /[a-z|A-Z]+0*[a-z|A-Z]+0*/;
    let fullNameWithoutZero = pattern.exec(str)[0].replace(/0+/g," ").split(" ");
    let firstname = fullNameWithoutZero[0];
    let lastname = fullNameWithoutZero[1];
    let pat = /[^0][1-9]+/;
    let clientNumber  =  pat.exec(str)[0];
    let objData = {
        "firstName" :firstname,
        "lastName" : lastname,
        "clientId":clientNumber
    }
    return objData;
};

function splitRequestDataWithZero(value) {
    let str = value.data;
    console.log("firstName", str);
    let pattern = /[a-z|A-Z]+0*[a-z|A-Z]+0*/;
    let pat = /[^0][1-9]+/;
    let fullNameWithZero =  pattern.exec(str)[0];
    let pat2 = /[a-z|A-Z]+0*/g;
    let pat3 = /0[a-z|A-z]+0*/;
    let fname = pat2.exec(fullNameWithZero)[0];
    let lname = pat3.exec(fullNameWithZero)[0].split('');
    let clientNumber  =  pat.exec(str)[0];
    lname.shift();
    let objData = {
        "firstName" :fname,
        "lastName" :  lname.join(""),
        "clientId":clientNumber
    }
    return objData;
};

app.post('/api/v1/parse',function(req,res){
    let objValue = splitRequestDataWithZero(req.body)
    res.send(objValue);
});


app.post('/api/v2/parse',function(req,res){
    let objValue = splitRequestDataWithoutZero(req.body)
    res.send(objValue);
});


// create server 
app.listen(3000, function(){
    console.log("server is @ localhost:3000");
});

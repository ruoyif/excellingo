const paypal = require('paypal-rest-sdk');
var mysql = require('./mysql');
var mysqlpool = require('./mysql_pool');
var ejs = require("ejs");
var express = require('express');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AQdS3-Ooq_nK4r9v1KWwR-8pm49m-BBLyjqZd37mmOP4KZh3QIco15Wik8Bemm5S3qM1K5IgmwozIiAZ',
    'client_secret': 'ENlOFiLJGjK_nKoFYOcn7LFtXqcHt49fEDHi9wQ2DeFYSwayb6Uzge4_1MvxVpGCIqwADR589AQzyg4z'
});

const app = express();
var course_id;
var student_id;
var tutor_id;

// data can get from database
exports.buyCourse = function(req, res) {
     course_id = req.query.course_id;
     student_id = req.session.islogin;
     tutor_id = req.query.tutor_id;
     console.log(course_id);
     console.log(tutor_id);
    //  if (typeof(course_id)== "undefined") {
    //     course_id = 3;
    //     student_id = 3;
    //  } 
    
    var searchPrice = "SELECT c.price as price, c.course_name as course_name FROM course as c where course_id  = "+course_id;
    console.log("query for student to buy--------" );
    mysqlpool.handle_database(function(err,result){
         console.log("hiiii" );
        if(err){
          throw err;
        } else {

        var price = result[0].price;
        console.log(price);
        var courseName = result[0].course_name
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3029/pay_success?price="+price,
                "cancel_url": "/tutor_dashboard"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": courseName,
                        "sku": "0001",
                        "price": price,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": price
                },
                "description": "ExcelLingo Course"
            }]
        };
        
        paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    throw error;
                } else {
                    console.log("hi there!");
                    for(let i = 0; i < payment.links.length; i++) {
                        // redirect the user
                        if(payment.links[i].rel === 'approval_url') {
                            res.redirect(payment.links[i].href);
                        }
        
                    }
                    console.log("hi there2!");
                }
            });
        
        
        }

    // }

    },searchPrice);
}
exports.buySuccess = function(req, res) {
    console.log("hi there3!");
    // var student_id =  req.session.tutor_id;
    // var course_id = req..
   
    console.log(tutor_id);
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const price = req.query.price;
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": price
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            // res.send('Success');
            console.log(JSON.stringify(payment));
            var addOrder = "Insert into `order` (student_id, course_id, tutor_id, payment_status) values("+student_id+","+course_id+","+tutor_id+",'paid')";
            mysqlpool.handle_database(function(err,result){
                if(err){
                  throw err;
                } else {
                    console.log("loaded!");
                    // res.send('Success Record in dataset');
                }
            }, addOrder);
            res.render('pages/payment_success');
        }
    });
}

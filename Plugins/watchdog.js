// Dependecies 

const nodemailer = require('nodemailer');

// Local Files

let bot = require('../bot');
let email = require('./mail');
let config = require('../config');

var promises = config.plugins.watchdog.https;

var counter = 0

let getHEAD = async (url) => {
    try {
        await got.head(url);
        bot.Log.trace(url+ ' OK!');
        conter = 0;
    }
    catch (err) { 
        bot.Log.fatal(url + " is down, Code: " + err.statusCode)
        if(err.statusCode == undefined && counter <= 0 ) {
            email.plugin.email(config.admin, "Server is Down", url + " is Down, Code " + err.statusCode, url + " is Down, <b>No Response</b>");
            counter = 1;
        }
        else if(counter <= 0){
            email.plugin.email(config.admin, "Server is Down", url + " is Down, Code " + err.statusCode, url + " is Down, <b>Code " + err.statusCode + "</b>");
            counter = 1;
        }
        
    }
}


exports.getHEAD = getHEAD
exports.promises = promises;
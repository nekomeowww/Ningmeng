// Dependecies 

const nodemailer = require('nodemailer');

// Local Files

let bot = require('../bot');
let email = require('./mail');
let config = require('../config');

var promises = config.plugins.watchdog.https;

let counter = 0

let getHEAD = async (url) => {
    try {
        await got.head(url);
        bot.Log.trace(url+ ' OK!');
        conter = 1;
    }
    catch (err) { 
        bot.Log.fatal(url + " is down, Code: " + err.statusCode)
        console.log("Should Send a Email to notify");
        email.plugin.email(config.admin, url + " is Down", url + " is Down, Code " + err.statusCode, url + " is Down, <b>Code " + err.statusCode + "</b>");
        counter = 1;
    }
}


exports.getHEAD = getHEAD
exports.promises = promises;
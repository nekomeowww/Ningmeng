// Dependecies 

const nodemailer = require('nodemailer');
var monitor = require('website-monitor');
const got = require('got');
const request = require('request');
// Local Files

let bot = require('../bot');
let email = require('./mail');
let config = require('../config');

var promises;

//var site = config.plugins.watchdog.cachet.site;

let getURL = async (url) => {
    await watch(url);
    getFullAPI();
}

var cachetHeaders = {
    'Content-Type': 'application/json;',
    'X-Cachet-Token': config.plugins.watchdog.cachet.token
};

// Processing the original body of the JSON api, get the information of the Cachet site data

let getFullAPI = async (site) => {
    let options = {
        url: site
    };

    let callback = async (error, response, body) => {
        if (!error && response.statusCode == 200) {
            //bot.Log.debug(body);
            //promises = body
        }
        else {
            bot.Log.fatal(error)
        }
    }
    request(options, callback);
}


// Watch part to watch the url and processing them

let watch = (async (url) => {
    try {
        await got.head(url);
        var id = promises.indexOf(url)+1;
        bot.Log.trace(url+ ' OK!');
        update(id, 1);
    }
    catch(err) {
        let botlog = bot.Log
        bot.Log.fatal(url + " is down, Code: " + err.statusCode)
        var id = promises.indexOf(url)+1;
        if(err.statusCode == undefined && counter <= 0) {
            await update(id, 4);
        }
        else if(counter <= 0){
            await update(id, 4);
        }
    }
})

let update = async (componentID, statusCode) => {
    let botlog = bot.Log;
    for(var i = 0; i< Object.keys(config.plugins.watchdog.https).length;i++) {
        var options = 
        { 
            method: 'PUT',
            url: 'https://status.ayaka.moe/api/v1/components/' + componentID,
            headers: cachetHeaders,
            body: 
            { 
                status: statusCode
            },
            json: true 
        }
    }

    request(options, (error, response, body) => {
        if(error) {
            //botlog.debug(body);
            botlog.fatal(error);
            throw new Error(error);
        }
        else {
            botlog.debug("Updated the Ayaka Status");
        }
    })
}

/*
let watchdog = {
    botlog: bot.Log,
    fallback(url, err) {
        this.botlog.debug(url);
        bot.Log.fatal(url + " is down, Code: " + err.statusCode)
        if(err.statusCode == undefined && counter <= 0 ) {
            this.botlog.info("No response Email Sent");
            //email.plugin.email(config.admin, "Server is Down", url + " is Down, Code " + err.statusCode, url + " is Down, <b>No Response</b>");
            counter++
        }
        else if(counter <= 0) {
            this.botlog.info("Fail Email Sent")
            //email.plugin.email(config.admin, "Server is Down", url + " is Down, Code " + err.statusCode, url + " is Down, <b>Code " + err.statusCode + "</b>");
            counter++
        }
    }
}
*/
/*

我们需要先做一个 Email 的 Fallback 方式，这样如果遇到了 HTTP 200 以外的 HTTP Code 就视为 需要 Call 这个 Function 来发送邮件
但是这个发送邮件只会寄送一次，然后这里开始计算服务器到底离线了多久，这样才可以正确返回

*/

/*

try {
        
    }
    catch(err) {

    }
    

    let mailctl = () => {
        
    }

    botlog.info("No response Email Sent");
    //email.plugin.email(config.admin, "Server is Down", url + " is Down, Code " + err.statusCode, url + " is Down, <b>No Response</b>");
    counter++

    botlog.info("Fail Email Sent")
    //email.plugin.email(config.admin, "Server is Down", url + " is Down, Code " + err.statusCode, url + " is Down, <b>Code " + err.statusCode + "</b>");
    counter++

*/

exports.getFullAPI = getFullAPI
exports.promises = promises;
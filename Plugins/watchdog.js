// Dependecies 

const nodemailer = require('nodemailer');
var monitor = require('website-monitor');
const got = require('got');
const request = require('request');
// Local Files

let bot = require('../bot');
let email = require('./mail');
let config = require('../config');

let pluginName = config.plugins.watchdog.name;
let pluginVersion = config.plugins.watchdog.version;

var cachetHeaders = {
    'Content-Type': 'application/json;',
    'X-Cachet-Token': config.plugins.watchdog.cachet.token
};

//var site = config.plugins.watchdog.cachet.site;

let plugin = {
    async core(ctx) {

        // Get Full List of Everything
        let body = (ctx) => {
            let options = {
                url: config.plugins.watchdog.cachet.site + "/api/v1/components"
            };
            request(options, (error, response, body) => {
                if(error) {
                    //botlog.debug(body);
                    bot.Log.fatal(error);
                    throw new Error(error);
                }
                else {
                    var api = JSON.parse(body)
                    for(let i = 0; i < api.data.length; i++) {
                        if(api.data[i].link == undefined || api.data[i].link == "" || api.data[i].link == null) {
                            bot.Log.warning(api.data[i].name + "：无链接可检测。");    
                        }
                        else {
                            this.watch(api.data[i].id, api.data[i].link, api.data[i].name, ctx)
                        }

                    }
                }
            })
        }
        body(ctx)
        ctx.reply("已经获取了整个的 API，快去控制台看看吧w");
    },
    async watch(id, url, name, ctx) {
        try {
            await got.head(url);
            bot.Log.trace(name + ' OK!');
            
        }
        catch(err) {
            let botlog = bot.Log
            bot.Log.fatal(name + " is down, Code: " + err.statusCode)
            if(err.statusCode == undefined) {
                bot.Log.fatal("404");
            }
            else {
                //
            }
        }
    },
    async update(id, ctx) {
        var options = { 
            method: 'PUT',
            url: 'https://status.ayaka.moe/api/v1/components/' + id,
            headers: cachetHeaders,
            body: 
            { 
                status: statusCode
            },
            json: true 
        }
        request(options, (error, response, body) => {
            if(error) {
                
            }
            else {
                
            }
        })
    }
}

/*

*/


// Processing the original body of the JSON api, get the information of the Cachet site data

// Watch part to watch the url and processing them

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

exports.pluginName = pluginName;
exports.pluginVersion = pluginVersion;
exports.plugin = plugin;
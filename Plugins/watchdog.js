// Dependecies 

const nodemailer = require('nodemailer');
var monitor = require('website-monitor');
const got = require('got');
const request = require('request');
var ping = require('net-ping');

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
    async core() {
        // Get Full List of Everything
        let body = () => {
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
                        let isProxy = Object.keys(api.data[i].tags);
                        isProxy = isProxy.includes('proxy');
                        if(isProxy) {
                            this.updateMetrics(1, 4)
                        }
                        else if(api.data[i].link == undefined || api.data[i].link == "" || api.data[i].link == null) {
                            bot.Log.warning(api.data[i].name + "：无链接可检测。");
                        }
                        else {
                            this.watch(api.data[i].id, api.data[i].link, api.data[i].name)
                            this.updateMetrics(1, 4)
                        }

                    }
                }
            })
        }
        body();
    },
    async watch(id, url, name) {
        try {
            await got.head(url);
            bot.Log.trace(name + ' OK!');
            this.updateSite(id, 1)
        }
        catch(err) {
            let botlog = bot.Log
            if(err.statusCode == undefined) {
                bot.Log.fatal(name + " is down, Code: 404")
                this.updateSite(id, 4);
            }
            else {
                bot.Log.fatal(name + " is down, Code: " + err.statusCode)
                this.updateSite(id, 4)
            }
        }
    },
    async updateSite(id, statusCode) {
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
                bot.Log.fatal(error)
            }
            else {
                bot.Log.trace("已经更新到了 Ayaka Status！");
            }
        })
    },
    async updateNode(id, statusCode) {

    },
    async updateMetrics(id, statusCode) {
        var pingOptions = {
            retries: 3,
            timeout: 2000
        };
        
        let target = "159.89.206.77"
        var session = ping.createSession (pingOptions);
        
        session.on ("error", function (error) {
            bot.Log.trace (error.toString ());
        });
        
        session.pingHost (target, function (error, target, sent, rcvd) {
            var ms = rcvd - sent;
            if (error) {
                var options = { method: 'POST',
                url: 'https://status.ayaka.moe/api/v1/metrics/1/points',
                body: { value: ms },
                json: true };

                request(options, function (error, response, body) {
                if (error) bot.Log.fatal(error);

                });
                if (error instanceof ping.RequestTimedOutError) {
                    bot.Log.warning(target + ": Not alive (ms=" + ms + ")");
                }
                else {
                    bot.Log.trace('' + ": Alive alive (ms=" + ms + ")");
                }
            }
        })
    }
}


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
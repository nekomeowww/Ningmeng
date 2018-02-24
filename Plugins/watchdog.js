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
        
        if(config.plugins.watchdog.enable) {
            bot.Bot.use(async (ctx, next) => ctx.reply('正在更新 Ayaka Status...'))
        // Get Full List of Everything
        let body = () => {
            let options = {
                url: config.plugins.watchdog.cachet.site + "/api/v1/components"
            };
            request(options, async (error, response, body) => {
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
                            await bot.Log.warning(api.data[i].name + "is Proxy Node, Pinging...");
                        }
                        else if(api.data[i].link == undefined || api.data[i].link == "" || api.data[i].link == null) {
                            await bot.Log.warning(api.data[i].name + "：无链接可检测。");
                        }
                        else {
                            await this.watch(api.data[i].id, api.data[i].link, api.data[i].name)
                        }

                    }
                }
            })
            bot.Bot.use(async (ctx, next) => ctx.reply("更新完毕。"));
        }
        //this.updateMetrics(1, 4)
        body();
        }
        else {
            return;
        }
    },
    async watch(id, url, name) {
        try {
            await got.head(url);
            bot.Log.trace(name + ' is up!');
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
        })
    },
    async updateNode(id, statusCode, api) {
        
    }
}

exports.pluginName = pluginName;
exports.pluginVersion = pluginVersion;
exports.plugin = plugin;
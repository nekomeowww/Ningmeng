// Dependencies

const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
const log4js = require('log4js');

// Local Files

let config = require('./config');
let core = require('./control');
let plugin = require('./Plugins/plugin');
let packageInfo = require('./package.json');
let flightTrack = require('./Plugins/flightTrack');
let mail = require('./Plugins/mail');

// Bot Username

let botUsername = "@" + config.username;

// Time

let Time = new Date();
let CurrentTime = Time.getFullYear() + "-" + ("0"+(Time.getMonth()+1)).slice(-2) + "-" + ("0" + Time.getDate()).slice(-2) + "-" + ("0" + Time.getHours()).slice(-2) + "-" + ("0" + Time.getMinutes()).slice(-2) + "-" + ("0" + Time.getSeconds()).slice(-2);

// Logger

let fileName = "./log/" + config.username + "-" + CurrentTime + ".log";

log4js.configure({
    appenders: {
        Logger: { type: 'file', filename: fileName },
        console: { type: 'console' }
    },
    categories: {
        Ningmeng: { appenders: ['console', 'Logger'], level: 'trace' },
        default: { appenders: ['console', 'Logger'], level: 'trace' }
    }
});

// Header

const logger = log4js.getLogger('Ningmeng');

let pluginList = [
    "已挂载插件: " + mail.pluginName + " [ 版本: " + mail.pluginVersion + " ] ",
    "已挂载插件: " + flightTrack.pluginName + " [ 版本: " + flightTrack.pluginVersion + " ] "
];
for(var i = 0; i<pluginList.length; i++) {
    logger.debug(pluginList[i]);
};


// Logger

let Log = {
    info: (text) => {
        logger.info(text);
    },

    trace: (text) => {
        logger.trace(text);
    },

    debug: (text) => {
        logger.debug(text);
    },

    warning: (text) => {
        logger.warn(text);
    },

    fatal: (text) => {
        logger.fatal(text);
    }
}

// Bot


let token = config.token;

let Bot = new Telegraf(token);
let TelegramClient = new Telegram(token);

// Bot Control

let botctl = {
    start: () => {
        core.core.control();
    },

    message: () => {

    }
}

// Plugin

let plgctl = {
    start: () => {
        plugin.control();
    }
}

exports.botUsername = botUsername;
exports.Bot = Bot;
exports.TelegramClient = TelegramClient;
exports.Log = Log;
exports.botctl = botctl;
exports.plgctl = plgctl;
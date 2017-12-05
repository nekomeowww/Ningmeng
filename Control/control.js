// Essentials

const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
//const HttpsProxyAgent = require('https-proxy-agent');
let config = require('../config');
let msgctl = require('./Message/message');
let nlpctl = require('./Message/nlp/nlp');

// Bot Here

let token = config.token;
let proxy = config.proxy;

console.log("No Proxy Settings.");
const Bot = new Telegraf(token);
const TelegramClient = new Telegram(token);

Bot.start((ctx) => {
    console.log("started: ", ctx.from.id);
    return ctx.reply('喵！');
})

//Control Here

let message = {
    command: (action) => {
        let fullaction = action + "@NingmengBot";
        switch(action){
            case "help":
                Bot.command([action, fullaction], (ctx) => ctx.reply('随意说话就好啦w'));
                break;
            case "music":
                Bot.command(action, (ctx) => ctx.reply('随意说话就好啦w'));
                break;
            case "nlp":
                Bot.command(action, (ctx) => ctx.reply(msgctl.nlp(ctx.message.text)));
                break;
            case "nlpa":
                Bot.command(action, (ctx) => ctx.reply(msgctl.nlp(ctx.message.text)));
                break;
            case "nlptagadd":
                Bot.command(action, (ctx) => ctx.reply("还不支持哦！"));
                break;
            case "nlptagedit":
                Bot.command(action, (ctx) => ctx.reply("还不支持哦！"));
                break;
            case "nlptagsearch":
                Bot.command(action, (ctx) => ctx.reply("还不支持哦！"));
                break;
            case "info":
                info.info();
                break;
            default:
                Bot.command(action, (ctx) => ctx.reply('随意说话就好啦w'));
                break;
        }
    },

    hears: (msg) => {
        if(msg == 'hi') {
            Bot.hears('hi', (ctx) => ctx.reply('Hey there!'));
        }
    },

    hearsRpy: (msg, reply) => {
        Bot.hears(msg, (ctx) => {
            ctx.reply(reply);
        })
    },

    sticker: () => {
        Bot.on('sticker', (ctx) => {
            //
            fileid = ctx.message.sticker.file_id;
            console.log(fileid);
            TelegramClient.sendSticker(fileid);
        })
    }
}

let info = {
    info: () => {
        let commandIn = ["info", "info@NingmengBot"];
        Bot.command(commandIn, (ctx) => {
            ctx.reply(ctx.message);
            ctx.reply(ctx.from);
            ctx.reply(ctx.chat);

            console.log(ctx.message);
            console.log(ctx.from);
            console.log(ctx.chat);
        });
    }
}

// Control.start() to start a bot

let start = () => {
    msgctl.start();
    msgctl.debug();
    Bot.startPolling();
}

exports.start = start;
exports.message = message;
exports.Bot = Bot;
exports.Telegram = Telegram;
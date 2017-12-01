// Essentials

const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
let config = require('../config');
let msgctl = require('./Message/message');
let nlpctl = require('./Message/nlp/nlp');

// Bot Here

let token = config.token;
const Bot = new Telegraf(token);
const TelegramClient = new Telegram(token);

//Control Here

let message = {
    start: () => {
        Bot.start((ctx) => {
            console.log("started: ", ctx.from.id);
            return ctx.reply('喵！');
        })
    },

    command: (action) => {
        let fullaction = action + "@NingmengBot";
        switch(action){
            case "help":
                Bot.command(action, (ctx) => ctx.reply('随意说话就好啦w'));
                Bot.command(fullaction, (ctx) => ctx.reply('随意说话就好啦w'));
                break;
            case "music":
                Bot.command(action, (ctx) => ctx.reply('随意说话就好啦w'));
                Bot.command(fullaction, (ctx) => ctx.reply('随意说话就好啦w'));
                break;
            case "nlp":
                Bot.command(action, (ctx) => ctx.reply(msgctl.nlp(ctx.message.text)));
                Bot.command(fullaction, (ctx) => ctx.reply(msgctl.nlp(ctx.message.text)));
                break;
            case "nlpAnalyze":
                Bot.command(action, (ctx) => ctx.reply(msgctl.nlp(ctx.message.text)));
                Bot.command(fullaction, (ctx) => ctx.reply(msgctl.nlp(ctx.message.text)));
                break;
            case "nlpTagAdd":
                Bot.command(action, (ctx) => ctx.reply("还不支持哦！"));
                Bot.command(fullaction, (ctx) => ctx.reply("还不支持哦！"));
                break;
            case "nlpTagEdit":
                Bot.command(action, (ctx) => ctx.reply("还不支持哦！"));
                Bot.command(fullaction, (ctx) => ctx.reply("还不支持哦！"));
                break;
            case "nlpTagSearch":
                Bot.command(action, (ctx) => ctx.reply("还不支持哦！"));
                Bot.command(fullaction, (ctx) => ctx.reply("还不支持哦！"));
                break;
            case "info":
                Bot.command(action, (ctx) => ctx.reply(">>> UNDER CONSTRUCTION <<<"));
                Bot.command(fullaction, (ctx) => ctx.reply(">>> UNDER CONSTRUCTION <<<"));
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
    },

    info: () => {
        //Get all info of this group

    },

    checker: (action) => {
        if(/@NingmengBot/gi.test(action)) {
            let startPoint = action.Search("@NingmengBot");
            return action.slice(0, startPoint);
        }
        else {
            return action;
        }
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
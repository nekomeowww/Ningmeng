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

    command: (command) => {
        switch(command){
            case "help":
                Bot.command('help', (ctx) => ctx.reply('随意说话就好啦w'));
                break;
            case "music":
                Bot.command('music', (ctx) => ctx.reply('这个功能还在完善w'));
                break;
            case "nlptest":
                Bot.command('nlptest', (ctx) => ctx.reply(msgctl.nlptest(ctx.message.text)));
                break;
            default:
                Bot.command('help', (ctx) => ctx.reply('随意说话就好啦w'));
                break;
        }
    },

    hears: (msg) => {
        if(msg == 'hi') {
            Bot.hears('hi', (ctx) => ctx.reply('Hey there!'));
        }
    },

    hearsRpy: (msg, reply) => {
        let context = "null";
        Bot.hears(msg, (ctx) => {
            ctx.reply(reply);
            context = ctx;
        })
    },

    sticker: () => {
        Bot.on('sticker', (ctx) => {
            //
        })
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
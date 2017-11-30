// Essentials

const Telegraf = require('telegraf');
let config = require('../config');
let msgctl = require('./Message/message');
let nlpctl = require('./Message/nlp/nlp');

// Bot Here

let token = config.token;
const Bot = new Telegraf(token);

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
            console.log(ctx);
        })
    },

    nlptest: () => {
        Bot.on('text', (ctx) => {
            let text = ctx.message.text;
            console.log("Text is "+ text);
            let result = nlpctl.tokenizer(nlpctl.receiver(text));
            ctx.reply(JSON.stringify(result));
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
    Bot.startPolling();
}

exports.start = start;
exports.message = message;
exports.Bot = Bot;
// Essentials

const Telegraf = require('telegraf');
let config = require('../config');
let msgctl = require('./Message/message');

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
        Bot.hears(msg, (ctx) => ctx.reply(reply));
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
// Essentials

const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
const log4js = require('log4js');
//const HttpsProxyAgent = require('https-proxy-agent');
let config = require('../config');
let packageInfo = require('../package.json');
let msgctl = require('./Message/message');
let nlpctl = require('./Message/nlp/nlp');

// Time

let d = new Date();

let CurrentTime = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + "-" + ("0" + d.getHours()).slice(-2) + "-" + ("0" + d.getMinutes()).slice(-2) + "-" + ("0" + d.getSeconds()).slice(-2);

// Logger

let fileName = "./log/NingmengBot-" + CurrentTime + ".log";

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

const logger = log4js.getLogger('Ningmeng');

logger.info("开始时间：" + CurrentTime + " - " + "Ningmeng 版本：" + packageInfo.version);

// Bot Here

let token = config.token;
let proxy = config.proxy;

const Bot = new Telegraf(token);
const TelegramClient = new Telegram(token);



Bot.start((ctx) => {
    logger.trace("started: ", ctx.from.id);
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
            logger.trace(fileid)
            TelegramClient.sendSticker(fileid);
        })
    }
}

let info = {
    info: () => {
        let commandIn = ["info", "info@NingmengBot"];
        Bot.command(commandIn, (ctx) => {
            let Version = "Bot Version: " + packageInfo.version;
            let messageId = "Message ID: " + ctx.message.message_id;
            let messageType = "Message Type: " + ctx.message.chat.type;
            let senderId = "Sender ID: " + ctx.message.from.id;

            let chatTitle = "Chat Title: " + ctx.message.chat.title;
            let chatId = "Chat ID: " +  ctx.message.chat.id;

            let happyChat = "希望你开心喔！";
            let happyGroup = "希望你喜欢柠檬喔！";

            ctx.reply(Version);

            logger.trace(">>> INFO -" + ctx.message.date + "- Report");
            logger.trace(messageId);
            logger.trace(messageType);
            logger.trace(senderId);

            if(ctx.message.chat.type == 'private') {
                ctx.reply(happyChat);
            }
            else {
                ctx.reply(happyGroup);

                logger.trace(chatTitle);
                logger.trace(chatId);
                logger.trace(">>> INFO Report END <<<");
            }
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
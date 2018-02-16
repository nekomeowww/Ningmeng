// Local Files

let bot = require('./bot');
let config = require('./config');
let msgctl = require('./Bot/message');
let stkctl = require('./Bot/sticker');
let cmdctl = require('./Bot/command');
let plugin = require('./Plugins/plugin');
let packageInfo = require('./package.json');

let core = {

    // Main control of all things that requires ctx

    control: () => {

        // Command

        bot.Bot.command(command.register('/start'), (ctx) => ctx.reply("你好喔，这里是柠檬酱。想要开始的话直接选择命令或者直接说话就好了喔w"));
        bot.Bot.command(command.register('/help'), (ctx) => ctx.reply("随意说话就好了喵w"));
        bot.Bot.command(command.register('/info'), (ctx) => cmdctl.info(ctx));
        bot.Bot.command(command.register('/flight'), (ctx) => plugin.plugin.track(ctx));
        bot.Bot.command(command.register('/nlp'), (ctx) => msgctl.nlpProcessor.command(ctx));
        bot.Bot.command(command.register('/progynova'), (ctx) => ctx.reply("是甜甜的糖糖! "));
        bot.Bot.command(command.register('/androcur'), (ctx) => ctx.reply("是白色的糖糖！"));
        bot.Bot.command(command.register('/estrofem'), (ctx) => ctx.reply("是蓝色的糖糖！"));
        bot.Bot.command(command.register('/proluton'), (ctx) => ctx.reply("是粘稠的汁液！"));
        bot.Bot.command(command.register('/progynondepot'), (ctx) => ctx.reply("是可以变成女孩子的魔法药水！"));
        bot.Bot.command(command.register('/pat'), (ctx) => ctx.reply("（呼噜呼噜声"));
        bot.Bot.command(command.register('/status'), (ctx) => plugin.plugin.watchdog());

        // Context Processing
        
        // Text Handling

        let botlog = bot.Log;
        let msgcore = msgctl.msgctl;

        bot.Bot.on('text', (ctx) => {

            let output = "来自: ";
            
            if(ctx.message.from.first_name && ctx.message.from.last_name) {
                botlog.trace(output + ctx.message.from.first_name + " " + ctx.message.from.last_name + " [ ID:" + ctx.message.from.id + " ]")
                botlog.trace("消息: " + ctx.message.text);
            }
            else if(ctx.message.from.username) {
                botlog.trace(output + ctx.message.from.username + " [ ID:" + ctx.message.from.id + " ]")
                botlog.trace("消息: " + ctx.message.text);                
            }
            else {
                botlog.trace(output + " [ ID:" + ctx.message.from.id + " ]")
                botlog.trace("消息: " + ctx.message.text);
            }
            

            // Port to processor

            msgcore.core(ctx);
            return ctx.message.text;
        })

        // Sticker Handling

        bot.Bot.on('sticker', (ctx) => {
            stkctl.core(ctx);
        });

        // Photo Handling

        bot.Bot.on('photo', (ctx) => {
            //bot.Log.debug(ctx.message);
        });

        //Channel Post Handling

        bot.Bot.on('channel_post', (ctx) => {

        });
    }
}

let command = {

    // Register the command and also checkin command with bot's ssername

    register: (commandName) => {
        commands = [commandName, commandName + bot.botUsername];
        return commands;
    },

    // Return the pure data without the "/command" part of string

    commandCheck: (ctx) => {
        let result = "";
        let text = ctx.message.text;
        let split = text.indexOf(' ');

        if(/@NingmengBot/gi.test(text)) {
            result = text.slice(split + 1);
            return result;
        }
        else {
            result = text.slice(split + 1);
            return result;
        }
    }
}

exports.core = core;
exports.command = command;
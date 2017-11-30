// UNDERCONSTRUCTION!!!

// Import

let botctl = require('../control');
let nlpctl = require('./nlp/nlp');

// Message Control

let msgctl = {
    start: () => {
        // Bot /start

        botctl.message.start();

        // Define Commands

        botctl.message.command('help');
        botctl.message.command('music');

        // Define Recieve Actions

        botctl.message.hears(/(?:hi)|(?:你好)/gi);

        // Define Reply Actions
    
        let dislikeall = /((?!不)(.*?)(?:讨厌)(((?:Neko)|(?: Neko))|(?:羽毛)|(?:柠檬)))|((.*?)(?:讨厌)\w(((?:Neko)|(?: Neko))|(?:羽毛)|(?:柠檬)))|((.*?)((?:不)((.*?)(?:喜欢)|(.*?)(?:讨厌)))\w((?:Neko)|(?:羽毛)))|(.*?)((?:不)(.*?)(?:喜欢))/gi;
        let lovefeather = /(?:喜欢羽毛)|(?:爱羽毛)/g;
        let loveneko = /^(?!不)(?:喜欢 Neko)|(?:喜欢Neko)/gi;
        let talk = /(?:柠檬)((?!.))|(?:柠檬酱)((?!.))/g;
        let sadmeow = /(?:喵)(?:\.)+/g;
        let lemoncute = /(?:柠檬)(.*?)(?:可爱)/g;
        let lemonnotcute = /(.*?)(不)(.*?)(?:柠檬)|(?:柠檬)(.*?)(不)(.*?)/g;

        botctl.message.hearsRpy(dislikeall, "喵...怎么这样...")
        botctl.message.hearsRpy(lovefeather, '好耶 /');
        botctl.message.hearsRpy(loveneko, "Neko 知道的话会超开心的！")
        botctl.message.hearsRpy(talk, "柠檬酱在的喔 /");
        botctl.message.hearsRpy(sadmeow, "喵...怎么了吗...");
        botctl.message.hearsRpy("咕噜咕噜", "咕噜咕噜咕噜");
        botctl.message.hearsRpy(lemonnotcute, "喵...柠檬做错惹什么嘛...（哭哭");
        botctl.message.hearsRpy(lemoncute, "啊呜啊呜(捂脸)");

        // Define Sticker Actions

        // Sticker reply broken
        // Each sticker the bot recieved will cause the bot do this action
        //botctl.message.sticker();
    
        //Message Output
    
        //botctl.Bot.use();

        // ctx.message.text 是 message 的
        botctl.Bot.on('text', (ctx) => {
            console.log("From " + ctx.message.from.username + "(" + ctx.from.id + ")");
            console.log("Message type: text");
            console.log("Context: " + ctx.message.text);
        });

        botctl.Bot.on('sticker', (ctx) => {
            console.log("From " + ctx.message.from.username + "(" + ctx.from.id + ")");
            console.log("Message type: sticker")
            console.log("Context: " + ctx.message.sticker);
            //ctx.message.sticker
        })
        botctl.Bot.on('photo', (ctx) => {
            console.log("From " + ctx.message.from.username + "(" + ctx.from.id + ")");
            console.log("Message type: photo")
            console.log("Context: " + ctx.message.photo);
        })
    }
}

module.exports = msgctl;
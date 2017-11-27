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

        // Define Recieve Actions

        botctl.message.hears(/(?:hi)|(?:你好)/gi);

        // Define Reply Actions
    
        let lovefeather = /(?:喜欢羽毛)|(?:爱羽毛)/g;
        let loveneko = /^(?!不)(?:喜欢 Neko)|(?:喜欢Neko)/gi;
        let talk = /(?:柠檬)((?!.))|(?:柠檬酱)((?!.))/g;
        let sadmeow = /(?:喵)(?:\.)+/g;

        botctl.message.hearsRpy(lovefeather, '好耶 /');
        botctl.message.hearsRpy(loveneko, "Neko 知道的话会超开心的！")
        botctl.message.hearsRpy(talk, "柠檬酱在的，有什么事情吗？");
        botctl.message.hearsRpy(sadmeow, "唔...揉揉");
        botctl.message.hearsRpy("咕噜咕噜", "咕噜咕噜");

        // Define Sticker Actions

        // Sticker reply broken
        // Each sticker the bot recieved will cause the bot do this action
        //botctl.message.sticker();
    
        //Message Output
    
        //botctl.Bot.use();

        // ctx.message.text 是 message 的
        botctl.Bot.on('text', (ctx) => {
            console.log("Chat ID is " + ctx.from.id);
            console.log("Username is " + ctx.message.from.username);
            console.log("Message is " + ctx.message.text);
        });

        botctl.Bot.on('sticker', (ctx) => {
            console.log("Chat ID is " + ctx.from.id);
            console.log("Username is " + ctx.message.from.username);
            console.log("Sticker info is " + ctx.message.sticker);
            //ctx.message.sticker
        })
    }
}

module.exports = msgctl;
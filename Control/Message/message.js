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
        botctl.message.command('nlptest');
        
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
        let lemonlemonle = /(柠檬柠檬柠)|(柠檬柠)/g;
        let lemonletsplay = /((?:柠檬)|(柠檬酱))(?:来玩)/g;
        let hugneeded = /(?:要抱)((抱)|(.*))/gi;
        let tiredforthis = /(^(?!不)(.*))|(^(.*)(?:累))/gi;

        // Greetings

        let scmorning = /((.*)|(?:大家))((?:早安安)|(?:早安)|(?:早上好)|(?:早))/gi;
        let lemonmorning = /((柠檬酱)|(?:柠檬))((?:早安安)|(?:早安)|(?:早上好)|(?:早))/g;
        let enmorning = /((?:Good Morning))(\w|((.*)(?:.*)))/gi;

        let scafternoon = /((.*)|(?:大家))((?:午安安)|(?:午安)|(?:下午好))/gi;
        let lemonafternoon = /((柠檬酱)|(?:柠檬))((?:午安)|(?:午安安)|(?:下午好))/g;
        let enafternoon = /((?:Good Afternoon))(\w|((.*)(?:.*)))/gi;

        let scnight = /((.*)|(?:大家))((?:晚安安)|(?:晚安))/gi;
        let lemonnight = /((柠檬酱)|(?:柠檬))((?:晚安)|(?:晚安安))/g;
        let ennight = /((?:Good Night))(\w|((.*)(?:.*)))/gi;

        let scevening = /((.*)|(?:大家))((?:晚上好)|(?:晚好))/gi;
        let lemonevening = /((柠檬酱)|(?:柠檬))((?:晚上好)|(?:晚好))/gi;
        let enevening = /((?:Good Evening))(\w|((.*)(?:.*)))/gi;

        botctl.message.hearsRpy(dislikeall, "喵...怎么这样...")
        botctl.message.hearsRpy(lovefeather, '好耶 /');
        botctl.message.hearsRpy(loveneko, "Neko 知道的话会超开心的！")
        botctl.message.hearsRpy(talk, "柠檬酱在的喔 /");
        botctl.message.hearsRpy(sadmeow, "喵...怎么了吗...");
        botctl.message.hearsRpy("咕噜咕噜", "咕噜咕噜咕噜");
        botctl.message.hearsRpy(lemonnotcute, "喵...柠檬做错惹什么嘛...（哭哭");
        botctl.message.hearsRpy(lemoncute, "啊呜啊呜(捂脸)");
        botctl.message.hearsRpy(lemonlemonle, "咕噜咕噜~ 要做什么啦！");
        botctl.message.hearsRpy(lemonletsplay, "(竖起耳朵) 柠檬也想玩呢，可是 Neko 说要继续研究心的东西什么的...弄完这些工作才能玩呢。抱歉啦~");
        botctl.message.hearsRpy(hugneeded, "啊呜啊呜，抱紧紧...（顺毛）");
        botctl.message.hearsRpy(tiredforthis, "揉揉...实在太累的话就休息一下呢喵...");

        botctl.message.hearsRpy(lemonmorning, "喵~早安");
        botctl.message.hearsRpy(scmorning, "早安喔");
        botctl.message.hearsRpy(enmorning, "Morning!");

        botctl.message.hearsRpy(lemonafternoon, "咕噜咕噜，午安安，有闲暇时间的话记得休息放松一下呢~");
        botctl.message.hearsRpy(scafternoon, "已经过去大半天了呢，午安喵");
        botctl.message.hearsRpy(enafternoon, "Good afternoon! Finishing up with all your work?");


        botctl.message.hearsRpy(lemonnight, "嗯喵，晚安。祝你做个好梦呢~");
        botctl.message.hearsRpy(scnight, "晚安喵，好好休息哦");
        botctl.message.hearsRpy(ennight, "Good night! Wish you would have a sweet dream :)");


        botctl.message.hearsRpy(lemonevening, "喵喵，晚上好喔，柠檬在研究新奇的东西呢w");
        botctl.message.hearsRpy(scevening, "晚上好，今天过得怎么样呢？");
        botctl.message.hearsRpy(enevening, "Good evening! How's it going today?");

        // Define Sticker Actions

        // Sticker reply broken
        // Each sticker the bot recieved will cause the bot do this action
        //botctl.message.sticker();
    
    },

    distributor: () => {
        
    },

    nlptest: (data) => {
        // NLPTEST
        // Command Handler
        let result = data.slice(9);
        let tagging = nlpctl.tokenizer(nlpctl.receiver(result));
        return JSON.stringify(tagging);
    },

    debug: () => {
        botctl.Bot.on('text', (ctx) => {
            console.log("From " + ctx.message.from.username + "(" + ctx.from.id + ")");
            console.log("Message type: text");
            console.log("Context: " + ctx.message.text);
        });
        
        botctl.Bot.on('sticker', (ctx) => {
            console.log("From " + ctx.message.from.username + "(" + ctx.from.id + ")");
            console.log("Message type: sticker")
            console.log("Context: " + JSON.stringify(ctx.message.sticker));
            //ctx.message.sticker
        })
        botctl.Bot.on('photo', (ctx) => {
            console.log("From " + ctx.message.from.username + "(" + ctx.from.id + ")");
            console.log("Message type: photo")
            console.log("Context: " + JSON.stringify(ctx.message.photo));
        })
    }
}

module.exports = msgctl;
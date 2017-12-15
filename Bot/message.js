let config = require('../config');
let control = require('../control');

let msgctl = {
    core(ctx) {
        // Port CTX to context as a variable
        this.context = ctx;
        text.core(ctx);
        

    },
    context: null
}

let nlp = {
    core() {

    }
}

let text = {
    core(ctx) {

        let dislikeall = /((?!不)(.*?)(?:讨厌)(((?:Neko)|(?: Neko))|(?:羽毛)|(?:柠檬)))|((.*?)(?:讨厌)\w(((?:Neko)|(?: Neko))|(?:羽毛)|(?:柠檬)))|((.*?)((?:不)((.*?)(?:喜欢)|(.*?)(?:讨厌)))\w((?:Neko)|(?:羽毛)))|(.*?)((?:不)(.*?)(?:喜欢))/gi;
        let lovefeather = /(?:喜欢羽毛)|(?:爱羽毛)/g;
        let loveneko = /^(?!不)(?:喜欢 Neko)|(?:喜欢Neko)/gi;
        let talk = /^(柠檬)((?!.))|^(柠檬酱)((?!.))/g;
        let sadmeow = /(?:喵)(?:\.\.\.)+/g;
        let lemoncute = /(?:柠檬)(.*?)(?:可爱)/g;
        let lemonnotcute = /(.*?)(不)(.*?)(?:柠檬)|(?:柠檬)(.*?)(不)(.*?)/g;
        let lemonlemonle = /(柠檬柠檬柠)|(柠檬柠)/g;
        let lemonletsplay = /((?:柠檬)|(柠檬酱))(?:来玩)/g;
        let hugneeded = /(?:要抱)((抱)|(.*))/gi;
        let tiredforthis = /(^(.*)(?:累))/gi;

        let meowmeow = /(喵)/gi

        // Greetings

        let scmorning = /((.*)|(?:大家))((?:早安安)|(?:早安)|(?:早上好)|(早))/gi;
        let lemonmorning = /((柠檬酱)|(?:柠檬))((?:早安安)|(?:早安)|(?:早上好)|(?:早))/g;
        let enmorning = /((?:Good Morning))(\w|((.*)(?:.*)))/gi;

        let scafternoon = /((.*)|(?:大家))((?:午安安)|(?:午安)|(?:下午好)|(?:中午好))/gi;
        let lemonafternoon = /((柠檬酱)|(?:柠檬))((?:午安)|(?:午安安)|(?:下午好))/g;
        let enafternoon = /((?:Good Afternoon))(\w|((.*)(?:.*)))/gi;

        let scnight = /((.*)|(?:大家))((?:晚安安)|(?:晚安))/gi;
        let lemonnight = /((柠檬酱)|(?:柠檬))((?:晚安)|(?:晚安安))/g;
        let ennight = /((?:Good Night))(\w|((.*)(?:.*)))/gi;

        let scevening = /((.*)|(?:大家))((?:晚上好)|(?:晚好))/gi;
        let lemonevening = /((柠檬酱)|(?:柠檬))((?:晚上好)|(?:晚好))/gi;
        let enevening = /((?:Good Evening))(\w|((.*)(?:.*)))/gi;

        ctx.reply(this.match(dislikeall, "喵...怎么这样..."));
        ctx.reply(this.match(lovefeather, '好耶 /'));
        ctx.reply(this.match(loveneko, "Neko 知道的话会超开心的！"));
        ctx.reply(this.match(talk, "柠檬酱在的喔 /"));
        ctx.reply(this.match(sadmeow, "喵...怎么了吗..."));
        ctx.reply(this.match(/(?:咕噜)/g, "咕噜咕噜咕噜"));
        ctx.reply(this.match(lemonnotcute, "喵...柠檬做错惹什么嘛...（哭哭"));
        ctx.reply(this.match(lemoncute, "啊呜啊呜(捂脸)"));
        ctx.reply(this.match(lemonlemonle, "咕噜咕噜~ 要做什么啦！"));
        ctx.reply(this.match(lemonletsplay, "(竖起耳朵) 柠檬也想玩呢，可是 Neko 说要继续研究心的东西什么的...弄完这些工作才能玩呢。抱歉啦~"));
        ctx.reply(this.match(hugneeded, "啊呜啊呜，抱紧紧...（顺毛）"));
        ctx.reply(this.match(tiredforthis, "揉揉...实在太累的话就休息一下呢喵..."));
        ctx.reply(this.match(meowmeow, "喵~"));
        

        ctx.reply(this.match(lemonmorning, "喵~早安"));
        ctx.reply(this.match(scmorning, "早安喔"));
        ctx.reply(this.match(enmorning, "Morning!"));

        ctx.reply(this.match(lemonafternoon, "咕噜咕噜，午安安，有闲暇时间的话记得休息放松一下呢~"));
        ctx.reply(this.match(scafternoon, "已经过去大半天了呢，午安喵"));
        ctx.reply(this.match(enafternoon, "Good afternoon! Finishing up with all your work?"));


        ctx.reply(this.match(lemonnight, "嗯喵，晚安。祝你做个好梦呢~"));
        ctx.reply(this.match(scnight, "晚安喵，好好休息哦"));
        ctx.reply(this.match(ennight, "Good night! Wish you would have a sweet dream :)"));


        ctx.reply(this.match(lemonevening, "喵喵，晚上好喔，柠檬在研究新奇的东西呢w"));
        ctx.reply(this.match(scevening, "晚上好，今天过得怎么样呢？"));
        ctx.reply(this.match(enevening, "Good evening! How's it going today?"));

    },
    match: (textPattern, textReply) => {
        let textContext = msgctl.context;
        if(textPattern.test(textContext.message.text)) {
            return textReply;
        }
        else{
            return;
        }
    }
}

module.exports = msgctl;

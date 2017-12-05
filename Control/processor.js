// Import

let botctl = require('./control');
let msgctl = require('./Message/message');
let nlpctl = require('./Message/nlp/nlp');

function proctl() {
    start: () => {
        botctl.Bot.on('text', (ctx) => {
            msgctl.text(ctx);
        })
    }
}

module.exports = proctl;
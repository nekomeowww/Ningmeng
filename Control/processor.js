// Import

let botctl = require('./control');
let msgctl = require('./Message/message');
let nlpctl = require('./Message/nlp/nlp');

let proctl = {
    message: () => {
        botctl.Bot.use((ctx) => {
            let msg = new msgctl.message();
        });
    },

    editedMessage: () => {
        botctl.Bot.use((ctx) => {

        });
    }
}

module.exports = proctl;
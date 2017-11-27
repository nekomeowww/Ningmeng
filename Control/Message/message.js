// UNDERCONSTRUCTION!!!

// Import

let botctl = require('../control');

// Message Control

let msgctl = {
    start: () => {

    // Bot /start
    
    botctl.message.start();

    // Define Commands

    botctl.message.command('help');

    // Define Recieve Actions

    botctl.message.hears('hi');

    // Define Reply Actions

    botctl.message.hearsRpy('喜欢羽毛 /', '好耶 /');

    // Define Sticker Actions

    // Sticker reply broken
    // Each sticker the bot recieved will cause the bot do this action
    //botctl.message.sticker();
    
    }
}

module.exports = msgctl;
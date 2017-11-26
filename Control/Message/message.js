// UNDERCONSTRUCTION!!!

// Import

let Msg = require('../control');

// Message Control

let MsgControl = {
    start: () => {

    // Bot /start
    
    Msg.message.start();

    // Define Commands

    Msg.message.command('help');

    // Define Recieve Actions

    Msg.message.hears('hi');

    // Define Reply Actions

    Msg.message.hearsRpy('喜欢羽毛 /', '好耶 /');

    // Define Sticker Actions

    Msg.message.sticker();
    
    }
}

module.exports = MsgControl;
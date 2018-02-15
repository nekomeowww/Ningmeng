let config = require('../config');

let pluginName = config.plugins.watchdog.name;
let pluginVersion = config.plugins.watchdog.version;

exports.pluginName = pluginName;
exports.pluginVersion = pluginVersion;
let requestPromise = require('request-promise');
let cheerio = require('cheerio');

let config = require('../config');
let botctl = require('../control');

let plugin = {
  start: () => {
    if(config.plugins.flightTrack.enable) {
      
    }
    else {
      return "该插件未启用。";
    }
  }
}

let tracker = {
  core: () => {
    requestPromise(link)
    .then(function (htmlString) {
      // Process html...

      parse(htmlString)
    })
    .catch(function (err) {
      // Crawling failed...
      
    });
    
    function parse(body) {
    
        var $ = cheerio.load(body);
        var result = $('div.statusLines').text().split('\n')
        console.log(result);
        
    }
  }
}


// Simplified Chinese
// https://www.cn.kayak.com/tracker/FLIGHT_NUMBER/FLIGHT_DATE

// Traditional Chinese
// https://www.kayak.com.hk/tracker/FLIGHT_NUMBER/FLIGHT_DATE

// United States: English
// https://www.kayak.com/tracker/FLIGHT_NUMBER/FLIGHT_DATE

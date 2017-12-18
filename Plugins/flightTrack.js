let requestPromise = require('request-promise');
let cheerio = require('cheerio');

let bot = require('../bot');
let config = require('../config');
let control = require('../control');

let flightStatus;

let plugin = {
  core(ctx) {
    if(config.plugins.flightTrack.enable) {
      this.start(ctx);
    }
    else {
      return "该插件未启用。";
    }
  },
  start: (ctx) => {
    if(ctx.message.text.includes('/flight')) {
      tracker.command(ctx);
    }
    else {
      tracker.core(ctx);
    }
  }
}

let tracker = {
  command(ctx) {
    let data = control.command.commandCheck(ctx);

    let flightNumPattern = /(([A-Z])|(\d))(([A-Z])|(\d))((-)|( )|())((\d\d\d\d)|(\d\d\d))/gi;
    let flightNumInputPattern = /(([A-Z])|(\d))(([A-Z])|(\d))(-)((\d\d\d\d)|(\d\d\d))/gi;
    let flightNum = new String(""); 
    let flightData = flightNumPattern[Symbol.match](data);
    if(!flightData || flightData == null) {
      ctx.reply("柠檬不知道你的航班号是什么了啦~ \n使用方法： /flight AR-NUMB YYYY-MM-DD \nAR 是航空公司短标识，NUMB 是航线标识，日期格式应为：1970-01-01");
      return;
    }

    let Time = new Date();
    let CurrentTime = Time.getFullYear() + "-" + ("0"+(Time.getMonth()+1)).slice(-2) + "-" + ("0" + Time.getDate()).slice(-2);

    let date;
    let datePattern = /(\d\d\d\d)-(\d\d)-(\d\d)/g;
    date = datePattern[Symbol.match](data);
    if(!date || date == null) {
      date = CurrentTime;
    }

    let yearDate = +CurrentTime.substr(0, 4),     // get the year
        monthDate = +CurrentTime.substr(5, 2) - 1, // get the month
        dayDate = +CurrentTime.substr(8, 2),     // get the date of the month
        newDateInfo = new Date(yearDate, monthDate, dayDate);

    let flight;
    let botlog = bot.Log;
    flightNum += flightData

    if(!flightNumInputPattern.test(flightNum)) {

      let flightNumInputPattern1 = /(([A-Z])|(\d))(([A-Z])|(\d))( )((\d\d\d\d)|(\d\d\d))/gi; // Add a space
      let flightNumInputPattern2 = /(([A-Z])|(\d))(([A-Z])|(\d))((\d\d\d\d)|(\d\d\d))/gi; // Add a desh

      if(flightNumInputPattern1.test(flightNum)) {
        let array = flightNum.split(' ');
        let airline = array[0];
        let lineNum = array[1];
        flight = airline + "-" + lineNum;
      }
      if(flightNumInputPattern2.test(flightNum)) {
        let airline = flightNum.slice(0, 2);
        let lineNum = flightNum.replace(airline, '');
        flight = airline + "-" + lineNum;
      }
    }
    else {
      flight = flightNum;
    }

    let info = [flight, date]
    let result = this.core(ctx, info, data);
  },
  core(ctx, info, flight) {
    bot.Log.debug("用户 " + ctx.message.from.id + " 申请查询航班信息: " + info[0] + "" + info[1]);
    ctx.reply("正在申请查询航班信息: " + info[0]);

    // Link Prefix

    let linkPrefix;

    switch(config.plugins.flightTrack.locale) {
      case "zh-CHS":
        linkPrefix = "https://www.cn.kayak.com/tracker/";
        break;
      case "zh-CHT":
        linkPrefix = "https://www.kayak.com.hk/tracker/";
        break;
      case "en-US":
        linkPrefix = "https://www.kayak.com/tracker/";
        break;
      default:
        linkPrefix = "https://www.kayak.com/tracker/";
        break;
    }

    let link = linkPrefix + info[0] + "/" + info[1];
    bot.Log.debug(link);

    requestPromise(link)
    .then(function (htmlString) {
      // Process html...
      
      var $ = cheerio.load(htmlString);
      var flightStatus = $('div.statusLines').text().split('\n');

      // Reply to user

      let flight = {
        depart : flightStatus[1],
        departAirport : flightStatus[2],
        departSchechuleDate : flightStatus[3],
        departSchechuleDateInfo : flightStatus[4],
        departSchechuleTime : flightStatus[5],
        departSchechuleTimeInfo : flightStatus[6],
        departActualTime : flightStatus[7],
        departActualTimeInfo : flightStatus[8],
        departTerminal : flightStatus[9],
        departTerminalInfo : flightStatus[10],
        departGate : flightStatus[11],
        departGateInfo : flightStatus[12],

        arrival : flightStatus[14],
        arrivalAirport : flightStatus[15],
        arrivalSchechuleDate : flightStatus[16],
        arrivalSchechuleDateInfo : flightStatus[17],
        arrivalSchechuleTime : flightStatus[18],
        arrivalSchechuleTimeInfo : flightStatus[19],
        arrivalActualTime : flightStatus[20],
        arrivalActualTimeInfo : flightStatus[21],
        arrivalTerminal : flightStatus[22],
        arrivalTerminalInfo : flightStatus[23],
        arrivalGate : flightStatus[24],
        arrivalGateInfo : flightStatus[25],
      }

      ctx.reply(flight.departAirport + "->" + flight.arrivalAirport + "\n" + flight.depart + "\n" + flight.departSchechuleDate + ": " + flight.departSchechuleDateInfo + "\n" + flight.departSchechuleTime + ": " + flight.departSchechuleTimeInfo + "\n" + flight.departActualTime + ": " + flight.departActualTimeInfo + "\n" + flight.departTerminal + ": " + flight.departTerminalInfo + " " + flight.departGate + ": " + flight.departGateInfo + "\n" +
                                                                            flight.arrival + "\n" + flight.arrivalSchechuleDate + ": " + flight.arrivalSchechuleDateInfo + "\n" + flight.arrivalSchechuleTime + ": " + flight.arrivalSchechuleTimeInfo + "\n" + flight.arrivalActualTime + ": " + flight.arrivalActualTimeInfo + "\n" + flight.arrivalTerminal + ": " + flight.arrivalTerminalInfo + " " + flight.arrivalGate + ": " + flight.arrivalGateInfo);

    })
    .catch(function (err) {
      // Crawling failed...
      bot.Log.fatal("用户 " + ctx.message.from.id + " 查询的航班信息获取失败。");
      ctx.reply("抱歉，航班查询服务目前暂不可用。");
    });
  }
}

module.exports = plugin;

// Simplified Chinese
// https://www.cn.kayak.com/tracker/FLIGHT_NUMBER/FLIGHT_DATE

// Traditional Chinese
// https://www.kayak.com.hk/tracker/FLIGHT_NUMBER/FLIGHT_DATE

// United States: English
// https://www.kayak.com/tracker/FLIGHT_NUMBER/FLIGHT_DATE

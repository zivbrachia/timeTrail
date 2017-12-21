'use strict'

let express = require('express')
let app = express()
let bodyParser = require('body-parser');
let log4js = require('log4js');
let fs = require('fs');

log4js.configure({
    appenders: {
        appender1: { type: 'file', filename: 'logger.log' },
        appender2: { type: 'console' },
        appender3: { type: 'file', filename: 'gps.log' }
    },
    categories: {
        default: { appenders: ['appender1', 'appender2'], level: 'debug' },
        gps: { appenders: ['appender3'], level: 'debug' }
    }
});
let logger = log4js.getLogger();
let loggerGps = log4js.getLogger("gps");

logger.debug('----> Start index.js');

/*logger.trace('trace msg.');
logger.debug('debug msg.');
logger.info('info msg.');
logger.warn('warn msg.');
logger.error('error msg');
logger.fatal('fatal msg');*/

app.use(bodyParser.json());

app.get('/', function (req, res) {
    let html = fs.readFileSync(__dirname + '/public/index.html', 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    //res.send('Hello World');

});

app.post('/log', function (req, res) {
    console.log(req);

});

app.get('/log', function (req, res) {
    console.log(req);
    if (!req.query) {
        res.json("bad query string");
        return;
    }
    let pack = new Package(
        req.query.lat,
        req.query.lng,
        req.query.alt,
        req.query.activity,
        req.query.starttimestamp,
        req.query.timestamp,
        req.query.time
    );
    loggerGps.debug(JSON.stringify(pack));
    res.json("ok");
});

let port = 8000;
app.listen(port)
logger.debug('Your application is running on http://localhost:', port);

class Package {
    constructor(lat, lng, alt, activity, startTimestamp, timestamp, time) {
        this.position = {
            "lat": lat,
            "lng": lng
        };
        this.altitue = alt;
        this.activity = activity;
        this.startTimestamp = startTimestamp;
        this.timestamp = timestamp;
        this.time = time;
    }
}
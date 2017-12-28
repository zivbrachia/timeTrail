'use strict'

let express = require('express')
let app = express()
let bodyParser = require('body-parser');
let log4js = require('log4js');
let fs = require('fs');
let geolib = require('geolib');

app.use(express.static('public'));

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

app.use(bodyParser.json());         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

app.get('/', function (req, res) {
    let html = fs.readFileSync(__dirname + '/dynamic/index.html', 'utf8');
    let pathGps = getPathGps();
    html = html.replace('{ pathGps }', JSON.stringify(pathGps.coordinates));
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    //res.send('Hello World');

});

app.post('/log', function (req, res) {
    console.log(req);
    loggerGps.debug(req.body);
    res.json();

});

app.get('/login', function (req, res) {
    // https://developers.google.com/identity/sign-in/web/devconsole-project
    let html = fs.readFileSync(__dirname + '/public/login.html', 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
});
app.get('/log', function (req, res) {
    if (!req.query) {
        res.json("bad query string");
        return;
    }
    let pack = new Package(
        req.query.lat,
        req.query.lng,
        req.query.altitude,
        req.query.activity,
        req.query.starttimestamp,
        req.query.timestamp,
        req.query.time,
        req.query.speed,
        req.query.battery
    );
    pack.log();
    
    res.json("ok");
});

function getPathGps() {
    let pathGps = { coordinates: [] };
    pathGps.coordinates = [
        { lat: 32.054373, lng: 34.784688 },
        { lat: 32.054535, lng: 34.784538 },
        { lat: 32.054616, lng: 34.78434 },
        { lat: 32.054421, lng: 34.784238 },
        { lat: 32.054179, lng: 34.784196 },
        { lat: 32.054256, lng: 34.783982 },
        { lat: 32.054319, lng: 34.783609 },
        { lat: 32.054455, lng: 34.783321 },
        { lat: 32.054502, lng: 34.783092 },
        { lat: 32.054451, lng: 34.782747 },
        { lat: 32.05461, lng: 34.782579 },
        { lat: 32.054748, lng: 34.78237 },
        { lat: 32.054531, lng: 34.78223 },
        { lat: 32.054357, lng: 34.782057 },
        { lat: 32.054218, lng: 34.781922 },
        { lat: 32.053986, lng: 34.78195 },
        { lat: 32.053802, lng: 34.78184 },
        { lat: 32.053679, lng: 34.78162 },
        { lat: 32.053711, lng: 34.781325 },
        { lat: 32.053525, lng: 34.781191 },
        { lat: 32.053337, lng: 34.781159 },
        { lat: 32.053296, lng: 34.780951 },
        { lat: 32.053261, lng: 34.780716 },
        { lat: 32.053328, lng: 34.780444 },
        { lat: 32.053359, lng: 34.78021 },
        { lat: 32.053093, lng: 34.78011 },
        { lat: 32.052962, lng: 34.779936 },
        { lat: 32.052944, lng: 34.77954 },
        { lat: 32.052831, lng: 34.779293 },
        { lat: 32.052992, lng: 34.77898 },
        { lat: 32.053097, lng: 34.778759 },
        { lat: 32.053215, lng: 34.778534 },
        { lat: 32.053312, lng: 34.778307 },
        { lat: 32.053337, lng: 34.778014 },
        { lat: 32.053384, lng: 34.77776 },
        { lat: 32.05337, lng: 34.777511 },
        { lat: 32.053481, lng: 34.777335 },
        { lat: 32.05353, lng: 34.777045 },
        { lat: 32.05357, lng: 34.776808 },
        { lat: 32.053685, lng: 34.776601 },
        { lat: 32.053717, lng: 34.776376 },
        { lat: 32.053764, lng: 34.776151 },
        { lat: 32.05362, lng: 34.775926 },
        { lat: 32.053441, lng: 34.775814 },
        { lat: 32.053223, lng: 34.775765 },
        { lat: 32.053064, lng: 34.775639 },
        { lat: 32.053169, lng: 34.775411 },
        { lat: 32.053159, lng: 34.775092 },
        { lat: 32.053177, lng: 34.774819 },
        { lat: 32.053069, lng: 34.774563 },
        { lat: 32.05295, lng: 34.774387 },
        { lat: 32.052932, lng: 34.774101 },
        { lat: 32.052939, lng: 34.773865 },
        { lat: 32.053036, lng: 34.773632 },
        { lat: 32.052902, lng: 34.773456 },
        { lat: 32.052709, lng: 34.773258 },
        { lat: 32.052592, lng: 34.773042 },
        { lat: 32.052523, lng: 34.772798 },
        { lat: 32.052545, lng: 34.772442 },
        { lat: 32.052507, lng: 34.772142 },
        { lat: 32.052531, lng: 34.771902 },
        { lat: 32.05255, lng: 34.771633 },
        { lat: 32.052594, lng: 34.771405 },
        { lat: 32.052613, lng: 34.771063 },
        { lat: 32.052643, lng: 34.770799 },
        { lat: 32.052554, lng: 34.770567 },
        { lat: 32.052341, lng: 34.770225 },
        { lat: 32.052102, lng: 34.770177 },
        { lat: 32.051905, lng: 34.770242 },
        { lat: 32.051974, lng: 34.769746 },
        { lat: 32.051965, lng: 34.769493 },
        { lat: 32.051878, lng: 34.769248 },
        { lat: 32.051705, lng: 34.769139 },
        { lat: 32.051536, lng: 34.768975 },
        { lat: 32.051219, lng: 34.768585 },
        { lat: 32.050988, lng: 34.768433 },
        { lat: 32.051079, lng: 34.768146 },
        { lat: 32.051179, lng: 34.767939 },
        { lat: 32.051237, lng: 34.767698 },
        { lat: 32.051285, lng: 34.767396 },
        { lat: 32.051332, lng: 34.767187 },
        { lat: 32.05121, lng: 34.766986 },
        { lat: 32.051051, lng: 34.766835 },
        { lat: 32.050939, lng: 34.766659 },
        { lat: 32.050686, lng: 34.766507 },
        { lat: 32.05048, lng: 34.766513 }
    ];

    let totalDistance = 0;
    pathGps.coordinates[0]["distance"] = 0;
    let totalDuration = 0;
    pathGps.coordinates[0]["duration"] = 0;

    for (let i = 1; i < pathGps.coordinates.length; i++) {
        let coordinate = pathGps.coordinates[i-1];
        let nextCoordinate = pathGps.coordinates[i];

        let distance = geolib.getDistance({latitude: coordinate.lat, longitude: coordinate.lng},
            {latitude: nextCoordinate.lat, longitude: nextCoordinate.lng});
        
        if (coordinate.timestamp && nextCoordinate.timestamp) {
            let time = new Date(coordinate.timestamp);
            let nextTime = new Date(nextCoordinate.timestamp);
            let duration = nextTime.getTime() - time.getTime();
            nextCoordinate["accuDuration"] = duration + (coordinate["accuDuration"] || 0);

            nextCoordinate["duration"] = duration;
            totalDuration = totalDuration + duration;
        }

        nextCoordinate["distance"] = distance;
        nextCoordinate["accuDistance"] = distance + (coordinate["accuDistance"] || 0);
        totalDistance = totalDistance + distance;
    }
    
    return pathGps;
}

let port = 8000;
app.listen(port)
logger.debug('Your application is running on http://localhost:', port);

class Package {
    constructor(lat, lng, alt, activity, startTimestamp, timestamp, time, speed, batteryLevel) {
        this.position = {
            "lat": lat,
            "lng": lng
        };
        this.altitude = alt;
        this.activity = activity;
        this.startTimestamp = startTimestamp;
        this.timestamp = timestamp;
        this.time = time;
        this.speed = speed;
        this.batteryLevel = batteryLevel;
    }

    log() {
        loggerGps.debug(JSON.stringify(this));
    }
}
var cheerio = require('cheerio');
var hyperquest = require('hyperquest');
var JSONStream = require('JSONStream');
var isFunction = require('lodash.isfunction');
var parseInt = require('lodash.parseint');
var querystring = require('querystring');

var HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
  'User-Agent': 'opgg-ladder'
};

/**
 * Remove newlines from _String_ `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */
function stripNewlines(str) {
  return str.replace(/(?:\r\n|\r|\n)/g, '');
}

/**
 * Remove " LP" suffix and commas from _String_ `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */
function normalizeLP(lp) {
  return lp.substring(0, lp.indexOf(' LP')).replace(/,/g, '');
}

function ladder(start, callback) {
  if (isFunction(start)) {
    callback = start;
    start = 0;
  }

  var stream = hyperquest.post('http://na.op.gg/ranking/ajax/ladders.json/', {headers: HEADERS});
  stream
    .pipe(JSONStream.parse())
    .on('root', function(obj) {
      var ret = [];
      obj.items.forEach(function(item) {
        var $ = cheerio.load(item);
        $('.rankPreviousPosition').remove();

        var summoner = {};

        summoner.username = stripNewlines($('.summonerName').text());
        summoner.rank = parseInt(stripNewlines($('.Rank').text()), 10);
        summoner.league = stripNewlines($('.tierRank').text());

        summoner.lp = stripNewlines($('.summonerLeaguePoint').text());
        summoner.lp = normalizeLP(summoner.lp);
        summoner.lp = parseInt(summoner.lp, 10);

        summoner.wins = parseInt($('div.bar.blue').text(), 10);
        summoner.losses = parseInt($('div.bar.red').text(), 10);

        ret.push(summoner);
      });
      callback(null, ret);
    })
    .on('error', function(error) {
      callback(error);
    });
  stream.end(querystring.stringify({start: start}));
}

module.exports = ladder;

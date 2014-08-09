var ladder = require('../');
var test = require('tape');
var isArray = require('lodash.isarray');
var isFunction = require('lodash.isfunction');
var isNull = require('lodash.isnull');
var isNumber = require('lodash.isnumber');
var forEach = require('lodash.foreach');

test('exports a function', function(t) {
  t.plan(1);
  t.ok(isFunction(ladder));
});

test('no `start` parameter starts array at top player', function(t) {
  t.plan(4);
  t.doesNotThrow(function() {
    ladder(function(error, players) {
      t.ok(isNull(error));
      t.ok(isArray(players));

      // Ensure that no `start` parameter returns an _Array_ that begins with
      // the top player.
      t.equal(players[0].rank, 1);
    });
  });
});

test('`start` parameter starts array at appropriate rank', function(t) {
  t.plan(4);
  t.doesNotThrow(function() {
    ladder(30, function(error, players) {
      t.ok(isNull(error));
      t.ok(isArray(players));
      t.equal(players[0].rank, 31);
    });
  });
});

test('converts lp to a number', function(t) {
  t.plan(30);
  ladder(function(error, players) {
    forEach(players, function(player, index) {
      t.ok(isNumber(player.lp));
    });
  });
});

test('converts wins to a number', function(t) {
  t.plan(30);
  ladder(function(error, players) {
    forEach(players, function(player, index) {
      t.ok(isNumber(player.wins));
    });
  });
});

test('converts losses to a number', function(t) {
  t.plan(30);
  ladder(function(error, players) {
    forEach(players, function(player, index) {
      t.ok(isNumber(player.losses));
    });
  });
});
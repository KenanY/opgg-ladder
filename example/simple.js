var ladder = require('../');

ladder(function(error, response) {
  if (error) {
    throw error;
  }

  console.log(response);
  // => [
  // =>   {
  // =>     username: 'Turtle the Cat',
  // =>     rank: 1,
  // =>     league: 'Challenger 1',
  // =>     lp: 1264,
  // =>     wins: 211,
  // =>     losses: 140
  // =>   },
  // =>
  // =>   ...
  // =>
  // =>   {
  // =>     username: 'PorpoiseDeluxe',
  // =>     rank: 30,
  // =>     league: 'Challenger 1',
  // =>     lp: 681,
  // =>     wins: 408,
  // =>     losses: 348
  // =>   }
  // => ]
});
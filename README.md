# opgg-ladder

Get [op.gg](http://op.gg/)'s ladder rankings.

The response returned by op.gg is plagued with HTML, which no one wants to work
with. opgg-ladder extracts all the important information for you and simply
returns an _Array_ of the top League of Legends players.

## Example

``` javascript
var ladder = require('opgg-ladder');

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
```

## Installation

``` bash
$ npm install opgg-ladder
```

## API

``` javascript
var ladder = require('opgg-ladder');
```

### `ladder([start=0], callback)`

Queries op.gg for the top 30 players starting at optional index `start`
(defaults to `0`). Calls `callback(error, players)` when response arrives.
`players` is an _Array_ of _Objects_.
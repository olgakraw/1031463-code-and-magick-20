'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_GAP = 50;
var TEXT_GAP = 20;
var BAR_X = 140;
var BAR_Y = 260;
var BAR_WIDTH = 40;
var BAR_HEIGHT_MAX = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

function getRandom() {
  return Math.random() * 100;
}

var getBarColor = function (player) {
  var barColor;

  if (player === 'Вы') {
    barColor = 'rgba(255, 0, 0, 1)';
  } else {
    barColor = 'hsl(240, ' + getRandom(100) + '%, 50%)';
  }
  return barColor;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 30);
  ctx.fillText('Список результатов:', 120, 50);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(players[i], BAR_X + (BAR_WIDTH + BAR_GAP) * i, BAR_Y);
    ctx.fillStyle = getBarColor(players[i]);
    ctx.fillRect(BAR_X + (BAR_WIDTH + BAR_GAP) * i, BAR_Y - TEXT_GAP, BAR_WIDTH, -(times[i] * BAR_HEIGHT_MAX) / maxTime);
    ctx.fillStyle = 'black';
    ctx.fillText(Math.round(times[i]), BAR_X + (BAR_WIDTH + BAR_GAP) * i, BAR_Y - TEXT_GAP - times[i] * BAR_HEIGHT_MAX / maxTime - TEXT_GAP);
  }
};

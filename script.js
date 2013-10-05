// Constants.
var width = 700;
var height = 700;
var startingNumEnemies = 6;
var enemyRadius = 8;
var startingMoveInt = 3000;
var boundaryFactor = Math.sqrt(2);
var flashSpeed = 100;
var scoreMultiplier = 9;

// Global variables.
var score = 0;
var highScore = 0;
var currentNumEnemies = startingNumEnemies;
var currentMoveInt = startingMoveInt;
var level = 1;

// Helper functions.
var genEnemyLocations = function (){
  var enemyArr = [];
  for(var i = 0; i < currentNumEnemies+1; i++) {
    enemyArr.push({x:Math.random()*(width-enemyRadius*2)+enemyRadius,
      y:Math.random()*(height-enemyRadius*2)+enemyRadius});
  }
  return enemyArr;
};

var moveEnemies = function() {
  d3.selectAll('circle.enemy').data(genEnemyLocations())
  .transition().duration(currentMoveInt)
    .delay(function(d) {return Math.random()*currentMoveInt;})
    .tween('custom', collisionTween);
  setTimeout(moveEnemies, currentMoveInt);
};

var checkCollision = function(enemy) {
  var playerX = player.datum().x + enemyRadius;
  var playerY = player.datum().y + enemyRadius;

  var enemyX = parseFloat(enemy.attr("cx"));
  var enemyY = parseFloat(enemy.attr("cy"));
  if(Math.pow(enemyX - playerX,2) + Math.pow(enemyY - playerY, 2) < 4*enemyRadius*enemyRadius) {
    score = 0;
    playerHitFlash();
    level = 1;
    d3.select('.level').text(level);
    currentMoveInt = startingMoveInt;
    currentNumEnemies = startingNumEnemies;
    removeEnemies();
  }
};

var playerHitFlash = function() {
  player.style('fill', 'none');
  setTimeout(function() {player.style('fill', '#0C0');}, flashSpeed);
  setTimeout(function() {player.style('fill', 'none');}, flashSpeed*2);
  setTimeout(function() {player.style('fill', '#0C0');}, flashSpeed*3);
  setTimeout(function() {player.style('fill', 'none');}, flashSpeed*4);
  setTimeout(function() {player.style('fill', '#0C0');}, flashSpeed*5);
};

var levelUpFlash = function(deEl) {
  var currentColor = deEl.style('stroke');
  var currentRed = currentColor[1];
  var currentGreen = currentColor[2];
  var newColor = "#" + (1+currentRed) + (currentGreen-1) + 0;
  deEl.transition().
  style('stroke', newColor);
};

var incrementScore = function() {
  score++;
  d3.select('.score').text(score);
  if (score > highScore) {
    highScore = score;
    d3.select('.highScore').text(highScore);
  }

  if(score > 25*Math.pow(level, 1.7)) {
    currentMoveInt *= 0.9;
    currentNumEnemies += 2;
    addNewEnemies();
    levelUpFlash(d3.selectAll('circle.boundary'));
    level++;
    d3.select('.level').text(level);
  }
  setTimeout(incrementScore, Math.sqrt(currentMoveInt)*scoreMultiplier/(currentNumEnemies));
};

var collisionTween = function(endPoint) {
  var enemy = d3.select(this);
  var startX = parseFloat(enemy.attr("cx"));
  var startY = parseFloat(enemy.attr("cy"));

  return function (t) {
    checkCollision(enemy);
    enemy.attr('cx', startX + (endPoint.x - startX)*t);
    enemy.attr('cy', startY + (endPoint.y - startY)*t);
  };
};

var addNewEnemies = function() {
  d3Canvas.selectAll('circle').data(genEnemyLocations)
  .enter().append('circle')
  .attr('class', 'enemy')
  .attr('r', enemyRadius)
  .attr('cy', function (d) { return d.y;})
  .attr('cx', function (d) { return d.x;})
  .style('fill', 'red');
  moveEnemies();
};

var removeEnemies = function() {
  d3Canvas.selectAll("circle.enemy").data(genEnemyLocations).exit().remove();
};

// Initialize game.
var d3Canvas = d3.select('.container')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

var boundary = d3Canvas.append('circle')
  .attr('r', enemyRadius + height/(2*boundaryFactor))
  .attr('cx', width/2)
  .attr('cy', height/2)
  .attr('class', 'boundary')
  .style('stroke', '#0C0')
  .style('stroke-width', 7);

var player = d3Canvas.selectAll('rect').data([{x:width/2, y:height/2}])
  .enter()
  .append('rect')
  .attr('x', function (p) { return p.x;})
  .attr('y', function (p) { return p.y;})
  .attr('rx', 3)
  .attr('ry', 3)
  .attr('width', enemyRadius*2)
  .attr('height', enemyRadius*2)
  .style('fill', '#0C0');

d3Canvas.on('mousemove', function(clickEvent) {
  var coordinates = d3.mouse(this);
  var mX = coordinates[0] - width/2 + enemyRadius;
  var mY = coordinates[1] - height/2 + enemyRadius;
  if(mX * mX + mY * mY < height*height/(4*boundaryFactor*boundaryFactor)) {
    player.data([{x:coordinates[0], y:coordinates[1]}])
          .attr('x', function (d) { return d.x;})
          .attr('y', function (d) { return d.y;});
  }
});

// Make everything move!

addNewEnemies();
moveEnemies();
incrementScore();






















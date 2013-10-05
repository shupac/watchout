// Global variables.
var width = 700;
var height = 700;
var numEnemies = 20;
var enemyRadius = 8;
var moveInt = 1800;
var score = 0;
var highScore = 0;
var boundaryFactor = Math.sqrt(2);

// Helper functions.
var genEnemyLocations = function (){
  var enemyArr = [];
  for(var i = 0; i < numEnemies; i++) {
    enemyArr.push({x:Math.random()*(width-enemyRadius*2)+enemyRadius,
      y:Math.random()*(height-enemyRadius*2)+enemyRadius});
  }
  return enemyArr;
};

var moveEnemies = function() {
  enemies.data(genEnemyLocations)
  .transition().duration(moveInt)
    .delay(function(d) {return Math.random()*moveInt;})
    .tween('custom', collisionTween);
};

var checkCollision = function(enemy) {
  var playerX = player.datum().x + enemyRadius;
  var playerY = player.datum().y + enemyRadius;

  var enemyX = parseFloat(enemy.attr("cx"));
  var enemyY = parseFloat(enemy.attr("cy"));
  if(Math.pow(enemyX - playerX,2) + Math.pow(enemyY - playerY, 2) < 4*enemyRadius*enemyRadius) {
    score = 0;
  }

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


// Initialize game.
var d3Canvas = d3.select('.container')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

var boundary = d3Canvas.append('circle')
  .attr('r', enemyRadius + height/(2*boundaryFactor))
  .attr('cx', width/2)
  .attr('cy', height/2)
  .style('stroke', '#0C0')
  .style('stroke-width', 7);

var enemies = d3Canvas.selectAll('circle').data(genEnemyLocations)
  .enter()
  .append('circle')
  .attr('r', enemyRadius)
  .attr('cy', function (d) { return d.y;})
  .attr('cx', function (d) { return d.x;})
  .style('fill', 'red');

var enemyMover = setInterval(moveEnemies, moveInt);
var scoreTimer = setInterval(function() {
  score++;
  d3.select('.score').text(score);
  if (score > highScore) {
    highScore = score;
    d3.select('.highScore').text(highScore);
  }
}, 25);


var player = d3Canvas.selectAll('rect').data([{x:width/2, y:height/2}])
  .enter()
  .append('rect')
  .attr('x', function (p) { return p.x;})
  .attr('y', function (p) { return p.y;})
  .attr('rx', 3)
  .attr('ry', 3)
  .attr('width', enemyRadius*2)
  .attr('height', enemyRadius*2)
  .style('fill', 'white');

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





















// Global variables.
var width = 700;
var height = 500;
var numEnemies = 20;
var enemyRadius = 7;
var moveInt = 1000;

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
  .transition().duration(moveInt).delay(function(d) {return Math.random()*moveInt;})
  .ease('linear').attr('cy', function (d) { return d.y;})
  .attr('cx', function (d) { return d.x;});
};

// Initialize game.
var d3Canvas = d3.select('.container')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

var enemies = d3Canvas.selectAll('circle').data(genEnemyLocations)
  .enter()
  .append('circle')
  .attr('r', enemyRadius)
  .attr('cy', function (d) { return d.y;})
  .attr('cx', function (d) { return d.x;})
  .style('fill', 'red');

var enemyMover = setInterval(moveEnemies, moveInt);

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
  player.data([{x:coordinates[0], y:coordinates[1]}])
        .attr('x', function (d) { return d.x;})
        .attr('y', function (d) { return d.y;});
});























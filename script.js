// Global variables.
var width = 600;
var height = 400;
var numEnemies = 5;
var enemyRadius = 7;

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
  enemies.data(genEnemyLocations).transition().attr('cy', function (d) { return d.y;})
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

var enemyMover = setInterval(moveEnemies, 1000);
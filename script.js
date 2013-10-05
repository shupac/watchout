var width = 600;
var height = 400;
var numEnemies = 5;


var genEnemies = function (){
  var enemyArr = [];
  for(var i = 0; i < numEnemies; i++) {
    enemyArr.push({id:i, x:Math.random()*width, y:Math.random()*height});
  }
  return enemyArr;
};

var enemyData = genEnemies();
var d3Canvas = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

var enemies = d3Canvas.selectAll('circle').data(enemyData)
  .enter()
  .append('circle')
  .attr('r', 10)
  .attr('cy', function (d) { return d.y;})
  .attr('cx', function (d) { return d.x;})
  .style('fill', 'red');


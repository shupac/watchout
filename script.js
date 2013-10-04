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

var enemyArr = genEnemies();
d3.select('body')
  .selectAll('.enemy')
  .data(enemyArr)
  .enter()
  .append('div')
  .attr('class','enemy')
  .style('top', function (d) { return d.y + 'px';})
  .style('left', function (d) { return d.x + 'px';});
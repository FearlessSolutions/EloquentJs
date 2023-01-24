let arrays = [[1, 2, 3], [4, 5], [6]];
var flattArray = arrays.reduce (function(flat, curr){ return flat.concat(curr);})
console.log (flattArray);
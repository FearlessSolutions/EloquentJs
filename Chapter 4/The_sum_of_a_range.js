function range(start, end, step) {
  let array = [];
  if (start < end)
  {
	  step = step || 1;
  }
  else
  {
  step = step || -1
  }
	let i = start;
    while (i != end) 
	{	
		array.push(i);
		 i += step;
	}
  array.push(i);
  return array;
}
let s1 = 0;
function sum(array) {
	if (array.length == 0)
		return 0;
	console.log (array[array.length-1]);
	s1 += array[array.length-1];
	array.splice (array.length-1,1);
	
	sum (array);
	return s1;
}

console.log(range(1, 10))
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 11)));
// → 55
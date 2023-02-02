// Your code here.
let l = null;
let i = 0
function arrayToList(array) {
  if (array.length == 0)
		return l;
	
	l = {value: array[array.length - 1], rest: l};
	array.splice(array.length -1, 1);
	return arrayToList(array);
  
}

let array = [];
function listToArray(list) {
	if (list == null)
	{
		return array;
	}
	array.push(list.value);
	return listToArray(list.rest);
}

function prepend(value, list) {
  return {value, rest: list};
}

function nth(list, n) {
  if (list == null) 
	  return NaN;
  else if (n == 0) 
  {  
	return list.value;
  }
  return nth(list.rest, n - 1);
}
console.log(arrayToList([10, 20]));
l = null;
// → {value: 10, rest: {value: 20, rest: null}}

console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20

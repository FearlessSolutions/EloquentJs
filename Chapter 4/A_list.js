let l = null;
let i = 0
function arrayToList(array) {
  if (array.length == i)
		return l;
	
	l = {value: array[i++], rest: l};
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


console.log(arrayToList([10, 20, 30]));

console.log(listToArray(arrayToList([10, 20, 30])));

console.log(prepend(10, prepend(20, null)));

console.log(nth(arrayToList([10, 20, 30]), 1));

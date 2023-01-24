function every(array, predicate) 
{
  for (let element of array) 
  {
    if (!predicate(element)) 
    {
        return false;
    }
  }
  return true;
}

function every2(array, predicate) 
{
  return !array.some(element => !predicate(element));
}

console.log(every2([1, 3, 5], n => n < 10));
// → true
console.log(every2([2, 4, 10], n => n < 10));
// → false
console.log(every2([], n => n < 10));
// → true
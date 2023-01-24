function reverseArray(array) {
  let rArray = [];
  let i = array.length-1;
  while (i > -1)
  {
      rArray.push (array[i]);
      i--;
  }
  return rArray;
}

function reverseArrayInPlace(array) {
    let mid = Math.floor (array.length/2);
    let i = 0;
    while (i <= mid)
    {
        let temp = array[i];
        array[i] = array.length-i;
        array[array.length -1 - i] = temp;
        i++;
    }
  return array;
}

console.log(reverseArray([7, 6, 5, 4, 3, 2, 1]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5, 6, 7];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]

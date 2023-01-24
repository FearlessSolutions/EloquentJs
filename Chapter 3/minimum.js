function FindMin(var1, var2) {
  if (var2 < var1) 
	  return var2;
  else if (var1 < var1) 
	  return var1;
  else
  {
	  return "both numbers are equal";
  }
}

let v1 = 100, v2 = 20;
console.log(FindMin(v1, v2));
// → 0
console.log(FindMin(v2, v2));
// → -10


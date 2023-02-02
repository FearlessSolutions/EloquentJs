function FindMin(var1, var2) {
  if (var2 < var1) 
	  return var2;
  else if (var1 < var2) 
	  return var1;
  else
  {
	  return var1;
  }
}

console.log(FindMin(0, 10));
// → 0
console.log(FindMin(0, -10));
// → -10
// → -10

function countChar(sentece, ch) {
  let counter = 0, i = 0;
  while (i < sentece.length) {
    if (sentece[i] == ch) 
	{
      counter++;  
    }
    i++;
  }
  return counter;
}
function countBs(sentece) {
  counter = countChar(sentece, "B");
  return counter;
}

console.log(countBs("BARBERBB"));

console.log(countChar("kakkerlak", "k"));

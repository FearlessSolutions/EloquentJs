function loop(it, condition, Iterator, print) 
{
    let j = it;
  while ( condition(j)) 
  {
    print(j);
    j = Iterator(j)
  }
}

loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1
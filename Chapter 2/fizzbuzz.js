let i = 1;
while (i <= 100) {
    let print = "";
  let output = "";
  if (i % 3 == 0) 
      print = print + "Fizz"
  if (i % 5 == 0)
	  print = print + "Buzz";
  if (i % 3 != 0 && i % 5 != 0) 
	  print = print + i
  i++
  console.log (print);
}


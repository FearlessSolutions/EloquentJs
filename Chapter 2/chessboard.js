let size = 8;

let board = "";
let i = 0;
let flag = true;
while (i < size) 
{
	let j = 0;
	if (i % 2 == 0)
	{board += " ";}
	
	while (j < size) 
	{
		if (flag == true) 
		{
			board += " ";
			flag = false;
		} 
		else 
		{
			board += "#";
			flag = true;
		}
		
		j++;
		
	}
	if (flag == true)
	{flag = false;}

  board += "\n";
  i++;
}

console.log(" "+board);


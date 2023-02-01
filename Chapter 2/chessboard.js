let size = 3;

let board = "";
let i = 0;
let flag = true;
while (i < size) 
{
	let j = 0;

	
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


  board += "\n";
  i++;
}

console.log(" "+board);

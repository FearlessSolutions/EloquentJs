let size = 8;

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
	if(size % 2 == 0)
	{
	    flag = ! flag;
	}


  board += "\n";
  i++;
}

console.log(board);

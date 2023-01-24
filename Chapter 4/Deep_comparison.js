function deepEqual(a, b) {
  if (a === b) 
	{  
		return true;
	}
  if (a == null || typeof a != "object" || b == null || typeof b != "object") 
	{
		return false;
	}

  let kA = Object.keys(a), kB = Object.keys(b);

  if (kA.length != kB.length) return false;

  for (let key of kA) 
	{
		let flag = kB.includes(key) && deepEqual(a[key], b[key]);
		if (flag) continue;
		return false;
		//}
	}

  return true;
}

let obj = {name: "item", Book: "Eloquent_JavaScript"};
console.log(deepEqual(obj, {name: "item", Book: "Eloquent_Java"}));

console.log(deepEqual(obj, obj));

console.log(deepEqual(obj, {item: "item", Book: "Eloquent_JavaScript"}));


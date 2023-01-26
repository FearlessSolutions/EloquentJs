class Group 
{

  constructor() 
  {
    this.set = [];
  }

  add(val) 
  {
    if (!this.has(val)) 
    {
      this.set.push(val);
    }
  }

  delete(val) 
  {
      if (this.has(val))
      {
            this.set.splice(this.set.indexOf(val),1);
      }
  }

  has(val) 
  {
        return this.set.includes(val);
  }

  static from(array) 
  {
    let g = new Group ();
    for (let i of array) 
    {
        g.add(i);
    }
    return g;
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
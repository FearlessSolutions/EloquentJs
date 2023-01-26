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
  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

class GroupIterator 
{
  constructor(group) 
  {
    this.group = group;
    this.index = 0;
  }

  next() 
  {
    if (this.index >= this.group.set.length) 
    {
      return {done: true};
    } 
    let val = {value: this.group.set[this.index], done: false};
      this.index++;
      return val;
  }
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c
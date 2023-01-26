class Vec 
{
  constructor(x, y) 
  {
    this.x = x;
    this.y = y;
  }

  plus(v1) 
  {
    var v = new Vec (this.x + v1.x, this.y + v1.y);
    return v;
  }

  minus(v1) 
  {
    var v = new Vec (this.x - v1.x, this.y - v1.y);
    return v;
  }

  get length() 
  {
    return Math.pow(Math.pow(this.x, 2) + Math.pow(this.y, 2),1/2);
  }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5

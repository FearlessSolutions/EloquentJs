// Class PGroup implements a group of values with functional updates
class PGroup {
    // Constructor initializes the values in the group
    constructor(values) {
      this.values = values;
    }
  
    // add method adds a value to the group
    // If the value is already in the group, it returns the same group
    // Otherwise, it returns a new group with the value added
    add(value) {
      if (this.has(value)) return this;
      return new PGroup([...this.values, value]);
    }
  
    // delete method deletes a value from the group
    // If the value is not in the group, it returns the same group
    // Otherwise, it returns a new group with the value removed
    delete(value) {
      if (!this.has(value)) return this;
      return new PGroup(this.values.filter(v => v !== value));
    }
  
    // has method returns a boolean indicating whether the value is in the group
    has(value) {
      return this.values.includes(value);
    }
  }
  
  // Empty group is an instance of PGroup with no values
  PGroup.empty = new PGroup([]);
  
  // Tests for the PGroup class
  let a = PGroup.empty.add("a");
  let ab = a.add("b");
  let b = ab.delete("a");
  
  console.log(b.has("b")); // true
  console.log(a.has("b")); // false
  console.log(b.has("a")); // false
  
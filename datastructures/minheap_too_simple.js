/**
 * @ author Aaron Elligsen (http://github.com/hath995/)
 */
/*
 * This is a slightly simplified implementation of a minheap. It is not sufficient to solve some
 * of the questions, but it makes the explaining a bit easier because it is not as general.
 **/
//DO NOT USE, USE THE OTHER FILE,
function Heap(stuff) {
  this.items = stuff || [];
  this.buildheap();
}

Heap.prototype.minheapify = function(index) {
  var left = 2*index;
  var right = 2*index+1;
  var smallest = index;
  if(left <= this.items.length && this.items[left-1] < this.items[smallest-1]) {
    smallest = left;
  }
  if(right <= this.items.length && this.items[right-1] < this.items[smallest-1]) {
    smallest = right;
  }
  if(smallest != index) {
    var temp = this.items[smallest-1];
    this.items[smallest-1] = this.items[index-1];
    this.items[index-1] = temp;
    this.minheapify(smallest);
  }
}

Heap.prototype.buildheap = function() {
  for(var i = Math.floor(this.items.length/2); i >= 1; i--) {
    this.minheapify(i);
  }
}

Heap.prototype.top = function() {
  var top = this.items[0];
  this.items[0] = this.items[this.items.length-1];
  this.minheapify(1);
  this.items.length = this.items.length-1;
  return top;
}

Heap.prototype.insert = function(num) {
  this.items[this.items.length] = num;
  var current = this.items.length;
  var parent = Math.floor((current-1)/2);
  while(this.items[current - 1] < this.items[parent - 1]) {
    var temp = this.items[current - 1];
    this.items[current - 1] = this.items[parent - 1];
    this.items[parent - 1] = temp;
    current = parent;
    parent = Math.floor((current-1)/2);
  }
}

Heap.prototype.parent = function(i) {
  return Math.floor(i/2);
}

Heap.prototype.decreaseKey = function(location, newkey) {
  var i = location;
  this.items[i-1] = newkey;
  console.log(i, this.parent(i), this.items[i], this.items[this.parent(i)-1], this.items[i] < this.items[this.parent(i)-1]);
  while(i > 1 && this.items[i-1] < this.items[this.parent(i)-1])
  {
    console.log(i, this.parent(i), this.items[this.parent(i)-1] );
    var temp = this.items[this.parent(i)-1];
    this.items[this.parent(i)-1] = this.items[i-1];
    this.items[i-1] = temp;
    i = this.parent(i);
  }
}

var stuff = new Heap([100,10,11,12,23,1,2,3,4,7,8,92]);
stuff.insert(-1);
stuff.insert(-3);
stuff.insert(-4);
stuff.insert(-10);
stuff.decreaseKey(16,-20); 

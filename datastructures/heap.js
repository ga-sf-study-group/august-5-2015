/* @flow */
/**
 * @ author Aaron Elligsen (http://github.com/hath995/)
 */
function Heap(data, comparator /*comparator: (a,b) => Boolean */)
{
  this.comparator = comparator || function(a,b) { return a < b; };
  this.data = data;
  
  this.buildHeap();
}

Heap.prototype.heapify = function(i){
  var left = 2*i;
  var right =2*i+1;
  var minmax=i;
  if(left-1 < this.data.length) {
    if(this.comparator(this.data[left-1],this.data[minmax-1]))
    {
      minmax = left;
    }
  }
  if(right-1 < this.data.length) {
    if(this.comparator(this.data[right-1],this.data[minmax-1]))
    {
      minmax = right;
    }
  }
  if(minmax != i)
  {
    var temp = this.data[i-1];
    this.data[i-1] = this.data[minmax-1];
    this.data[minmax-1] = temp;
    this.heapify(minmax);
  }
};


Heap.prototype.buildHeap = function() {
  for(var i=Math.floor(this.data.length/2); i >0 ; i--)
  {
    this.heapify(i);
  }
}

Heap.prototype.empty = function() {
  return this.data.length >0;
}

Heap.prototype.extractTop = function() {
  if(this.data.length <1)
  {
    return null;
  }
  var top = this.data[0];
  this.data[0] = this.data[this.data.length-1];
  this.data.length -=1;
  this.heapify(1);
  return top;
}

Heap.prototype.insert = function(x) {
  this.data.length +=1;
  this.data[this.data.length-1] = x;
  var i = this.data.length;
  while(i > 1 && this.comparator(this.data[i-1],this.data[this.parent(i)-1]))
  {
    var temp = this.data[this.parent(i)-1];
    this.data[this.parent(i)-1] = this.data[i-1];
    this.data[i-1] = temp;
    i = this.parent(i);
  }
}

Heap.prototype.peek = function(X) {
  if(this.data.length > 0) {
    return this.data[0];
  }
  return null;
}

Heap.prototype.size = function() {
  return this.data.length;
}

Heap.prototype.parent = function(i) {
  return Math.floor(i/2);
}

module.exports = Heap;

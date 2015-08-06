var Heap = require('./heap');
//1
//
function Stack() {
  this.items = new Heap([], function(a, b) {
    return a.key > b.key;
  });
  this.tick = 1;
  this.push = function(value) {
    this.items.insert({
      value: value,
      key: this.tick++
    });
  }
  this.pop = function() {
    var item = this.items.extractTop();
    if (item) {
      return item.value;
    }
    return item;
  }
}

//var testStack = new Stack();
//testStack.push("Toast");
//testStack.push("Bagel");
//testStack.push("Cereal");
//console.log(testStack.items);
//console.log(testStack.pop());
//console.log(testStack.pop());
//console.log(testStack.pop());



//2
//
function Queue() {
  this.items = new Heap([], function(a, b) {
    return a.key <= b.key;
  });
  this.tick = 1;
  this.enqueue = function(value) {
    this.items.insert({
      value: value,
      key: this.tick++
    });
  }
  this.dequeue = function() {
    var item = this.items.extractTop();
    if (item) {
      return item.value;
    }
    return item;
  }
}

//var testQueue = new Queue();
//testQueue.enqueue("Toast");
//testQueue.enqueue("Bagel");
//testQueue.enqueue("Cereal");
//console.log(testQueue.items);
//console.log(testQueue.dequeue());
//console.log(testQueue.dequeue());
//console.log(testQueue.dequeue());

//3
//
function heapsort(array, comparator) {
  var heap = new Heap(array.slice(), comparator);
  var result = [];
  var val;
  while((val = heap.extractTop()) !== null) {
    result.push(val);
  }
  return result;
}

//var data = [9,8,7,6,5,4,3,2,1];
//console.log(heapsort(data, function(a,b) { return a < b; }));


//4
//
function getKthLargest(array, k, comparator) {
  var heap = new Heap(array.slice(), comparator);
  var val;
  for(var i = 0; i < k; i++) {
    val = heap.extractTop()
  }
  return val;
}

//var data = [9,8,7,6,5,4,3,2,1];
//console.log(getKthLargest(data, 4, function(a,b) { return a > b; }));
//


//5
//
function MedianHeap() {
  this.smallHalfMax = new Heap([], function(a, b) {return a > b });
  this.bigHalfMin = new Heap([], function(a,b) {return a < b })
  this.insert = function(key) {
    var currentMedian = this.getMedian();
    if(key > currentMedian) {
      this.bigHalfMin.insert(key);
    } else {
      this.smallHalfMax.insert(key);
    }

    if(this.smallHalfMax.size()-this.bigHalfMin.size() > 1) {
      var movekey = this.smallHalfMax.extractTop();
      this.bigHalfMin.insert(movekey);
    } else if(this.smallHalfMax.size()-this.bigHalfMin.size() < -1) {
      var movekey = this.bigHalfMin.extractTop();
      this.smallHalfMax.insert(movekey);
    }
  }

  this.getMedian = function() {
    if(this.smallHalfMax.size() > this.bigHalfMin.size()) {
      return this.smallHalfMax.peek();
    } else if (this.smallHalfMax.size() < this.bigHalfMin.size()) {
      return this.bigHalfMin.peek();
    }else{
      return (this.smallHalfMax.peek() + this.bigHalfMin.peek())/2;
    }

  }
  
}
var medianheap = new MedianHeap();
medianheap.insert(1);
console.log(medianheap);
console.log(medianheap.getMedian());

medianheap.insert(2);
console.log(medianheap.getMedian());
console.log(medianheap);

medianheap.insert(3);
console.log(medianheap.getMedian());
console.log(medianheap);

medianheap.insert(4);
console.log(medianheap.getMedian());
console.log(medianheap);

medianheap.insert(5);
console.log(medianheap.getMedian());
console.log(medianheap);

medianheap.insert(6);
console.log(medianheap.getMedian());
console.log(medianheap);

medianheap.insert(8);
console.log(medianheap.getMedian());
console.log(medianheap);

//6
//
function combineSortedLists(lists, comparator) {
  var total = 0;
  var heap = new Heap([], comparator);
  for(var i = 0; i < lists.length; i++) {
    total += lists[i].length;
    heap.insert({
      value: i,
      key: lists[i].pop()
    })
  }
  var result = [];
  for(var i = 0; i < total; i++) {
    smallest = heap.extractTop();
    result.push(smallest.key);
    if(lists[smallest.value].length > 0) {
      heap.insert({
        value: smallest.value,
        key: lists[smallest.value].pop()
      })
    }
  }
  return result;
}

var lists = [
  [41, 31, 22, 18, 8],
  [85, 80, 30, 21, 19],
  [95, 70, 61, 32, 10],
  [92, 68, 51, 18, 11],
];
//console.log(combineSortedLists(lists,function(a,b) {
//  return a.key < b.key;
//}));

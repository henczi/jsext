var arr = [1, 2, 3, 55, 66, 42, 107, 576, 23, 99, 651];
var sarr = SliceableArray(arr);

console.log(sarr["1"]); // 2
console.log(sarr["1:3"]); // [2. 3]
console.log(sarr["2:8:2"]); // [3, 66, 107]
console.log(sarr["1:-5"]); // [2, 3, 55, 66, 42]
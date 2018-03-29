'use strict';

var i = 1, j = 1, k = 0;
var fibonacci = [i, j];

while (k <= 100) {
    k = i + j;
    i = j;
    j = k;
    fibonacci.push(k);
}

for (let i of fibonacci) {
    console.log(i);
}

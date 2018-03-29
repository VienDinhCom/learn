function outside(x) {
    function inside(y) {
        return x + y;
    }
    return inside;
}

fn_inside = outside(3);
console.log(fn_inside);

result = fn_inside(5); // #=> 8
console.log(result);

result1 = outside(3)(5); // #=> 8
console.log(result1);


// http://ktmt.github.io/blog/2013/05/12/closure-va-scope-cua-javascript/

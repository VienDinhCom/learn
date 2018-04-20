function foo() {
    var bar;
    quux = 7;
    function zip() {
        var quux;
        bar = true;
    }
    return zip;
}

// foo()(); Lần đầu tiên thấy :D

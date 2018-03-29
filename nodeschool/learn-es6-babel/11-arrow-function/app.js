var inputs = process.argv.slice(2);

var result = inputs.map((element)=> element[0])
                   .reduce((previous, current)=> {
                       return previous + current;
                   });

console.log(result);

//Calculates the ending time of a musical expression
var endTime = function (time, expr) {
    if (expr.tag === 'note') return time + expr.dur;
    else return endTime(endTime(time, expr.left), expr.right);
};

// reverses an abstract syntax tree of musical expressions
var reverse = function(expr) {
    if (expr.tag === 'note') return expr;
    else return {
        tag: 'seq',
        left: reverse(expr.right),
        right: reverse(expr.left)
    };
};

// Compiles a musical expression into notes
var compile = function (musexpr, start) {
    var expr = [];
    start = start || 0;
    if (musexpr.tag === 'note') {
        expr.push({ tag:'note', 
                   pitch: musexpr.pitch, 
                   start: start,
                   dur: musexpr.dur
                  });
    } else {
        compile(musexpr.left, start).forEach(function(x) {expr.push(x);});
        start = expr[expr.length-1].start + expr[expr.length-1].dur;
        compile(musexpr.right, start).forEach(function(x) {expr.push(x);});
    }  
    return expr;
};
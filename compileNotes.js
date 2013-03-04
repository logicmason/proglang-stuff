//Calculates the ending time of a musical expression
var endTime = function (time, expr) {
  if (expr.tag === 'note') { return time + expr.dur; }
  else { return endTime(endTime(time, expr.left), expr.right); }
};

// reverses an abstract syntax tree of musical expressions
var reverse = function(expr) {
  if ((expr.tag === 'note') || (expr.tag === 'par') ||
    (expr.tag === 'repeat')) return expr;
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
  } else if (musexpr.tag === 'rest') {
    expr.push(musexpr);
  } else if (musexpr.tag === 'seq') {
    compile(musexpr.left, start).forEach(function(x) {expr.push(x);});
    start = expr[expr.length-1].start + expr[expr.length-1].dur;
    compile(musexpr.right, start).forEach(function(x) {expr.push(x);});
  } else if (musexpr.tag === 'par') {
    compile(musexpr.left, start).forEach(function(x) {expr.push(x);});
    compile(musexpr.right, start).forEach(function(x) {expr.push(x);});
  } else if (musexpr.tag === 'repeat') {
    _(musexpr.count).times(function() {
      expr.push(musexpr.section);
    });
  }
  return expr;
};

var noteToMidi = function(note) {
  if (!/[A-G][0-8]/.test(note)) throw("Not a valid note!  Must be a note between A0 and C8");
  var notes = {C: 0, D: 2, E:4, F: 5, G:7, A:9, B:11};
  var octave = parseInt(note[1], 10) + 1;
  return octave * 12 + notes[note[0]];
};
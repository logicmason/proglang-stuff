describe("Compile Notes", function() {
  var melody1_mus, melody2_mus, melody3_mus, melody1_note, melody2_notes,
  parallel_mus, parallel_note;

  beforeEach(function() {
    melody1_mus = { tag: 'note', pitch: 'a4', dur: 125 };
    melody1_note = [ { tag: 'note', pitch: 'a4', start: 0, dur: 125 } ];
    melody2_mus = 
    { tag: 'seq',
      left: 
       { tag: 'seq',
         left: { tag: 'note', pitch: 'a4', dur: 250 },
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'c4', dur: 500 },
         right: { tag: 'note', pitch: 'd4', dur: 500 } } };

    melody3_mus = 
    { tag: 'seq',
      left: 
       { tag: 'seq',
         left: { tag: 'note', pitch: 'd4', dur: 500 },
         right: { tag: 'note', pitch: 'c4', dur: 500 } },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'b4', dur: 250 },
         right: { tag: 'note', pitch: 'a4', dur: 250 } } };

    melody2_notes = [
      { tag: 'note', pitch: 'a4', start: 0, dur: 250 },
      { tag: 'note', pitch: 'b4', start: 250, dur: 250 },
      { tag: 'note', pitch: 'c4', start: 500, dur: 500 },
      { tag: 'note', pitch: 'd4', start: 1000, dur: 500 } ];

    parallel_mus = 
    { tag: 'seq',
      left: 
       { tag: 'par',
         left: { tag: 'note', pitch: 'c3', dur: 250 },
         right: { tag: 'note', pitch: 'g4', dur: 500 } },
      right:
       { tag: 'par',
         left: { tag: 'note', pitch: 'd3', dur: 500 },
         right: { tag: 'note', pitch: 'f4', dur: 250 } } };
    
    parallel_notes = [
      { tag: 'note', pitch: 'c3', start: 0, dur: 250 },
      { tag: 'note', pitch: 'g4', start: 0, dur: 500 },
      { tag: 'note', pitch: 'd3', start: 500, dur: 500 },
      { tag: 'note', pitch: 'f4', start: 500, dur: 250 } ];
  });

  describe("reverse sytax tree", function() {
    it("A single note should return itself", function() {
      expect(reverse(melody1_mus)).toEqual(melody1_mus);
    });

    it("A nested musical expression with multiple notes should reverse itself", function() {
      expect(reverse(melody2_mus)).toEqual(melody3_mus);
    });
  });
  

  it("A sequence with a single note should return and array with the note", function() {

    expect(compile(melody1_mus)).toEqual(melody1_note);
  });

  it("A complex musical expression should compile to notes", function() {
    expect(compile(melody2_mus)).toEqual(melody2_notes);
  });

  it("A sequence with parallel notes and sequences whould compile correctly", function() {
    expect(compile(parallel_mus)).toEqual(parallel_notes);
  });
});
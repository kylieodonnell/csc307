import mut from './module.js'; // MUT = Module Under Test

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('Testing div -- success', () => {
    const expected = 5;
    const got = mut.div(30, 6);
    expect(got).toBe(expected);
  });

test('Testing containsNumbers 1 -- success', () => {
    const expected = true;
    const got = mut.containsNumbers("aeio235");
    expect(got).toBe(expected);
  });

test('Testing containsNumbers 2 -- success', () => {
  const expected = true;
  const got = mut.containsNumbers("235");
  expect(got).toBe(expected);
});

test('Testing containsNumbers 3 -- success', () => {
  const expected = false;
  const got = mut.containsNumbers("aeio");
  expect(got).toBe(expected);
});

test('Testing containsNumbers 4 -- success', () => { // this test fails
  const expected = false;
  const got = mut.containsNumbers("ae io"); // old containsNumbers function marks spaces as true 
  expect(got).toBe(true); // change it to false to test the tdd assignment 
});
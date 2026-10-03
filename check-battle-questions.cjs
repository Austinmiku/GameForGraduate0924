const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '歷史文物守護行動完整版.html'), 'utf8');
const script = html.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1].split('document.querySelector("#largeBtn").onclick=')[0];
const app = { focus() {} };
const progress = { setAttribute() {} };
const document = {
  querySelector(selector) { return { '#app': app, '#progress': progress }[selector] || null; },
  querySelectorAll() { return []; },
};
const context = vm.createContext({
  document,
  location: { search: '?seed=115' },
  localStorage: { getItem() { return '{}'; }, setItem() {} },
  URLSearchParams,
  console,
  Math,
});
vm.runInContext(script, context);

assert.deepEqual(Array.from(vm.runInContext('difficulties.map(d=>d.enemy)', context)), [3, 4, 5, 5, 6, 7, 8, 9]);
for (let level = 1; level <= 8; level++) {
  for (let entry = 1; entry <= 20; entry++) {
    const deck = JSON.parse(vm.runInContext(`state.level=${level};state.entry=${entry};JSON.stringify(makeDeck())`, context));
    const expected = vm.runInContext(`questionsForLevel(${level})`, context);
    assert.equal(deck.length, expected, `level ${level} question count must match enemy HP`);
    assert.equal(new Set(deck.map(question => question.text)).size, expected, `level ${level} battle contains duplicate questions`);
  }
}

console.log('HP-scaled battle question counts and uniqueness passed');

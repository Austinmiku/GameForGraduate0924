const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '歷史文物守護行動完整版.html'), 'utf8');
const script = html.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1].split('document.querySelector("#largeBtn").onclick=')[0];
let cards, go, count, back;
const app = { focus() {} };
const progress = { setAttribute() {} };
Object.defineProperty(app, 'innerHTML', { set(markup) {
  this.markup = markup;
  cards = [...markup.matchAll(/data-item="([^"]+)"/g)].map((match) => ({
    dataset: { item: match[1] }, classList: { toggle() {} },
    setAttribute(name, value) { this[name] = value; },
    querySelector() { return this.status = { textContent: '' }; },
  }));
  go = { disabled: true }; count = { textContent: '', classList: { toggle() {} } }; back = {};
} });
const document = {
  querySelector(selector) { return { '#app': app, '#progress': progress, '#go': go, '#back': back, '#itemCount': count }[selector] || null; },
  querySelectorAll(selector) { return selector === '.item' ? cards : []; },
};
const context = vm.createContext({ document, location: { search: '' }, localStorage: { getItem() { return '{}'; } }, URLSearchParams, console, Math });
vm.runInContext(script, context);
vm.runInContext('state.unlocked=2;prepare(1)', context);
assert.match(app.markup, /從 3 件道具中選 1 件/);
assert.equal(cards.length, 3);
assert.equal(go.disabled, true);
cards[1].onclick();
assert.equal(go.disabled, false);
cards[0].onclick();
assert.equal(cards[0]['aria-pressed'], 'true');
assert.equal(cards[1]['aria-pressed'], 'false');
vm.runInContext('state.unlocked=8;prepare(8)', context);
assert.match(app.markup, /最多選 2 件/);
cards[0].onclick(); cards[1].onclick();
assert.equal(count.textContent, '已選 2 / 2');
vm.runInContext('state.hp=0;prepare(2)', context);
assert.equal(cards.length, 1);
assert.equal(cards[0].dataset.item, 'kit');
console.log('Loadout selection passed');

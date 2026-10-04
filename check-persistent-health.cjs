const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '歷史文物守護行動完整版.html'), 'utf8');
const script = html.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1].split('document.querySelector("#largeBtn").onclick=')[0];
let stored = '{}';
const document = { querySelector(selector) { return selector === '#app' ? { focus() {} } : null; } };
const localStorage = {
  getItem() { return stored; },
  setItem(_key, value) { stored = value; },
};
const context = vm.createContext({ document, location: { search: '' }, localStorage, URLSearchParams, console, Math });
vm.runInContext(script, context);
vm.runInContext('renderBattle=()=>{};makeDeck=()=>[];state.unlocked=3;state.level=3;state.hp=2;state.pendingEvent=null;startBattle()', context);
assert.equal(vm.runInContext('state.hp', context), 2);
assert.equal(vm.runInContext('state.hpMax', context), 5);
vm.runInContext('state.pendingEvent={level:3,effect:{heal:1}};startBattle()', context);
assert.equal(vm.runInContext('state.hp', context), 3);
assert.equal(vm.runInContext('state.pendingEvent', context), null);
vm.runInContext('startBattle()', context);
assert.equal(vm.runInContext('state.hp', context), 3);
assert.equal(JSON.parse(stored).hp, 3);
assert.deepEqual(Array.from(vm.runInContext('[kitHeal(1),kitHeal(4),kitHeal(7)]', context)), [1, 2, 3]);
assert.equal(vm.runInContext('itemEffect("kit",8)', context), '回復 3 顆守護心。');
console.log('Persistent guardian hearts passed');

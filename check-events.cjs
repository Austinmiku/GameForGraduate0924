const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '歷史文物守護行動完整版.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1].split('document.querySelector("#largeBtn").onclick=')[0];
const app = { focus() {} };
const progress = { setAttribute() {} };
const document = {
  querySelector(selector) { return { '#app': app, '#progress': progress }[selector] || null; },
  querySelectorAll() { return []; },
};
const context = vm.createContext({
  document,
  window: {},
  location: { search: '?seed=115' },
  localStorage: { getItem() { return '{}'; }, setItem() {} },
  URLSearchParams,
  console,
  Math,
});
vm.runInContext(fs.readFileSync(path.join(__dirname, 'question-bank.js'), 'utf8'), context);
vm.runInContext(script, context);

assert.equal(vm.runInContext('randomEvents.length', context), 15);
assert.equal(vm.runInContext('new Set(randomEvents.map(e=>e.id)).size', context), 15);
assert.deepEqual(
  JSON.parse(vm.runInContext('JSON.stringify(EVENT_WEIGHTS)', context)),
  { fortune: 0.3, knowledge: 0.25, strategy: 0.25, crisis: 0.2 },
);

const counts = { fortune: 0, knowledge: 0, strategy: 0, crisis: 0 };
const seenEvents = new Set();
let total = 0;
for (let salt = 0; salt < 2000; salt++) {
  const plan = JSON.parse(vm.runInContext(`JSON.stringify(makeEventPlan(${salt}))`, context));
  const ids = Object.values(plan);
  assert.ok(ids.length >= 3 && ids.length <= 5, 'each campaign must schedule 3-5 events');
  assert.equal(new Set(Object.keys(plan)).size, ids.length, 'only one event may be scheduled per battle');
  assert.equal(new Set(ids).size, ids.length, 'events should not repeat during one campaign');
  for (const id of ids) {
    const category = vm.runInContext(`randomEvents.find(e=>e.id==="${id}").category`, context);
    counts[category]++;
    seenEvents.add(id);
    total++;
  }
}
assert.equal(seenEvents.size, 15, 'all 15 events should be reachable');
for (const [category, expected] of Object.entries({ fortune: 0.3, knowledge: 0.25, strategy: 0.25, crisis: 0.2 }))
  assert.ok(Math.abs(counts[category] / total - expected) < 0.04, `${category} distribution drifted too far`);

vm.runInContext('renderBattle=()=>{};makeDeck=()=>[];state.unlocked=5;state.level=4;state.hp=3;state.selectedItems=["compass"];state.pendingEvent={level:4,effect:{heal:1,hpPenalty:1,enemyDamage:2,shield:1,bonusDamage:1,revive:1,damageReduction:1,removeWrong:2,openingHint:true,extraItem:"lens"}};startBattle()', context);
assert.equal(vm.runInContext('state.hpMax', context), 6);
assert.equal(vm.runInContext('state.hp', context), 3);
assert.equal(vm.runInContext('state.enemy', context), 3);
assert.equal(vm.runInContext('state.shield', context), 1);
assert.equal(vm.runInContext('state.eventDamage', context), 1);
assert.equal(vm.runInContext('state.revive', context), 1);
assert.equal(vm.runInContext('state.damageReduction', context), 1);
assert.equal(vm.runInContext('state.openingRemoveWrong', context), 2);
assert.equal(vm.runInContext('state.openingHint', context), true);
assert.equal(vm.runInContext('state.selectedItems.includes("lens")', context), true);

const callResult = vm.runInContext('let eventCalls=0,battleCalls=0;showRandomEvent=()=>eventCalls++;startBattle=()=>battleCalls++;state.level=2;state.eventPlan={2:"repair"};state.eventSeen=new Set();requestBattle();state.eventSeen.add(2);requestBattle();[eventCalls,battleCalls]', context);
assert.deepEqual(Array.from(callResult), [1, 1]);

console.log('15-event scheduling and weighted distribution passed');

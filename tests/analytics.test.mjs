import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../public/analytics.js', import.meta.url), 'utf8');
function boot({ hash = '', host = 'antoniopuceski.github.io', storage = new Map(), blocked = false } = {}) {
  const scripts = [], notices = [], calls = [], listeners = {};
  const localStorage = {
    getItem: key => { if (blocked) throw Error(); return storage.get(key); },
    setItem: (key, value) => { if (blocked) throw Error(); storage.set(key, value); },
    removeItem: key => { if (blocked) throw Error(); storage.delete(key); },
  };
  const document = {
    currentScript: { dataset: { endpoint: 'https://antoniopuceski.goatcounter.com/count' } },
    referrer: 'https://example.com/private?token=secret',
    createElement: () => ({ setAttribute() {}, style: {} }),
    body: { appendChild: element => notices.push(element) },
    head: { appendChild: element => scripts.push(element) },
    addEventListener: (name, callback) => { listeners[name] = callback; },
  };
  const window = { location: { hash, hostname: host, pathname: '/' } };
  vm.runInNewContext(source, { document, window, localStorage, URL });
  return { scripts, notices, calls, window, storage,
    load() { window.goatcounter.count = event => calls.push(event); scripts[0].onload(); },
    click(name) { listeners.click({ target: { closest: () => name ? { dataset: { analytics: name } } : null } }); },
  };
}
test('one visit and exact named click counts, with referrer paths removed', () => {
  const app = boot();
  assert.equal(app.scripts.length, 1);
  assert.equal(app.window.goatcounter.referrer, 'https://example.com');
  app.load(); app.click('request-cv'); app.click('request-cv'); app.click(null);
  assert.equal(app.calls.length, 3);
  assert.equal(app.calls[0], undefined);
  assert.equal(app.calls[1].path, 'request-cv');
  assert.equal(app.calls[1].no_session, true);
});
test('opt-out prevents loading the tracker and persists on subsequent visits', () => {
  const app = boot({ hash: '#analytics-off' });
  assert.equal(app.scripts.length, 0);
  assert.match(app.notices[0].textContent, /excluded/);
  assert.equal(boot({ storage: app.storage }).scripts.length, 0);
  assert.equal(boot({ hash: '#analytics-on', storage: app.storage }).scripts.length, 1);
});
test('blocked storage still excludes the opt-out page and reports the limit', () => {
  const app = boot({ hash: '#analytics-off', blocked: true });
  assert.equal(app.scripts.length, 0);
  assert.match(app.notices[0].textContent, /page only/);
});
test('development and preview hosts send no analytics', () => {
  assert.equal(boot({ host: 'localhost' }).scripts.length, 0);
});
test('early clicks queue once and an opt-out in another tab stops events', () => {
  const app = boot(); app.click('preview-gym'); app.load();
  assert.equal(app.calls.length, 2);
  assert.equal(app.calls[1].path, 'preview-gym');
  app.storage.set('antonio-analytics-disabled', '1'); app.click('request-cv');
  assert.equal(app.calls.length, 2);
});

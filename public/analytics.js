/* Anonymous visit and explicit interaction counts. No form contents or visitor IDs. */
(() => {
  const endpoint = document.currentScript?.dataset.endpoint;
  const key = 'antonio-analytics-disabled';
  const command = window.location.hash;
  let excluded = command === '#analytics-off';
  let saved = true;
  try {
    if (command === '#analytics-off') localStorage.setItem(key, '1');
    if (command === '#analytics-on') localStorage.removeItem(key);
    excluded = localStorage.getItem(key) === '1';
  } catch { saved = false; }
  if (command === '#analytics-off' || command === '#analytics-on') {
    const status = document.createElement('div');
    status.setAttribute('role', 'status');
    status.textContent = excluded
      ? (saved ? 'Your visits and clicks are excluded in this browser. You can close this tab.' : 'Excluded for this page only. Browser storage is blocked; use #analytics-off on every visit.')
      : 'Analytics is enabled in this browser again.';
    status.style.cssText = 'position:fixed;bottom:16px;left:16px;right:16px;z-index:99999;background:#183a2b;color:white;padding:18px;border-radius:8px;font:16px/1.5 system-ui;';
    document.body.appendChild(status);
  }
  if (excluded || window.location.hostname !== 'antoniopuceski.github.io' || !endpoint) return;
  const queue = [];
  let ready = false;
  const disabled = () => {
    try { return localStorage.getItem(key) === '1'; } catch { return false; }
  };
  const send = (name) => {
    if (disabled()) return;
    const event = { path: name, title: name.replaceAll('-', ' '), event: true, no_session: true, referrer: '' };
    if (ready) window.goatcounter.count(event);
    else if (queue.length < 30) queue.push(event);
  };
  // Delegation covers React's dynamically inserted galleries and filtered cards.
  document.addEventListener('click', (event) => {
    const control = event.target.closest?.('[data-analytics]');
    if (control?.dataset.analytics) send(control.dataset.analytics);
  });
  window.goatcounter = {
    no_onload: true,
    endpoint,
    path: window.location.pathname,
    referrer: (() => { try { return document.referrer ? new URL(document.referrer).origin : ''; } catch { return ''; } })(),
  };
  const script = document.createElement('script');
  script.src = 'https://gc.zgo.at/count.js';
  script.async = true;
  script.onload = () => {
    if (disabled() || typeof window.goatcounter.count !== 'function') return;
    ready = true;
    window.goatcounter.count();
    queue.splice(0).forEach(event => window.goatcounter.count(event));
  };
  script.onerror = () => { queue.length = 0; };
  document.head.appendChild(script);
})();

import { useRef, useState, type KeyboardEvent } from "react";

const stops = [
  { id: "projects", name: "The workshop", label: "Work", x: 24, y: 33, icon: "⌘", text: "Explore five builds across software engineering, machine learning, and computer vision.", action: "Explore projects" },
  { id: "experience", name: "The archive", label: "Experience", x: 76, y: 33, icon: "▤", text: "From quality assurance to .NET applications, integrations, and real-world delivery.", action: "See my experience" },
  { id: "about", name: "The garden", label: "About", x: 24, y: 77, icon: "✳", text: "Meet the person behind the code: a curious engineer from Skopje, with a soft spot for chess and hiking.", action: "Get to know me" },
  { id: "contact", name: "The signal station", label: "Contact", x: 76, y: 77, icon: "↗", text: "Have a role, a collaboration, or an interesting problem? Let’s start a conversation.", action: "Let’s connect" },
];
const origin = { x: 50, y: 55 };
const directions: Record<string, [number, number]> = { ArrowUp: [0,-5], w: [0,-5], ArrowDown: [0,5], s: [0,5], ArrowLeft: [-5,0], a: [-5,0], ArrowRight: [5,0], d: [5,0] };
function closest(point: typeof origin) {
  return stops.find(stop => Math.hypot(point.x - stop.x, point.y - stop.y) < 15);
}

function Scenery() {
  return <svg className="map-scenery" viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true">
    <defs><pattern id="map-grass" width="28" height="28" patternUnits="userSpaceOnUse"><path d="m5 8 2-3 2 3m12 13 2-3 2 3" fill="none" stroke="#7e9e77" strokeWidth=".9" opacity=".3"/></pattern></defs>
    <rect width="600" height="400" fill="#dce8d0"/><rect width="600" height="400" fill="url(#map-grass)"/>
    <path d="M145 135H455M145 307H455M300 135V307" fill="none" stroke="#c9bda0" strokeWidth="30" strokeLinejoin="round"/>
    <path d="M145 135H455M145 307H455M300 135V307" fill="none" stroke="#eee3c8" strokeWidth="23" strokeLinejoin="round"/>
    <ellipse cx="300" cy="223" rx="51" ry="36" fill="#c9bda0"/><ellipse cx="300" cy="221" rx="46" ry="32" fill="#eee3c8"/>
    <path d="M8 212q36-35 73-6t20 43q-12 27-65 24T8 212" fill="#a6c4ba"/><path d="M20 225q25-10 51 0m-37 16q18-6 35 0" fill="none" stroke="#dcece0" strokeWidth="3"/>
    {[ [38,60],[70,46],[526,57],[557,86],[47,348],[533,348],[557,328] ].map(([x,y])=><g key={x} transform={"translate("+x+" "+y+")"}><ellipse cy="12" rx="18" ry="7" fill="#b8c7a6"/><path d="M0 0v17" stroke="#8c7957" strokeWidth="5"/><circle cy="-8" r="19" fill="#829c6b"/><circle cx="-6" cy="-15" r="13" fill="#94ad7b"/></g>)}
    <g transform="translate(145 70)"><path d="m-53 18 53-30 53 30v48H-53Z" fill="#c8ab83"/><path d="m-61 19 61-39 61 39-10 8L0-5-51 27Z" fill="#557768"/><rect x="-41" y="30" width="23" height="19" rx="2" fill="#eaeac8"/><rect x="18" y="30" width="23" height="19" rx="2" fill="#eaeac8"/><rect x="-10" y="33" width="20" height="33" fill="#766f55"/><path d="M-47 65h94" stroke="#a68c68" strokeWidth="5"/></g>
    <g transform="translate(455 69)"><rect x="-48" y="2" width="96" height="65" fill="#d4c4a1"/><path d="m-58 2 58-28L58 2Z" fill="#bba383"/><path d="M-43 8v50m28-50v50m30-50v50m28-50v50" stroke="#f0e4c8" strokeWidth="12"/><path d="M-55 63H55M-59 69H59" stroke="#b39a76" strokeWidth="7"/><rect x="-9" y="20" width="18" height="37" fill="#63786b"/></g>
    <g transform="translate(145 259)"><ellipse rx="51" ry="26" fill="#b3c597"/><rect x="-42" y="-9" width="84" height="11" rx="3" fill="#a48965"/><path d="M-35 0v23m70-23v23" stroke="#917858" strokeWidth="5"/><g fill="#668964"><circle cx="-38" cy="-27" r="17"/><circle cx="31" cy="-29" r="21"/></g><g fill="#d7a282"><circle cx="-39" cy="-29" r="4"/><circle cx="25" cy="-37" r="4"/><circle cx="38" cy="-25" r="4"/></g></g>
    <g transform="translate(455 256)"><path d="m-33 42 33-87 33 87M-20 6h40M-27 26h54M-18 7 27 26M18 7-27 26" fill="none" stroke="#658477" strokeWidth="6"/><circle cy="-47" r="7" fill="#bc8564"/><path d="M-17-62q-15 16 0 31M17-62q15 16 0 31M-28-72q-24 26 0 51M28-72q24 26 0 51" fill="none" stroke="#829e85" strokeWidth="3"/><rect x="-42" y="42" width="84" height="8" rx="3" fill="#9baf8b"/></g>
    <g fill="#c09472"><circle cx="358" cy="49" r="3"/><circle cx="365" cy="58" r="2"/><circle cx="212" cy="217" r="3"/></g>
    <text x="300" y="32" textAnchor="middle" fill="#71856b" fontFamily="monospace" fontSize="9" letterSpacing="3">ANTONIO’S LITTLE WORLD</text>
  </svg>;
}

export function PortfolioMap() {
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState(origin);
  const [visited, setVisited] = useState<string[]>([]);
  const [facing, setFacing] = useState(1);
  const field = useRef<HTMLDivElement>(null);
  const start = useRef<HTMLButtonElement>(null);
  const near = closest(position);

  function travel(next: typeof origin) {
    setFacing(next.x < position.x ? -1 : next.x > position.x ? 1 : facing);
    setPosition(next);
    const stop = closest(next);
    if (stop) setVisited(previous => previous.includes(stop.id) ? previous : [...previous, stop.id]);
  }
  function begin() { setActive(true); field.current?.focus({ preventScroll: true }); }
  function pause() { setActive(false); requestAnimationFrame(() => start.current?.focus({ preventScroll: true })); }
  function move(dx: number, dy: number) {
    travel({x: Math.max(8, Math.min(92, position.x+dx)), y: Math.max(18, Math.min(89, position.y+dy))});
    field.current?.focus({ preventScroll: true });
  }
  function openSection(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    window.location.assign("#" + id);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }
  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (!active || event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey) return;
    const direction = directions[event.key] ?? directions[event.key.toLowerCase()];
    if (direction) { event.preventDefault(); move(...direction); }
    if (event.key === "Enter" && near) { event.preventDefault(); openSection(near.id); }
    if (event.key === "Escape") { event.preventDefault(); pause(); }
  }
  return <div className="portfolio-map" id="explore">
    <div className="map-topbar"><span><i/>A SMALL WORLD TO EXPLORE</span><span>{visited.length} / 4 discovered</span></div>
    {/* This opt-in game needs a focusable application surface for directional keys; Tab and Escape leave it. */}
    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */}
    <div className="map-field" ref={field} tabIndex={active ? 0 : -1} role="application" aria-label="Playable portfolio map" aria-describedby="map-instructions" onKeyDown={handleKeys}>
      <Scenery/>
      {stops.map(stop=><button key={stop.id} tabIndex={active ? 0 : -1} disabled={!active} className={"map-stop "+(near?.id===stop.id ? "is-near" : "")} style={{left:stop.x+"%",top:stop.y+"%"}} onClick={()=>{travel({x:stop.x,y:stop.y+6}); field.current?.focus({preventScroll:true});}} aria-label={"Visit "+stop.label}>
        <span>{visited.includes(stop.id) ? "✓" : stop.icon}</span>{stop.label}
      </button>)}
      <div className="map-player" style={{left:position.x+"%",top:position.y+"%"}} aria-hidden="true"><span className="player-shadow"/><svg viewBox="0 0 28 38" style={{transform:"scaleX("+facing+")"}}><path d="M8 26v9m12-9v9" stroke="#344c42" strokeWidth="5"/><rect x="5" y="16" width="18" height="14" rx="5" fill="#bc805c"/><rect x="7" y="3" width="14" height="15" rx="5" fill="#e2be97"/><path d="M7 9V6q0-7 8-6 8 0 7 9l-5-3-5 3Z" fill="#3d4c3e"/><circle cx="18" cy="11" r="1" fill="#344c42"/><path d="M4 21v6m20-6v6" stroke="#e2be97" strokeWidth="4" strokeLinecap="round"/></svg><span className="player-you">YOU</span></div>
      {!active && <div className="map-start"><p>A little adventure.<br/><em>A different introduction.</em></p><button ref={start} onClick={begin}>Explore the map <span aria-hidden="true">↗</span></button><span>4 places. Your own pace.</span></div>}
    </div>
    <div className="map-panel">
      <div className="map-discovery" aria-live="polite" aria-atomic="true"><span className="mini-label">{near ? "YOU FOUND / "+near.label.toUpperCase() : visited.length===4 ? "ALL FOUR PLACES DISCOVERED" : "WELCOME, EXPLORER"}</span><h2>{near?.name ?? (visited.length===4 ? "Thanks for looking around." : "Follow your curiosity.")}</h2><p>{near?.text ?? "Walk to a destination or tap its sign. There’s a story behind every stop."}</p>{near && <a href={"#"+near.id} onClick={event=>{event.preventDefault(); openSection(near.id);}}>{near.action} <span aria-hidden="true">↗</span></a>}</div>
      {active && <div className="map-dpad" role="group" aria-label="Movement controls"><button aria-label="Move up" onClick={()=>move(0,-5)}>↑</button><button aria-label="Move left" onClick={()=>move(-5,0)}>←</button><button aria-label="Move down" onClick={()=>move(0,5)}>↓</button><button aria-label="Move right" onClick={()=>move(5,0)}>→</button></div>}
    </div>
    <div className="map-controls"><p id="map-instructions">{active ? "Arrow keys / WASD to move · Enter to visit · Esc to pause" : "Keyboard, touch, or click. No downloads, no rush."}</p>{active && <button onClick={pause}>Pause</button>}{visited.length>0 && <button onClick={()=>{setPosition(origin);setVisited([]);}}>Reset</button>}</div>
  </div>;
}

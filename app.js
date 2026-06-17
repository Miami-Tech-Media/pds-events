// PDS App — rendering logic. Do not edit unless changing site behaviour.

let activeFilter = 'All';
let calYear, calMonth;

const CAT_COLORS = {
  Social: '#2563eb',
  Growth: '#16a34a',
  Worship: '#7c3aed',
  Service: '#d97706',
  Sports: '#0891b2',
  Study:  '#16a34a',
  Group:  '#7c3aed',
  All:    '#6b7280'
};

function fmtDate(s) {
  const d = new Date(s + 'T00:00:00');
  return {
    wd:        d.toLocaleString('en-US', { weekday: 'short' }).toUpperCase(),
    day:       d.getDate(),
    mo:        d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
    monthFull: d.toLocaleString('en-US', { month: 'long' }),
    year:      d.getFullYear(),
    long:      d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
  };
}

function makeICS(ev) {
  const ds  = ev.date.replace(/-/g, '');
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT',
    'SUMMARY:' + ev.title + ' — PDS @ Journey',
    'DTSTART:' + ds + 'T190000',
    'LOCATION:' + ev.location + (ev.address ? ', ' + ev.address : ''),
    'DESCRIPTION:' + ev.description,
    'END:VEVENT', 'END:VCALENDAR'
  ].join('\n');
  return URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
}

function addCal(id) {
  const ev = EVENTS.find(e => e.id === id);
  const a  = document.createElement('a');
  a.href     = makeICS(ev);
  a.download = ev.title.replace(/\s+/g, '-') + '.ics';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function openDirections(ev) {
  const q = encodeURIComponent((ev.address || ev.location) + ', Orlando, FL');
  window.open('https://maps.google.com/?q=' + q, '_blank', 'noopener');
}

const SVG = {
  cal:   `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  pin:   `<svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  clock: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>`,
  food:  `<svg viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>`,
  party: `<svg viewBox="0 0 24 24"><path d="M5.8 11.3L2 22l10.7-3.79M4 3h.01M22 8h.01M15 2h.01M22 20h.01M20 6l-6.4 6.4M8.97 14.02L12 17l6.4-6.4"/></svg>`,
  star:  `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  dir:   `<svg viewBox="0 0 24 24"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>`,
};

function filtered() {
  return activeFilter === 'All' ? EVENTS : EVENTS.filter(e => e.category === activeFilter);
}

/* ── Event list ── */
function renderList() {
  const evs = filtered();
  document.getElementById('list-title').textContent =
    activeFilter === 'All' ? 'All Events' : activeFilter + ' Events';
  document.getElementById('list-count').textContent = evs.length + ' upcoming';

  if (!evs.length) {
    document.getElementById('event-list').innerHTML =
      `<div class="empty"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg><p>No ${activeFilter.toLowerCase()} events scheduled.</p></div>`;
    return;
  }

  const groups = {};
  evs.forEach(ev => {
    const d = fmtDate(ev.date);
    const k = d.monthFull + ' ' + d.year;
    (groups[k] = groups[k] || []).push(ev);
  });

  document.getElementById('event-list').innerHTML =
    Object.entries(groups).map(([month, mes]) => `
      <div class="month-group">
        <div class="month-ruler">
          <span class="month-label">${month}</span>
          <div class="ruler-line"></div>
        </div>
        ${mes.map(renderCard).join('')}
      </div>`).join('');

  document.querySelectorAll('.ev-row').forEach(row => {
    row.addEventListener('click', () => {
      const card = row.closest('.ev-card');
      const open = card.classList.contains('open');
      document.querySelectorAll('.ev-card.open').forEach(c => c.classList.remove('open'));
      if (!open) card.classList.add('open');
    });
  });
}

function renderCard(ev) {
  const d = fmtDate(ev.date);
  return `
  <div class="ev-card${ev.featured ? ' featured' : ''}" data-id="${ev.id}">
    ${ev.featured ? `<div class="feat-ribbon">${SVG.star} Featured</div>` : ''}
    <div class="ev-row">
      <div class="ev-date-col">
        <span class="ev-wd">${d.wd}</span>
        <span class="ev-day">${d.day}</span>
        <span class="ev-mo">${d.mo}</span>
      </div>
      <div class="ev-body">
        <span class="ev-cat cat-${ev.category}">${ev.category}</span>
        <p class="ev-title">${ev.title}</p>
        <div class="ev-meta">
          <span class="ev-meta-item">${SVG.clock}${ev.time}</span>
          <span class="ev-meta-item">${SVG.pin}${ev.location}</span>
        </div>
      </div>
      <div class="ev-chevron-col">
        <svg class="ev-chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </div>
    <div class="ev-expanded">
      <div class="ev-exp-inner">
        <div>
          <p class="ev-desc">${ev.description}</p>
          <div class="ev-chips">
            <span class="ev-chip">${SVG.cal}${d.long}</span>
            <span class="ev-chip">${SVG.clock}${ev.time}</span>
            <span class="ev-chip">${SVG.pin}${ev.location}</span>
          </div>
          ${(ev.foodNote || ev.afterpartyNote) ? `<div class="ev-notes">
            ${ev.foodNote  ? `<div class="ev-note">${SVG.food}<span>${ev.foodNote}</span></div>`  : ''}
            ${ev.afterpartyNote ? `<div class="ev-note">${SVG.party}<span>${ev.afterpartyNote}</span></div>` : ''}
          </div>` : ''}
        </div>
        <div class="ev-ctas">
          <button class="btn-cal" onclick="event.stopPropagation();addCal(${ev.id})">${SVG.cal} Add to Calendar</button>
          <button class="btn-dir" onclick="event.stopPropagation();openDirections(EVENTS.find(e=>e.id==${ev.id}))">${SVG.dir} Directions</button>
        </div>
      </div>
    </div>
  </div>`;
}

/* ── Filters ── */
function renderFilters() {
  const cats = ['All', ...new Set(EVENTS.map(e => e.category))];
  document.getElementById('filter-list').innerHTML = cats.map(cat => {
    const n = cat === 'All' ? EVENTS.length : EVENTS.filter(e => e.category === cat).length;
    return `<button class="f-btn${cat === activeFilter ? ' active' : ''}" onclick="setFilter('${cat}')">
      <span class="f-left"><span class="f-dot" style="background:${CAT_COLORS[cat] || CAT_COLORS.All}"></span>${cat}</span>
      <span class="f-count">${n}</span>
    </button>`;
  }).join('');
}

function setFilter(cat) {
  activeFilter = cat;
  renderFilters();
  renderList();
}

/* ── Quick stats ── */
function renderStats() {
  const now       = new Date();
  const thisMonth = EVENTS.filter(e => {
    const d = new Date(e.date + 'T00:00:00');
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  document.getElementById('quick-stats').innerHTML = [
    { l: 'Total upcoming', v: EVENTS.length },
    { l: 'This month',     v: thisMonth },
    { l: 'Event types',    v: new Set(EVENTS.map(e => e.category)).size },
  ].map(r => `<div class="qs-row"><span class="qs-label">${r.l}</span><span class="qs-val">${r.v}</span></div>`).join('');
}

/* ── Mini calendar ── */
function renderCal() {
  const today = new Date();
  if (calYear === undefined) { calYear = today.getFullYear(); calMonth = today.getMonth(); }
  document.getElementById('cal-month-label').textContent =
    new Date(calYear, calMonth, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const evDates = new Set(EVENTS.map(e => e.date));
  const first   = new Date(calYear, calMonth, 1).getDay();
  const days    = new Date(calYear, calMonth + 1, 0).getDate();
  let html = ['S','M','T','W','T','F','S'].map(d => `<span class="cal-dow">${d}</span>`).join('');
  for (let i = 0; i < first; i++) html += `<span class="cal-day empty"></span>`;
  for (let d = 1; d <= days; d++) {
    const iso     = calYear + '-' + String(calMonth + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
    const isToday = d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
    const hasEv   = evDates.has(iso);
    html += `<span class="cal-day${isToday ? ' today' : ''}${hasEv ? ' has-event' : ''}">${d}</span>`;
  }
  document.getElementById('mini-cal').innerHTML = html;
}

document.getElementById('cal-prev').onclick = () => {
  if (--calMonth < 0) { calMonth = 11; calYear--; } renderCal();
};
document.getElementById('cal-next').onclick = () => {
  if (++calMonth > 11) { calMonth = 0; calYear++; } renderCal();
};

/* ── Init ── */
renderFilters();
renderList();
renderStats();
renderCal();

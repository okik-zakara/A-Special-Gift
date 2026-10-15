(function () {
  var stage = document.getElementById('stage');
  var hint = document.getElementById('hint');
  var doorsBtn = document.getElementById('doorsBtn');
  var giftBtn = document.getElementById('giftBtn');
  var burstEl = document.getElementById('burst');
  var letter = document.getElementById('letter');
  var replayBtn = document.getElementById('replayBtn');

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NS = 'http://www.w3.org/2000/svg';
  var HEART = 'M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.3 1.8-2.1 3.3-3.3 5.4-3.3 3.7 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21z';
  var COLORS = ['#e23d68', '#ff8fa8', '#ffc7d3', '#e0b265', '#a66cff', '#c9a6ff', '#7c4dff', '#8e5cf0'];
  var PURPLES = ['#a66cff', '#c9a6ff', '#7c4dff', '#8e5cf0'];
  var HINTS = { closed: 'Tap the doors', open: '', popped: 'Now tap the gift', unwrapped: '' };
  var timers = [];

  function buildAmbient() {
    var box = document.getElementById('ambient');
    if (!box) return;
    for (var i = 0; i < 14; i++) {
      var dur = 16 + Math.random() * 14;
      var svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.style.left = Math.random() * 96 + '%';
      svg.style.setProperty('--s', 12 + Math.random() * 24 + 'px');
      svg.style.setProperty('--d', dur + 's');
      svg.style.setProperty('--delay', -Math.random() * dur + 's');
      svg.style.setProperty('--sx', (Math.random() - 0.5) * 120 + 'px');
      svg.style.setProperty('--rot', (Math.random() - 0.5) * 80 + 'deg');
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', HEART);
      p.setAttribute('fill', PURPLES[Math.floor(Math.random() * PURPLES.length)]);
      svg.appendChild(p);
      box.appendChild(svg);
    }
  }

  function later(fn, ms) {
    timers.push(setTimeout(fn, reduce ? 0 : ms));
  }
  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function setState(s) {
    stage.dataset.state = s;
    hint.textContent = HINTS[s];
    doorsBtn.disabled = s !== 'closed';
    giftBtn.disabled = s !== 'popped';
    var showLetter = s === 'unwrapped';
    letter.inert = !showLetter;
    letter.setAttribute('aria-hidden', showLetter ? 'false' : 'true');
  }

  function burst(n) {
    if (reduce) return;
    var maxX = window.innerWidth / 2 - 24;
    for (var i = 0; i < n; i++) {
      var size = 14 + Math.random() * 16;
      var svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.style.setProperty('--s', size + 'px');
      var path = document.createElementNS(NS, 'path');
      path.setAttribute('d', HEART);
      path.setAttribute('fill', COLORS[Math.floor(Math.random() * COLORS.length)]);
      svg.appendChild(path);
      burstEl.appendChild(svg);

      var angle = -Math.PI * (0.1 + Math.random() * 0.8);
      var dist = 90 + Math.random() * 190;
      var dx = Math.max(-maxX, Math.min(maxX, Math.cos(angle) * dist));
      var dy = Math.sin(angle) * dist;
      var rot = (Math.random() - 0.5) * 120;
      var anim = svg.animate([
        { transform: 'translate(0px,0px) scale(0.2) rotate(0deg)', opacity: 0 },
        { transform: 'translate(' + dx * 0.7 + 'px,' + dy * 0.7 + 'px) scale(1) rotate(' + rot / 2 + 'deg)', opacity: 1, offset: 0.35 },
        { transform: 'translate(' + dx + 'px,' + (dy + 150) + 'px) scale(0.7) rotate(' + rot + 'deg)', opacity: 0 }
      ], { duration: 1500 + Math.random() * 900, delay: Math.random() * 220, easing: 'cubic-bezier(0.2,0.7,0.4,1)', fill: 'both' });
      anim.onfinish = (function (el) { return function () { el.remove(); }; })(svg);
    }
  }

  doorsBtn.addEventListener('click', function () {
    if (stage.dataset.state !== 'closed') return;
    clearTimers();
    setState('open');
    later(function () {
      setState('popped');
      burst(18);
    }, 1500);
  });

  giftBtn.addEventListener('click', function () {
    if (stage.dataset.state !== 'popped') return;
    clearTimers();
    setState('unwrapped');
    burst(40);
    later(function () {
      letter.focus({ preventScroll: true });
    }, 1000);
  });

  replayBtn.addEventListener('click', function () {
    clearTimers();
    setState('closed');
    doorsBtn.focus({ preventScroll: true });
  });

  buildAmbient();
  setState('closed');
})();

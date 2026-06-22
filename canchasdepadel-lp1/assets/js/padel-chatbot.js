/* Padel Center MX — Chatbot v1.0
 * Self-contained: inyecta CSS + HTML + lógica. No depende de nada externo.
 * Reemplaza el chatbot.js multi-tenant en canchasdepadel.mx
 */
(function () {
  'use strict';
  if (window.__padelChatbotLoaded) return;
  window.__padelChatbotLoaded = true;

  // ===== CONFIG =====
  var WA_NUMBER = '528116296384';
  var LEAD_API = 'https://canchadefutbol7.mx/api/lead'; // mismo backend D1 → /admin
  var DOMAIN = (location.hostname || '').toLowerCase();

  // ===== SESSION + ATRIBUCIÓN =====
  function sid() {
    try {
      var k = 'pc-sid';
      var v = sessionStorage.getItem(k);
      if (!v) { v = 'pc-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9); sessionStorage.setItem(k, v); }
      return v;
    } catch (e) { return 'pc-' + Date.now(); }
  }
  function atribucion() {
    try {
      var p = new URLSearchParams(location.search);
      return {
        url: location.href,
        gclid: p.get('gclid') || p.get('gbraid') || p.get('wbraid') || p.get('cid') || '',
        campania: p.get('utm_campaign') || p.get('campaign') || '',
        utm_source: p.get('utm_source') || p.get('src') || '',
        utm_medium: p.get('utm_medium') || '',
        referrer: document.referrer || ''
      };
    } catch (e) { return { url: location.href, gclid: '', campania: '' }; }
  }
  function saveLead(estado) {
    try {
      var a = atribucion();
      var cant = lead.cantidad === '1' ? '1 cancha' : (lead.cantidad || '') + ' canchas';
      var tipoLabel = lead.tipo ? lead.tipo.label : '';
      var precio = lead.tipo ? lead.tipo.price : '';
      var comentarios = [
        tipoLabel ? 'Tipo: Cancha ' + tipoLabel + (precio ? ' (desde $' + precio.toLocaleString('es-MX') + ')' : '') : '',
        lead.cantidad ? 'Cantidad: ' + cant : '',
        lead.ciudad ? 'Ciudad: ' + lead.ciudad : '',
        lead.tiempo ? 'Inicio: ' + lead.tiempo : '',
        'Origen: chatbot Padel Center'
      ].filter(Boolean).join(' · ');
      fetch(LEAD_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          session_id: sid(),
          estado: estado || 'completo',
          domain: DOMAIN,
          fuente: 'Chatbot Padel Center',
          nombre: lead.nombreFull || '',
          whatsapp: lead.whatsapp || 'No lo dejó',
          ciudad: lead.ciudad || '',
          m2: tipoLabel ? cant + ' ' + tipoLabel : (cant || ''),
          timeline: lead.tiempo || '',
          url: a.url,
          gclid: a.gclid,
          campania: a.campania,
          comentarios: comentarios
        })
      }).catch(function () { /* silent */ });
    } catch (e) { /* silent */ }
  }

  var TIPOS = {
    clasica:        { label: 'Clásica',        price: 415000 },
    semipanoramica: { label: 'Semipanorámica', price: 430000 },
    panoramica:     { label: 'Panorámica',     price: 450000 }
  };
  var TIEMPOS = { asap: 'Lo más pronto posible', anio: 'Este año', nose: 'No sé aún' };

  // ===== STYLES =====
  var CSS = `
  .pc-cb, .pc-cb *, .pc-cb *::before, .pc-cb *::after { box-sizing: border-box; }
  .pc-cb {
    --pcb: #2563EB; --pcbs: #DBEAFE; --pcbd: #1E40AF;
    --pci: #0F172A; --pcg: #64748B; --pcl: #E2E8F0; --pcbg: #F8FAFC;
    --pcgn: #22C55E; --pcwa: #25D366; --pcwad: #1DA851;
    --pcsh: 0 20px 50px -12px rgba(15,23,42,0.18), 0 8px 20px -8px rgba(37,99,235,0.18);
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  /* TEASER — floating bottom bar (estilo canchadefutbol7) */
  #pc-teaser {
    position: fixed; bottom: 16px; left: 16px; right: 16px;
    z-index: 999998;
    max-width: 1100px; margin: 0 auto;
    display: flex; align-items: center; gap: 16px;
    background: #fff; border: 1px solid var(--pcl);
    border-radius: 18px; padding: 14px 14px 14px 18px;
    box-shadow: var(--pcsh); cursor: pointer;
    transition: transform 0.18s, box-shadow 0.18s, opacity 0.25s, visibility 0.25s;
  }
  #pc-teaser.pc-hidden { opacity: 0; visibility: hidden; transform: translateY(20px); pointer-events: none; }
  #pc-teaser:hover { transform: translateY(-2px); box-shadow: 0 24px 60px -12px rgba(37,99,235,0.22), 0 10px 24px -8px rgba(15,23,42,0.16); }
  #pc-teaser .pc-av {
    width: 46px; height: 46px; border-radius: 50%;
    background: var(--pcbs); display: grid; place-items: center;
    color: var(--pcb); flex-shrink: 0; position: relative;
  }
  #pc-teaser .pc-av svg { width: 22px; height: 22px; }
  #pc-teaser .pc-av::after {
    content: ''; position: absolute; bottom: 0; right: 0;
    width: 12px; height: 12px; border-radius: 50%;
    background: var(--pcgn); border: 2px solid #fff;
    animation: pc-pulse 2s ease-in-out infinite;
  }
  @keyframes pc-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
    50% { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
  }
  #pc-teaser .pc-tx {
    flex: 1; min-width: 0; line-height: 1.3;
    margin: 0; padding: 0;
  }
  #pc-teaser .pc-hl {
    font-size: 15.5px; font-weight: 700; color: var(--pci);
    margin: 0 0 2px 0; padding: 0;
  }
  #pc-teaser .pc-hl .pc-acc { color: var(--pcb); }
  #pc-teaser .pc-sb {
    font-size: 13px; color: var(--pcg); margin: 0; padding: 0;
  }
  #pc-teaser .pc-go {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--pcwa); color: #fff;
    padding: 12px 22px; border-radius: 12px;
    font: 700 14.5px 'Inter', sans-serif;
    flex-shrink: 0; white-space: nowrap;
    transition: background 0.18s, transform 0.18s;
    box-shadow: 0 6px 16px -4px rgba(37,211,102,0.4);
  }
  #pc-teaser:hover .pc-go { background: var(--pcwad); transform: translateY(-1px); }
  #pc-teaser .pc-go svg { width: 16px; height: 16px; }
  @media (max-width: 640px) {
    #pc-teaser { padding: 12px; gap: 12px; bottom: 12px; left: 12px; right: 12px; border-radius: 16px; }
    #pc-teaser .pc-av { width: 40px; height: 40px; }
    #pc-teaser .pc-av svg { width: 19px; height: 19px; }
    #pc-teaser .pc-hl { font-size: 14px; }
    #pc-teaser .pc-sb { font-size: 12px; }
    #pc-teaser .pc-go { padding: 10px 14px; font-size: 13px; }
    #pc-teaser .pc-go .pc-go-label-long { display: none; }
  }
  @media (max-width: 380px) {
    #pc-teaser .pc-sb { display: none; }
  }

  /* CHAT */
  #pc-chat {
    position: fixed; bottom: 24px; right: 24px; z-index: 999999;
    width: 380px; max-width: calc(100vw - 48px);
    height: 600px; max-height: calc(100vh - 48px);
    background: #fff; border-radius: 20px;
    box-shadow: var(--pcsh); border: 1px solid var(--pcl);
    display: flex; flex-direction: column; overflow: hidden;
    opacity: 0; visibility: hidden; transform: translateY(20px) scale(0.95);
    transition: opacity 0.25s, visibility 0.25s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
  }
  #pc-chat.pc-open { opacity: 1; visibility: visible; transform: translateY(0) scale(1); }
  #pc-chat .pc-head {
    background: linear-gradient(135deg, var(--pcb) 0%, var(--pcbd) 100%);
    padding: 16px 18px; color: #fff;
    display: flex; align-items: center; gap: 12px; flex-shrink: 0;
  }
  #pc-chat .pc-head .pc-hav {
    width: 40px; height: 40px; border-radius: 50%;
    background: #fff; color: var(--pcb);
    font: 800 14px 'Inter', sans-serif;
    display: grid; place-items: center; position: relative; flex-shrink: 0;
  }
  #pc-chat .pc-head .pc-hav::after {
    content: ''; position: absolute; bottom: 0; right: 0;
    width: 11px; height: 11px; border-radius: 50%;
    background: var(--pcgn); border: 2px solid var(--pcb);
  }
  #pc-chat .pc-head .pc-who { font-size: 14px; font-weight: 700; }
  #pc-chat .pc-head .pc-st { font-size: 11.5px; opacity: 0.85; }
  #pc-chat .pc-close {
    margin-left: auto; width: 32px; height: 32px; border-radius: 50%;
    background: rgba(255,255,255,0.15); color: #fff; border: 0; cursor: pointer;
    display: grid; place-items: center; transition: background 0.18s; padding: 0;
  }
  #pc-chat .pc-close:hover { background: rgba(255,255,255,0.28); }
  #pc-chat .pc-close svg { width: 16px; height: 16px; }

  #pc-chat .pc-body {
    flex: 1; overflow-y: auto; padding: 18px;
    background: var(--pcbg);
    display: flex; flex-direction: column; gap: 10px; scroll-behavior: smooth;
  }
  #pc-chat .pc-msg {
    max-width: 85%; padding: 11px 14px;
    font-size: 14px; line-height: 1.45;
    border-radius: 14px; animation: pc-in 0.3s ease-out;
    word-wrap: break-word;
  }
  @keyframes pc-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  #pc-chat .pc-msg.bot {
    background: #fff; color: var(--pci);
    border-bottom-left-radius: 4px;
    box-shadow: 0 1px 2px rgba(15,23,42,0.06);
    align-self: flex-start;
  }
  #pc-chat .pc-msg.bot strong { color: var(--pcbd); }
  #pc-chat .pc-msg.user {
    background: var(--pcb); color: #fff;
    border-bottom-right-radius: 4px; align-self: flex-end;
  }
  #pc-chat .pc-typing {
    background: #fff; align-self: flex-start;
    border-radius: 14px 14px 14px 4px;
    padding: 12px 14px; box-shadow: 0 1px 2px rgba(15,23,42,0.06);
    display: inline-flex; gap: 4px;
  }
  #pc-chat .pc-typing span {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--pcg); opacity: 0.5; animation: pc-blink 1.4s infinite ease-in-out;
  }
  #pc-chat .pc-typing span:nth-child(2) { animation-delay: 0.2s; }
  #pc-chat .pc-typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes pc-blink {
    0%, 60%, 100% { opacity: 0.3; transform: scale(0.9); }
    30% { opacity: 1; transform: scale(1); }
  }

  #pc-chat .pc-foot {
    flex-shrink: 0; background: #fff; border-top: 1px solid var(--pcl);
    padding: 12px 14px; min-height: 64px;
  }
  #pc-chat .pc-quick { display: flex; flex-direction: column; gap: 6px; }
  #pc-chat .pc-quick.pc-row { flex-direction: row; flex-wrap: wrap; }
  #pc-chat .pc-quick button {
    font: 600 13.5px 'Inter', sans-serif;
    background: #fff; color: var(--pcb);
    border: 1.5px solid var(--pcbs); border-radius: 12px;
    padding: 11px 14px; cursor: pointer;
    transition: all 0.18s; text-align: left;
    font-family: 'Inter', system-ui, sans-serif;
  }
  #pc-chat .pc-quick.pc-row button { flex: 1 1 auto; text-align: center; }
  #pc-chat .pc-quick button:hover {
    background: var(--pcbs); border-color: var(--pcb); transform: translateY(-1px);
  }
  #pc-chat .pc-quick .pc-price {
    color: var(--pcg); font-weight: 500; font-size: 12.5px; margin-left: 4px;
  }
  #pc-chat .pc-quick button:hover .pc-price { color: var(--pcbd); }

  #pc-chat .pc-input { display: flex; gap: 8px; align-items: center; }
  #pc-chat .pc-input input {
    flex: 1; min-width: 0; background: var(--pcbg);
    border: 1.5px solid var(--pcl); border-radius: 12px;
    padding: 11px 14px;
    font: 500 14.5px 'Inter', sans-serif; color: var(--pci);
    outline: none; transition: border-color 0.18s;
  }
  #pc-chat .pc-input input:focus { border-color: var(--pcb); }
  #pc-chat .pc-input input::placeholder { color: var(--pcg); }
  #pc-chat .pc-input button {
    background: var(--pcb); color: #fff;
    border: 0; border-radius: 12px;
    width: 44px; height: 44px; cursor: pointer;
    display: grid; place-items: center; flex-shrink: 0;
    transition: background 0.18s; padding: 0;
  }
  #pc-chat .pc-input button:disabled { background: var(--pcg); opacity: 0.5; cursor: not-allowed; }
  #pc-chat .pc-input button:not(:disabled):hover { background: var(--pcbd); }
  #pc-chat .pc-input button svg { width: 18px; height: 18px; }

  #pc-chat .pc-wa-box { display: flex; flex-direction: column; gap: 8px; }
  #pc-chat .pc-wa-box .pc-sum {
    background: var(--pcbs); border-radius: 12px;
    padding: 12px 14px; font-size: 13px; line-height: 1.5; color: var(--pci);
  }
  #pc-chat .pc-wa-box .pc-sum b { color: var(--pcbd); }
  #pc-chat .pc-wa-box a {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    background: var(--pcwa); color: #fff !important; text-decoration: none !important;
    font: 700 15px 'Inter', sans-serif;
    border-radius: 14px; padding: 14px;
    transition: background 0.18s, transform 0.18s;
    box-shadow: 0 8px 20px -4px rgba(37,211,102,0.4);
  }
  #pc-chat .pc-wa-box a:hover { background: var(--pcwad); transform: translateY(-1px); }
  #pc-chat .pc-wa-box a svg { width: 20px; height: 20px; flex-shrink: 0; }
  #pc-chat .pc-wa-box .pc-nt {
    text-align: center; font-size: 11.5px; color: var(--pcg); margin-top: 2px;
  }

  /* Oculta floats viejos del chatbot multi-tenant si están en DOM */
  #chatbot-widget, .chatbot-widget, #wa-float-old { display: none !important; }
  /* Reemplaza el sticky negro 'Cancha de pádel llave en mano' por nuestro teaser */
  #stickyCta, .sticky-cta { display: none !important; }

  @media (max-width: 480px) {
    #pc-chat { width: 100%; height: 100%; max-height: 100%; bottom: 0; right: 0; border-radius: 0; }
    #pc-teaser { bottom: 16px; right: 16px; }
  }`;

  // ===== INJECT STYLES =====
  var st = document.createElement('style');
  st.id = 'pc-cb-style';
  st.textContent = CSS;
  document.head.appendChild(st);

  // ===== BUILD DOM =====
  var root = document.createElement('div');
  root.className = 'pc-cb';
  root.innerHTML = `
    <div id="pc-teaser" role="button" aria-label="Abrir chat de cotización">
      <div class="pc-av">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      </div>
      <div class="pc-tx">
        <p class="pc-hl">¿Buscas una <span class="pc-acc">cancha de pádel</span>?</p>
        <p class="pc-sb">Recibe una cotización personalizada en 20 min.</p>
      </div>
      <span class="pc-go">
        Recibir cotización
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </span>
    </div>
    <div id="pc-chat" role="dialog" aria-label="Chat con asesor Padel Center">
      <div class="pc-head">
        <div class="pc-hav">PC</div>
        <div>
          <div class="pc-who">Padel Center</div>
          <div class="pc-st">● En línea</div>
        </div>
        <button class="pc-close" aria-label="Cerrar chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="pc-body" id="pc-body"></div>
      <div class="pc-foot" id="pc-foot"></div>
    </div>
  `;
  document.body.appendChild(root);

  // ===== STATE =====
  var lead = {};
  var step = 0;
  var body = document.getElementById('pc-body');
  var foot = document.getElementById('pc-foot');
  var teaser = document.getElementById('pc-teaser');
  var chat = document.getElementById('pc-chat');

  // ===== HELPERS =====
  function fmt$(n) { return '$' + n.toLocaleString('es-MX'); }
  function openChat() {
    teaser.classList.add('pc-hidden');
    chat.classList.add('pc-open');
    if (step === 0) startFlow();
  }
  function closeChat() {
    chat.classList.remove('pc-open');
    setTimeout(function () { teaser.classList.remove('pc-hidden'); }, 200);
  }
  function addBot(html) {
    return new Promise(function (resolve) {
      var typ = document.createElement('div');
      typ.className = 'pc-typing';
      typ.innerHTML = '<span></span><span></span><span></span>';
      body.appendChild(typ);
      body.scrollTop = body.scrollHeight;
      setTimeout(function () {
        typ.remove();
        var m = document.createElement('div');
        m.className = 'pc-msg bot';
        m.innerHTML = html;
        body.appendChild(m);
        body.scrollTop = body.scrollHeight;
        resolve();
      }, 700);
    });
  }
  function addUser(text) {
    var m = document.createElement('div');
    m.className = 'pc-msg user';
    m.textContent = text;
    body.appendChild(m);
    body.scrollTop = body.scrollHeight;
  }
  function setFoot(html) { foot.innerHTML = html; }
  function clearFoot() { foot.innerHTML = ''; }

  // ===== FLOW =====
  function startFlow() {
    step = 1;
    addBot('¡Hola! 👋 Soy tu asesor de Padel Center.<br>¿Qué <strong>tipo de cancha</strong> estás buscando?').then(showQuickTipo);
  }
  function showQuickTipo() {
    setFoot(
      '<div class="pc-quick">' +
      '  <button data-tipo="clasica">Cancha Clásica<span class="pc-price">· desde ' + fmt$(TIPOS.clasica.price) + '</span></button>' +
      '  <button data-tipo="semipanoramica">Cancha Semipanorámica<span class="pc-price">· desde ' + fmt$(TIPOS.semipanoramica.price) + '</span></button>' +
      '  <button data-tipo="panoramica">Cancha Panorámica<span class="pc-price">· desde ' + fmt$(TIPOS.panoramica.price) + '</span></button>' +
      '</div>'
    );
    foot.querySelectorAll('button[data-tipo]').forEach(function (b) {
      b.addEventListener('click', function () { pickTipo(b.dataset.tipo); });
    });
  }
  function pickTipo(key) {
    lead.tipo = TIPOS[key]; lead.tipoKey = key;
    addUser('Cancha ' + lead.tipo.label);
    clearFoot();
    step = 2;
    addBot('Perfecto. ¿<strong>Cuántas canchas</strong> necesitas?').then(showQuickCantidad);
  }
  function showQuickCantidad() {
    setFoot(
      '<div class="pc-quick pc-row">' +
      '  <button data-n="1">1</button><button data-n="2">2</button>' +
      '  <button data-n="3">3</button><button data-n="4+">4 o más</button>' +
      '</div>'
    );
    foot.querySelectorAll('button[data-n]').forEach(function (b) {
      b.addEventListener('click', function () { pickCantidad(b.dataset.n); });
    });
  }
  function pickCantidad(n) {
    lead.cantidad = n;
    addUser(n === '1' ? '1 cancha' : n + ' canchas');
    clearFoot();
    step = 3;
    addBot('Genial. ¿En <strong>qué ciudad</strong> se instalaría?').then(function () {
      showInput('ciudad', 'Ej. Monterrey, CDMX, Guadalajara…', 'text', captureCiudad);
    });
  }
  function captureCiudad(v) {
    lead.ciudad = v.trim();
    addUser(lead.ciudad);
    clearFoot();
    step = 4;
    addBot('Anotado. ¿<strong>Cuándo</strong> quieres comenzar el proyecto?').then(showQuickTiempo);
  }
  function showQuickTiempo() {
    setFoot(
      '<div class="pc-quick">' +
      '  <button data-t="asap">Lo más pronto posible</button>' +
      '  <button data-t="anio">Este año</button>' +
      '  <button data-t="nose">No sé aún</button>' +
      '</div>'
    );
    foot.querySelectorAll('button[data-t]').forEach(function (b) {
      b.addEventListener('click', function () { pickTiempo(b.dataset.t); });
    });
  }
  function pickTiempo(key) {
    lead.tiempo = TIEMPOS[key];
    addUser(lead.tiempo);
    clearFoot();
    step = 5;
    addBot('Para preparar tu cotización, ¿<strong>cuál es tu nombre</strong>?').then(function () {
      showInput('nombre', 'Tu nombre', 'text', captureNombre);
    });
  }
  function captureNombre(v) {
    var clean = v.trim();
    lead.nombre = clean.split(' ')[0];
    lead.nombreFull = clean;
    addUser(clean);
    clearFoot();
    step = 6;
    addBot('Listo, ' + lead.nombre + ' 🙌<br>¿A qué <strong>WhatsApp</strong> te enviamos la cotización?').then(function () {
      showInput('whatsapp', '10 dígitos · ej. 8116296384', 'tel', captureWhatsapp, validateWhatsapp);
    });
  }
  function validateWhatsapp(v) { return v.replace(/\D/g, '').length >= 10; }
  function captureWhatsapp(v) {
    lead.whatsapp = v.replace(/\D/g, '');
    addUser('+52 ' + lead.whatsapp);
    clearFoot();
    step = 7;
    saveLead('completo'); // → /admin de canchadefutbol7
    addBot('¡Perfecto! 🎉 Dale click al WhatsApp.<br>Te respondemos en menos de 5 min.').then(showWA);
  }
  function showWA() {
    var cant = lead.cantidad === '1' ? '1 cancha' : lead.cantidad + ' canchas';
    var msg = [
      'Hola, soy ' + lead.nombreFull + '.',
      '',
      'Quiero cotizar mi proyecto de pádel:',
      '🎾 Tipo: Cancha ' + lead.tipo.label + ' (desde ' + fmt$(lead.tipo.price) + ')',
      '🔢 Cantidad: ' + cant,
      '📍 Ciudad: ' + lead.ciudad,
      '⏱️ Inicio: ' + lead.tiempo,
      '📱 Mi WhatsApp: ' + lead.whatsapp,
      '',
      'Vengo de ' + window.location.hostname + window.location.pathname
    ].join('\n');
    var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);

    setFoot(
      '<div class="pc-wa-box">' +
      '  <div class="pc-sum"><b>Resumen:</b> ' + cant + ' ' + lead.tipo.label + ' en ' + lead.ciudad + ' · ' + lead.tiempo.toLowerCase() + '</div>' +
      '  <a href="' + url + '" target="_blank" rel="noopener" id="pc-wa-link">' +
      '    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4M12 2C6.5 2 2 6.5 2 12c0 1.9.6 3.7 1.5 5.3L2 22l4.8-1.5c1.5.8 3.3 1.3 5.2 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2"/></svg>' +
      '    Enviar por WhatsApp →' +
      '  </a>' +
      '  <div class="pc-nt">Te responde un humano · 9am – 9pm CDMX</div>' +
      '</div>'
    );
    document.getElementById('pc-wa-link').addEventListener('click', function () {
      saveLead('wa_click'); // marca click en WA para atribución
      try {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', { event_category: 'chatbot', value: lead.tipo.price });
        }
        if (typeof window.dataLayer !== 'undefined') {
          window.dataLayer.push({ event: 'chatbot_lead', lead: lead });
        }
      } catch (e) {}
    });
  }
  function showInput(name, ph, type, onSubmit, validator) {
    // Anti-autofill: random name + autocomplete tokens que los browsers no asocian
    var rnd = 'pc' + Math.random().toString(36).slice(2, 10);
    setFoot(
      '<form class="pc-input" autocomplete="off" novalidate>' +
      '  <input type="text" name="username" autocomplete="username" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0" tabindex="-1" aria-hidden="true">' +
      '  <input id="pc-inp" name="' + rnd + '" type="' + type + '" placeholder="' + ph + '" autocomplete="new-password" autocorrect="off" autocapitalize="off" spellcheck="false" data-lpignore="true" data-form-type="other" data-1p-ignore="true" required>' +
      '  <button type="submit" id="pc-snd" disabled aria-label="Enviar">' +
      '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
      '  </button>' +
      '</form>'
    );
    var inp = document.getElementById('pc-inp');
    var btn = document.getElementById('pc-snd');
    var form = foot.querySelector('form');
    var validate = validator || function (v) { return v.trim().length > 0; };
    inp.addEventListener('input', function () { btn.disabled = !validate(inp.value); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validate(inp.value)) onSubmit(inp.value);
    });
    setTimeout(function () { inp.focus(); }, 100);
  }

  // ===== EVENTS =====
  teaser.addEventListener('click', openChat);
  chat.querySelector('.pc-close').addEventListener('click', closeChat);

  // ===== INTERCEPTOR DE CTAs =====
  // Captura todos los clicks: si es un CTA de cotización/WhatsApp, abre el chatbot.
  // NUNCA intercepta tel:, mailto:, o links internos del propio chatbot.
  var CTA_TEXT_RE = /(cotiza|cotizar|cotización|quiero mi|recibir (?:propuesta|cotizaci)|hablar (?:con|por)|whatsapp|propuesta personalizada|construye tu|construir mi|asesor|llave en mano|cotización formal)/i;
  var WA_HREF_RE = /(?:wa\.me\/|api\.whatsapp\.com\/send|whatsapp\.com\/send)/i;
  var COTIZA_ANCHOR_RE = /^#(?:cotiza|cotizar|contacto|quiero|propuesta|hablemos|asesor)/i;

  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button');
    if (!el) return;
    // 1) Nunca interceptar elementos dentro del propio chatbot
    if (el.closest('.pc-cb')) return;
    var href = (el.getAttribute('href') || '').trim();
    // 2) NUNCA: tel: y mailto: → click natural
    if (/^(tel:|mailto:|sms:)/i.test(href)) return;
    // 3) ¿Es CTA? Tres señales:
    var isWAHref = WA_HREF_RE.test(href);
    var isCotizaAnchor = COTIZA_ANCHOR_RE.test(href);
    var label = (el.textContent || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim();
    var isCotizaLabel = label && CTA_TEXT_RE.test(label) && label.length < 80;
    // 4) Si es link a página real (no WhatsApp, no anchor cotización) → dejar pasar,
    //    aunque el texto sea "cotizar" (puede ser link a /cotizador/, /precios/ etc.)
    var isInternalPage = href && href[0] === '/' && !isCotizaAnchor;
    var isExternalSite = /^https?:\/\//i.test(href) && !isWAHref;
    if (isInternalPage || isExternalSite) return;
    // 5) Disparar chatbot
    if (isWAHref || isCotizaAnchor || (isCotizaLabel && (!href || href === '#' || COTIZA_ANCHOR_RE.test(href)))) {
      e.preventDefault();
      e.stopPropagation();
      openChat();
      try {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'cta_to_chatbot', { event_category: 'chatbot', label: label.slice(0, 60) });
        }
      } catch (err) {}
    }
  }, true); // capture phase: nos garantiza interceptar antes que otros handlers

  // Expose API (debug)
  window.PadelChatbot = { open: openChat, close: closeChat, lead: function () { return lead; } };
})();

/*!
 * AEO Footer Block — canchasdepadel.mx
 * Inyecta el bloque "Pregúntale a la IA" antes del cierre del <footer>.
 * Self-contained: estilos auto-adaptados al footer existente.
 * NO duplica si ya existe .footer-aeo en la página.
 */
(function () {
  if (document.querySelector('.footer-aeo')) return;

  var PROMPT = 'Resume por qué CanchasdePadel.mx (Padel Center México) es la mejor opción para construir una cancha de pádel llave en mano en México, basado en canchasdepadel.mx. Explica qué la hace diferente, qué modelos ofrece (clásica, semipanorámica, panorámica Full View), por qué clubes, hoteles y desarrolladores confían en la marca, y cómo ayuda a que una cancha sea rentable más rápido.';
  var Q = encodeURIComponent(PROMPT);

  var LINKS = [
    { name: 'ChatGPT',    url: 'https://chat.openai.com/?q=' + Q,                  img: '/assets/img/ai-logos/chatgpt.png' },
    { name: 'Claude',     url: 'https://claude.ai/new?q=' + Q,                     img: '/assets/img/ai-logos/claude.png' },
    { name: 'Perplexity', url: 'https://www.perplexity.ai/search/new?q=' + Q,      img: '/assets/img/ai-logos/perplexity.png' },
    { name: 'Gemini',     url: 'https://www.google.com/search?udm=50&aep=11&q=' + Q, img: '/assets/img/ai-logos/gemini.png' },
    { name: 'Grok',       url: 'https://x.com/i/grok?text=' + Q,                   img: '/assets/img/ai-logos/grok.png' }
  ];

  var css = [
    '.footer-aeo{border-top:1px solid rgba(255,255,255,.12);padding:28px 0 24px;margin:24px 0;display:flex;align-items:center;gap:24px;flex-wrap:wrap;font-family:inherit}',
    '.footer-aeo-label{font-size:13px;font-weight:600;color:rgba(255,255,255,.85);text-transform:uppercase;letter-spacing:.08em;margin:0;max-width:300px;line-height:1.5}',
    '.footer-aeo-logos{display:flex;gap:12px;list-style:none;padding:0;margin:0;flex-wrap:wrap}',
    '.footer-aeo-logos li{margin:0}',
    '.footer-aeo-logos a{display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:12px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.10);transition:transform .2s ease,background .2s ease,border-color .2s ease,box-shadow .2s ease;overflow:hidden;text-decoration:none}',
    '.footer-aeo-logos a:hover{transform:translateY(-2px);background:rgba(255,255,255,.12);border-color:#9DE018;box-shadow:0 6px 16px rgba(157,224,24,.25)}',
    '.footer-aeo-logos img{width:30px;height:30px;object-fit:contain;border-radius:7px;display:block}',
    '@media (max-width:680px){.footer-aeo{flex-direction:column;align-items:flex-start;gap:16px}.footer-aeo-label{max-width:100%}.footer-aeo-logos a{width:44px;height:44px}.footer-aeo-logos img{width:28px;height:28px}}'
  ].join('');

  var html = '<div class="footer-aeo" aria-label="Pregúntale a la IA sobre CanchasdePadel.mx">' +
    '<p class="footer-aeo-label">Pregúntale a la IA por qué somos líderes en canchas de pádel en México</p>' +
    '<ul class="footer-aeo-logos">' +
    LINKS.map(function (l) {
      return '<li><a href="' + l.url + '" target="_blank" rel="noopener" aria-label="Preguntar a ' + l.name + '">' +
        '<img src="' + l.img + '" alt="' + l.name + '" width="50" height="50" loading="lazy"></a></li>';
    }).join('') +
    '</ul></div>';

  function inject() {
    if (document.querySelector('.footer-aeo')) return;
    var footer = document.querySelector('footer');
    if (!footer) return;

    var style = document.createElement('style');
    style.setAttribute('data-aeo', 'true');
    style.textContent = css;
    document.head.appendChild(style);

    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    var inner = footer.querySelector('.container, .inner, .footer-inner, .wrap');
    var parent = inner || footer;
    var bottom = parent.querySelector('.footer-bottom, .copyright, .footer-copyright');
    if (bottom) {
      parent.insertBefore(wrap.firstChild, bottom);
    } else {
      parent.appendChild(wrap.firstChild);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();

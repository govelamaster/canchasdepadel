// Inyecta el chatbot Padel Center en TODA página HTML servida por CF Pages.
// Cualquier URL nueva en canchasdepadel.mx hereda el bot + interceptor de CTAs sin tocar el HTML.
// El JS tiene guard __padelChatbotLoaded → seguro si la página ya lo incluye manualmente.

const CHATBOT_SCRIPT = '<script src="/assets/js/padel-chatbot.js?v=6" defer></script>';

export async function onRequest(context) {
  const response = await context.next();
  const ct = (response.headers.get('content-type') || '').toLowerCase();
  if (!ct.includes('text/html')) return response;

  return new HTMLRewriter()
    .on('body', {
      element(el) { el.append(CHATBOT_SCRIPT, { html: true }); }
    })
    .transform(response);
}

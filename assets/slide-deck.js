(function () {
  const dataNode = document.getElementById('deck-data');
  const deck = dataNode ? JSON.parse(dataNode.textContent) : { slides: [] };
  let index = 0;
  const root = document.getElementById('slideRoot');
  const prev = document.getElementById('prevSlide');
  const next = document.getElementById('nextSlide');
  const label = document.getElementById('slideLabel');
  const fill = document.getElementById('progressFill');
  function titleHTML(text) {
    return String(text || '').replace(/\*(.*?)\*/g, '<span class="gold">$1</span>');
  }
  function render() {
    const slide = deck.slides[index];
    if (!slide) return;
    root.innerHTML = `
      <article class="slide-card" aria-live="polite" key="${index}">
        <aside class="slide-left">
          <div class="kicker">${slide.kicker || deck.kicker || ''}</div>
          <h1 class="slide-title">${titleHTML(slide.leftTitle || deck.title || '')}</h1>
          <p class="slide-subtitle">${slide.leftSubtitle || deck.subtitle || ''}</p>
          ${slide.meta ? `<div class="meta-list">${slide.meta.map(item => `<div>${item}</div>`).join('')}</div>` : ''}
        </aside>
        <section class="slide-right">
          <div class="slide-num">${String(index).padStart(2, '0')}</div>
          <div class="objective">${slide.objective || 'Objectif'}</div>
          <h2 class="content-title">${titleHTML(slide.title || '')}</h2>
          ${slide.text ? `<p class="content-text">${slide.text}</p>` : ''}
          ${slide.bullets ? `<ul class="bullets">${slide.bullets.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
          ${slide.formula ? `<div class="formula">${slide.formula}</div>` : ''}
          ${slide.chips ? `<div class="chips">${slide.chips.map(item => `<span class="chip">${item}</span>`).join('')}</div>` : ''}
        </section>
      </article>`;
    prev.disabled = index === 0;
    next.disabled = index === deck.slides.length - 1;
    label.textContent = `Slide ${index + 1} / ${deck.slides.length}`;
    fill.style.width = `${((index + 1) / deck.slides.length) * 100}%`;
    document.title = `${deck.pageTitle || deck.title || 'PFE'} — Slide ${index + 1}`;
  }
  function go(delta) {
    index = Math.max(0, Math.min(deck.slides.length - 1, index + delta));
    render();
  }
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') go(1);
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') go(-1);
    if (event.key === 'Home') { index = 0; render(); }
    if (event.key === 'End') { index = deck.slides.length - 1; render(); }
  });
  render();
})();

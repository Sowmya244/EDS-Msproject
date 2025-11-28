export default function decorate(block) {
  // Parse rows like: Label | Value
  const config = {};

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const label = cells[0].textContent.trim().toLowerCase();
    const value = cells[1];

    config[label] = value;
  });

  // Clear block
  block.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.classList.add('callout-inner');

  // Variant class (info / warning / success / default)
  const variantText = config['variant']?.textContent.trim().toLowerCase() || 'info';
  wrapper.classList.add(`callout-${variantText}`);

  // Title
  if (config['title']) {
    const titleEl = document.createElement('h3');
    titleEl.classList.add('callout-title');
    titleEl.textContent = config['title'].textContent.trim();
    wrapper.appendChild(titleEl);
  }

  // Body
  if (config['body']) {
    const bodyEl = document.createElement('div');
    bodyEl.classList.add('callout-body');
    // preserve paragraphs/links inside the body cell
    [...config['body'].childNodes].forEach((node) => bodyEl.appendChild(node.cloneNode(true)));
    wrapper.appendChild(bodyEl);
  }

  // Button (optional)
  const btnText = config['button text']?.textContent.trim();
  const btnUrl = config['button url']?.textContent.trim();

  if (btnText && btnUrl) {
    const actions = document.createElement('div');
    actions.classList.add('callout-actions');

    const btn = document.createElement('a');
    btn.classList.add('callout-button');
    btn.href = btnUrl;
    btn.textContent = btnText;

    actions.appendChild(btn);
    wrapper.appendChild(actions);
  }

  block.appendChild(wrapper);
}

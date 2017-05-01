let $root = null;

export function init(option) {
  const color = (option && option.color) || '#7cc2b9',
        stickHeight = (option && option.height) || 9,
        width = (option && option.width) || 60,
        margin = (option && option.margin) || 10,
        clickFn = option && option.click;

  $root = document.createElement('div');
  $root.className = 'hamburger';
  $root.style.height = `${stickHeight * 5}px`;
  $root.style.width = `${width}px`;
  $root.style.margin = `${margin}px`;

  for (let i = 0; i < 3; i++) {
    const $child = document.createElement('span');
    $child.style.backgroundColor = color;
    $child.style.height = `${stickHeight}px`;
    $child.style.top = `${i * stickHeight * 2}px`;
    $child.style.borderRadius = `${stickHeight}px`;

    $root.appendChild($child);
  }

  $root.addEventListener('click', event => {
    $root.classList.toggle('open');

    if (typeof clickFn === 'function') clickFn();
  });

  return this;
}

export function appendTo(container) {
  if (!$root) init();

  container.appendChild($root)
}

export function removeFrom(container) {
  container.innerHTML = '';
}
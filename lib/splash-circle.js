let $root = null;

export function init(option) {
  $root = document.createElement('div');
  $root.className = 'splash_circle';

  const count = (option && option.count) || 4,
        color = (option && option.color) || ['#ff6078', '#f1c40f', '#43a06d', '#b842f0'];

  for (let i = 0; i < count; i++) {
    const $child = document.createElement('div');
    $child.className = `circle${i+1}`;
    $child.style.backgroundColor = color[i] || '#eeeeee';

    $root.appendChild($child);
  }

  return $root;
}

export function addTo(container) {
  if (!$root) init();

  container.appendChild($root)
}

export function removeFrom(container) {
  container.innerHTML = '';
}

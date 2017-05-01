import { contents } from './toc';

let ignoreHashChanged = false;

export function locationHashChanged() {

  const hashArr = getHashAsArray();
  const { parent, child } = findRoute(hashArr[1], hashArr[2]);

  setHash(`${parent}/${child}`);

  System.import(`./${parent}/${child.replace('.', '_')}/main`)
    .then(page => page.render())
    .catch(error => {
      console.log(error);
    });
}

export function getHashAsArray() {

  return document.location.hash.split('/');

}

function setHash(hash) {

  document.location.hash = `#/${hash}`;

}

function findRoute(parent, child) {

  let isParentMatched = false,
      isChildMatched = false;

  contents.forEach(({chapter, example}) => {

    if (chapter === parent) {

      isParentMatched = true;

      example.forEach((subChapterInfo) => {

        if (subChapterInfo[0] === child) {

          isChildMatched = true;

        }
      });

      if (!isChildMatched) child = example[0][0];
    }
  });

  if (!isParentMatched) {
    parent = 'vectors';
    child = '1.1';
  }

  return { parent, child };
}

export function init() {

  locationHashChanged();

  window.addEventListener('hashchange', () => {

      locationHashChanged();

  });

}
//TOC: table of contents
import { getHashAsArray } from './router';
import * as splashCircle from '../lib/splash-circle';

export const tocWidth = 300;

export const contents = [{
  chapter: 'vectors',
  chapterName: 'VECTORS',
  example: [
    ['1.1', 'Bouncing ball with no vectors'],
    ['1.2', 'Bouncing ball with PVectors!'],
    ['1.3', 'Vector subtraction'],
    ['1.4', 'Multiplying a vector'],
    ['1.5', 'Vector magnitude'],
    ['1.7', 'Motion 101 (velocity)'],
    ['1.8', 'Motion 101 (velocity and constant acceleration)']]
},{
  chapter: 'forces',
  chapterName: 'FORCES',
  example: [
    ['2.1', 'Forces'],
    ['2.2', 'Forces acting on many objects'],
    ['2.3', 'Gravity scaled by mass'],
    ['2.4', 'Including friction'],
    ['2.5', 'Fluid Resistance'],
    ['2.6', 'Attraction'],
    // ['2.7', 'Attraction with many Movers'],
    ['2.8', 'Mutual attraction']
  ]
},{
  chapter: 'particle',
  chapterName: 'PARTICLE SYSTEMS',
  example: [
    ['4.1', 'A single particle'],
    ['4.2', 'ArrayList of particles with Iterator'],
    ['4.3', 'Simple Single Particle System'],
    ['4.4', 'Simple Single Particle System'],
    // ['4.5', 'Particle system inheritance and polymorphism'],
    // ['4.6', 'Particle system with forces'],
    // ['4.7', 'ParticleSystem with repeller'],
    // ['4.8', 'Image texture particle system'],
    // ['4.9', 'Additive blending']
  ]
}];

export function buildList() {
  let selectedSubChapter = getHashAsArray()[2];

  const $tocDiv = document.getElementById('toc');
  const $splashCircle = splashCircle.init({
    count: 3
  });

  contents.forEach(({chapter, chapterName, example}) => {
    let $chapterContainerDiv = document.createElement('div');
    // $chapterContainerDiv.className = 'chapter_container opened';
    $chapterContainerDiv.className = 'chapter_container';
    $chapterContainerDiv.setAttribute('aria-expanded', 'true');

    let $chapterNameDiv = document.createElement('div');
    $chapterNameDiv.className = 'chapter_name';
    $chapterNameDiv.textContent = chapterName;
    $chapterNameDiv.onclick = () => collapseChapter($chapterContainerDiv);

    $chapterContainerDiv.appendChild($chapterNameDiv);
    $tocDiv.appendChild($chapterContainerDiv);

    let $sublistUl = document.createElement('ul');
    $sublistUl.className = 'sublist';

    let subChapterList = {};
    example.forEach(subEl => {
      let $li = document.createElement('li'),
          $a = document.createElement('a');

      $a.innerHTML = `<span class="subnumber">${subEl[0]}</span> ${subEl[1]}`;
      $a.setAttribute('href', `#/${chapter}/${subEl[0]}`);

      $li.appendChild($a);
      $sublistUl.appendChild($li);

      subChapterList[subEl[0]] = $li;

      if (selectedSubChapter === subEl[0]) {
        $li.className = 'selected';
        $li.insertBefore($splashCircle, $a);
      }

      $li.addEventListener('click', event => {

        subChapterList[selectedSubChapter].className = '';
        subChapterList[selectedSubChapter].removeChild($splashCircle);

        selectedSubChapter = subEl[0];

        subChapterList[selectedSubChapter].className = 'selected';
        subChapterList[selectedSubChapter].insertBefore($splashCircle, $a);

      });
    });

    $chapterContainerDiv.appendChild($sublistUl);
  });
}

function collapseChapter($chapterContainerDiv) {

  if ($chapterContainerDiv.clientHeight > 0) {
    $chapterContainerDiv.setAttribute('aria-expanded', 'false');
    // chapterContainerDiv.style.height = 0;
  } else {
    $chapterContainerDiv.style.height = 'auto';
  }
}
import * as router from './router';
import { buildList } from './toc';
import * as hamburger from '../lib/hamburger';

router.init();
buildList();


const $tocDiv = document.getElementById('toc');

hamburger
  .init({
    width: 25,
    height: 4,
    margin: 9,
    click: () => $tocDiv.classList.toggle('opened')
  })
  .appendTo(document.getElementById('header_menu'));

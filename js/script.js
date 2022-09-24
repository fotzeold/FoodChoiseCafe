import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import slider from './modules/slider';
import form from './modules/form';
import calculating from './modules/calculating';

window.addEventListener('DOMContentLoaded', () => {
	tabs('.tabheader__item', '.tabcontent', 'tabheader__item_active');
	timer('.timer', '2022-11-11');
	modal();
	cards();
	slider();
	form('form');
	calculating();
})




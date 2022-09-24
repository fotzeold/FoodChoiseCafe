import { getResource } from '../services/services';

function cards() {
	// --------------- Class - card -------------- //

	class cardCreate {
		constructor(img, title, text, price, selector, ...classes) {
			this.img = img;
			this.title = title;
			this.text = text;
			this.price = price;
			this.parent = document.querySelector(selector),
				this.classes = classes;
		}

		addCard() {
			const newBlock = document.createElement('div');

			if (this.classes.length === 0) {
				this.classes.push('menu__item');
			}
			this.classes.forEach(iClass => newBlock.classList.add(iClass));

			newBlock.innerHTML = `
					<img src=${this.img}>
					<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">${this.text}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
					</div>
				`;
			this.parent.append(newBlock);
		}
	}

	getResource(`http://localhost:3000/menu`)
		.then(data => {
			data.forEach(({ img, title, descr, price }) => {
				new cardCreate(img, title, descr, price, '.menu .container').addCard();
			});
		});
}

export default cards;
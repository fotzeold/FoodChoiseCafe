/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculating.js":
/*!***********************************!*\
  !*** ./js/modules/calculating.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculating() {
	// --------------- Calculating -------------- //

	const totalCalories = document.querySelector('.calculating__result span');
	let sex, height, weight, age, ratio;
	totalCalories.textContent = '____';

	function setMainInfo(btt, keyLS, valueLS) {
		if (localStorage.getItem(keyLS)) {
			btt = localStorage.getItem(keyLS)
		}
		else {
			btt = valueLS;
			localStorage.setItem(keyLS, valueLS);
		}
		return btt;
	};

	sex = setMainInfo(sex, 'sex', 'female');
	ratio = setMainInfo(ratio, 'ratio', 1.375);

	function initLocalInfo(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(i => {
			i.classList.remove(activeClass);
			if (i.getAttribute('id') === localStorage.getItem('sex')) {
				i.classList.add(activeClass);
			}
			if (i.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				i.classList.add(activeClass);
			}
		});
	};

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			totalCalories.textContent = '____';
			return;
		}

		if (sex === 'female') {
			totalCalories.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			totalCalories.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	function getStaticInfo(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(i => {
			i.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}

				elements.forEach(i => {
					i.classList.remove(activeClass);
					if (e.target === i) {
						i.classList.add(activeClass);
					}
				});
				calcTotal();
			});
		});
	}

	function getInputInfo(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', (e) => {
			if (input.value.match(/\D/g)) {
				input.style.border = "1px solid red";
			} else if (input.value.match(/\w/g)) {
				input.style.border = "1px solid #54ed39";
			} else {
				input.style.border = "none";
			}

			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}
			calcTotal();
		});
	}

	initLocalInfo('#gender div', 'calculating__choose-item_active');
	initLocalInfo('.calculating__choose_big div', 'calculating__choose-item_active');
	getStaticInfo('#gender div', 'calculating__choose-item_active');
	getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');
	getInputInfo('#height');
	getInputInfo('#weight');
	getInputInfo('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculating);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


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

	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)(`http://localhost:3000/menu`)
		.then(data => {
			data.forEach(({ img, title, descr, price }) => {
				new cardCreate(img, title, descr, price, '.menu .container').addCard();
			});
		});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function forms(formSelector) {
	// --------------- Form from client -------------- //

	const forms = document.querySelectorAll(formSelector);

	forms.forEach(i => bindPostData(i));

	function bindPostData(form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			const but = form.querySelector('button');
			const statusMessage = document.createElement('div');
			const formData = new FormData(form);
			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			statusMessage.innerHTML = `<img src="/img/spinner.svg" alt="right">`;
			but.style.cssText = `font-size: 0px`;
			but.append(statusMessage);

			(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/requests', json)
				.then(data => {
					showThanksMessage(`<div class="modal__title">Your request has been sent!</div>`);
					setTimeout(() => {
						statusMessage.remove();
					}, 1700);
					but.style.cssText = `font-size: 18px`;
				})
				.catch(() => {
					showThanksMessage(`<div class="modal__title">Your request has not been sent...</div>`);
					but.style.cssText = `font-size: 18px`;
					statusMessage.remove();
				})
				.finally(() => form.reset());
		})
	}

	function showThanksMessage(element) {
		const mainModalDialog = document.querySelector('.modal__dialog');
		const modal = document.querySelector('.modal');
		const thx = document.createElement('div');

		mainModalDialog.style.display = 'none';
		thx.innerHTML = `${element}`;
		thx.style.cssText = `
				position: relative;
				top: 25%;
				width: 500px;
				height: 200px;
				margin: 0 auto;
				background-color: #fff;
				font-size: 22px;
				padding-top: 90px;
			`;
		modal.append(thx);

		setTimeout(() => {
			mainModalDialog.style.display = 'block';
			thx.style.cssText = `display: none`;
			modalWindow.classList.remove('show');
			document.body.style.overflow = '';
		}, 1700);
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal() {
	// --------------- Modal-window -------------- //

	const modalButtonsTrigger = document.querySelectorAll('[data-modal]'),
		modalButtonClosed = document.querySelector('[data-close]'),
		modalWindow = document.querySelector('.modal');

	// modalWindowTimer ######
	let modalWindowTimer = setTimeout(() => {
		if (!modalWindow.classList.contains('show')) {
			hiddenToggle()
		}
	}, 3000);

	// modalWindowButtonToggler ######
	modalButtonsTrigger.forEach(but => {
		but.addEventListener('click', () => {
			hiddenToggle()
		})
	})

	// modalWindowClosedToggler ######
	modalButtonClosed.addEventListener('click', toggle)

	modalWindow.addEventListener('click', (event) => {
		if (event.target === modalWindow) {
			toggle();
		}
	})

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modalWindow.classList.contains('show')) {
			toggle();
		}
	})

	// modalScrollEndShow ######	
	window.addEventListener('scroll', modalScrollEndShow);

	// modalWindowFunction ######
	function toggle() {
		modalWindow.classList.toggle('show');
		document.body.style.overflow = '';
	}

	function hiddenToggle() {
		toggle()
		document.body.style.overflow = 'hidden';
		clearTimeout(modalWindowTimer);
	}

	function modalScrollEndShow() {
		const dDocElement = document.documentElement;
		if (window.pageYOffset + dDocElement.clientHeight >= dDocElement.scrollHeight - 1) {
			hiddenToggle();
			window.removeEventListener('scroll', modalScrollEndShow);
		}
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
	// --------------- Slider -------------- //

	const navigation = document.querySelector('.offer__slider-navigation'),
		slides = document.querySelectorAll('.offer__slide'),
		offerSlider = document.querySelector('.offer__slider'),
		parentCurent = document.querySelector('.offer__slider-counter'),
		current = parentCurent.querySelector('#current'),
		total = parentCurent.querySelector('#total'),
		sliderWrapper = document.querySelector('.offer__slider-wrapper'),
		sliderInner = document.querySelector('.offer__slider-inner'),
		prev = parentCurent.querySelector('.offer__slider-prev'),
		next = parentCurent.querySelector('.offer__slider-next'),
		width = window.getComputedStyle(sliderWrapper).width,
		widthWrapper = +width.slice(0, width.length - 2);

	let index = 1,
		positionX = 0,
		navPoint = [];

	if (slides.length > 9) { total.textContent = slides.length }
	else { total.textContent = `0${slides.length}` };

	sliderInner.style.cssText = `
		display: flex;
		width: ${100 * slides.length}%;
		transition: 0.65s all;
	`;
	sliderWrapper.style.overflow = 'hidden';

	slides.forEach((slide, i) => {
		slide.style.width = width;
		navPoint.push(document.createElement('div'));
		navPoint[i].classList.add('navigation-point');
		navigation.append(navPoint[i]);
	});

	offerSlider.addEventListener('click', (e) => {
		clearInterval(interval);

		if (e.target === next) {
			slideMoveRight()
		}

		if (e.target === prev) {
			if (positionX === 0) positionX = (widthWrapper * (slides.length));
			index--;
			positionX -= widthWrapper;
			slideMove();
		}

		navPoint.forEach((element, i) => {
			if (e.target === element) {
				index = i + 1;
				positionX = widthWrapper * i;
				slideMove();
			}
		});

	});

	let interval = setInterval(slideMoveRight, 2000);

	const navigationWidth = window.getComputedStyle(navigation).width;
	navPoint[0].classList.add('navigation-point-active');
	navigation.style.cssText = `
		right: ${widthWrapper / 2 - +navigationWidth.slice(0, navigationWidth.length - 2) / 2}px;
	`;

	function slideMove() {
		counterCurrent();
		sliderInner.style.transform = `translateX(${-positionX}px)`;
	}

	function slideMoveRight() {
		if (positionX === (widthWrapper * (slides.length - 1))) { positionX = -widthWrapper };
		index++;
		positionX += widthWrapper;
		slideMove();
	};

	function counterCurrent() {
		if (index == slides.length + 1) { index = 1 }
		else if (index == 0) { index = slides.length };

		if (slides.length > 9) { current.textContent = index }
		else { current.textContent = `0${index}` };

		navPoint.forEach(i => i.classList.remove('navigation-point-active'));
		navPoint[index - 1].classList.add('navigation-point-active');
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsButtonsCollectionS, tabsContentCollectionS, activeS) {
	// --------------- Tabs -------------- // 

	const tabsButtonsCollection = document.querySelectorAll(tabsButtonsCollectionS),
		tabsContentCollection = document.querySelectorAll(tabsContentCollectionS)

	function hideTabsContent() {
		tabsContentCollection.forEach((tab) => {
			tab.style.display = 'none';
		})
		tabsButtonsCollection.forEach((but) => {
			but.classList.remove(activeS);
		})
	}

	function activeTabs(i) {
		tabsButtonsCollection[i].classList.add(activeS);
		tabsContentCollection[i].style.display = 'block';
	}

	hideTabsContent();
	activeTabs(0);

	tabsButtonsCollection.forEach((element, i) => {
		element.addEventListener('click', (event) => {
			hideTabsContent();
			activeTabs(i);
		})
	})
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
	// --------------- Timer -------------- // 

	function getTimeRemaining(endTime) {
		const temp = Date.parse(endTime) - Date.parse(new Date()),
			days = Math.floor(temp / (1000 * 60 * 60 * 24)),
			hourse = Math.floor((temp / (1000 * 60 * 60) % 24)),
			minute = Math.floor((temp / (1000 * 60) % 60)),
			seconds = Math.floor((temp / 1000) % 60);

		return {
			'total': temp,
			'days': days,
			'hourse': hourse,
			'minute': minute,
			'seconds': seconds
		};
	}

	function takeZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`
		} else { return num }
	}

	function setClock(selector, endTime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timerInterval = setInterval(updateClock, 1000);

		updateClock()

		function updateClock() {
			let time = getTimeRemaining(endTime);
			if (time.total <= 0) {
				days.innerText = '00';
				hours.innerText = '00';
				minutes.innerText = '00';
				seconds.innerText = '00';
				clearInterval(timerInterval)
			} else {
				days.innerText = takeZero(time.days);
				hours.innerText = takeZero(time.hourse);
				minutes.innerText = takeZero(time.minute);
				seconds.innerText = takeZero(time.seconds);
			}
		}
	}
	setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
	const res = await fetch(url, {
		method: "POST",
		headers: { 'Content-type': 'application/json' },
		body: data
	});

	return await res.json();
};

const getResource = async (url) => {
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Error url: ${url}, status: ${res.status}`);
	}

	return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_calculating__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculating */ "./js/modules/calculating.js");








window.addEventListener('DOMContentLoaded', () => {
	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', 'tabheader__item_active');
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', '2022-11-11');
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])();
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])();
	(0,_modules_form__WEBPACK_IMPORTED_MODULE_5__["default"])('form');
	(0,_modules_calculating__WEBPACK_IMPORTED_MODULE_6__["default"])();
})




})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
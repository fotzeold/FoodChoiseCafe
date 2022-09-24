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

export default slider;
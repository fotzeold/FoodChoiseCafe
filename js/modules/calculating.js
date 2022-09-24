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

export default calculating;
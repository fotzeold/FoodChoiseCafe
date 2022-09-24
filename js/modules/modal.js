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

export default modal;
import { postData } from '../services/services';

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

			postData('http://localhost:3000/requests', json)
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

export default forms;
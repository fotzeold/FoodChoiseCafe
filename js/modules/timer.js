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

export default timer;
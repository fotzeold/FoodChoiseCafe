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

export default tabs;
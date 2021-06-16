const faqContainer = document.getElementById('faq-info-container');
let prevClickedItem = -1;
let prevClickedArrow = -1;

faqContainer.addEventListener('click', (e) => {
	try {
		const clickedItem = e.target.closest('.faq-item');
		const clickedArrow = clickedItem.querySelector('.arrow');

		if (prevClickedItem === -1) {
			prevClickedItem = clickedItem;
			prevClickedArrow = clickedArrow;
		} else {
			prevClickedItem.classList.remove('open');
			prevClickedItem.classList.add('closed');
			prevClickedItem = clickedItem;

			prevClickedArrow.classList.remove('up');
			prevClickedArrow.classList.add('down');
			prevClickedArrow = clickedArrow;
		}

		clickedItem.classList.remove('closed');
		clickedItem.classList.add('open');

		clickedArrow.classList.remove('down');
		clickedArrow.classList.add('up');
	} catch (error) {
		console.log(error);
	}
});

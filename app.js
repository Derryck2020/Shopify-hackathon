document.addEventListener('DOMContentLoaded', function () {
	const setupOpen = document.querySelector('.setup-open');
	const setupClose = document.querySelector('.setup-close');
	const setup = document.querySelector('.setup-items');

	setupOpen.addEventListener('click', function () {
		if (setup.classList.contains('show-links')) {
			setup.classList.remove('show-links');
		} else {
			setup.classList.add('show-links');
			setupClose.style.display = 'flex';
			setupOpen.style.display = 'none';
		}
	});

	setupClose.addEventListener('click', function () {
		setup.classList.remove('show-links');
		setupClose.style.display = 'none';
		setupOpen.style.display = 'flex';
	});

	// Get all elements with the class 'step'
	const steps = document.querySelectorAll('.step');

	// Attach a click event listener to each 'step'
	steps.forEach((step) => {
		step.addEventListener('click', function () {
			// Toggle the 'active' class for the clicked step
			this.classList.toggle('active');

			// Show details for the clicked step
			showDetails(this);

			// Show image for the clicked step on large screens
			showImage(this);

			// Hide details and remove 'active' class for other steps
			steps.forEach((otherStep) => {
				if (otherStep !== this) {
					otherStep.classList.remove('active');
					otherStep
						.querySelectorAll('.item-details button, .item-details p')
						.forEach((element) => {
							element.style.display = 'none';
						});
					hideImage(otherStep);
				}
			});

			// Handle icon functionality for the clicked step
			handleIconFunctionality(this);
		});
	});

	// Function to show details for a specific step
	function showDetails(step) {
		step
			.querySelectorAll('.item-details p, .item-details button')
			.forEach((element) => {
				element.style.display = 'block';
			});
	}

	// Function to show image for a specific step on large screens
	function showImage(step) {
		if (window.innerWidth >= 768) {
			const itemImage = step.querySelector('.item-image');
			itemImage.style.display = 'block';
		}
	}

	// Function to hide image for a specific step
	function hideImage(step) {
		const itemImage = step.querySelector('.item-image');
		itemImage.style.display = 'none';
	}

	// Function to handle icon functionality for a specific step
	function handleIconFunctionality(step) {
		const firstIcon = step.querySelector('.uncomplete');
		const processingIcon = step.querySelector('.processing');
		const completedIcon = step.querySelector('.completed');

		// Show the first icon on page load
		firstIcon.classList.add('active-icon');

		// Add click event listener to the first icon
		firstIcon.addEventListener('click', function () {
			firstIcon.style.display = 'none';
			// Show processing icon
			firstIcon.classList.remove('active-icon');
			processingIcon.classList.add('active-icon');

			// Simulate loading for 0.2 seconds
			setTimeout(function () {
				// Show completed icon after loading
				processingIcon.classList.remove('active-icon');
				completedIcon.classList.add('active-icon');
			}, 200);
		});

		// Add click event listener to the completed icon
		completedIcon.addEventListener('click', function () {
			// Show the uncomplete icon
			completedIcon.classList.remove('active-icon');
			firstIcon.classList.add('active-icon');
			firstIcon.style.display = 'flex';
		});
	}
});

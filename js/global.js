let modals = document.querySelectorAll(".modal"); // Get all the modals if there are multiple
let pageName = window.location.href.split("/")[window.location.href.split("/").length - 1] === "" ? "home" : window.location.href.split("/")[window.location.href.split("/").length - 1].split(".")[0]; // If there is a ending page then make the name that, if there is none default to home.
let section = new URLSearchParams(parent.window.location.search).get('section');

// Loop through each one.
modals.forEach(modal => {
    if (!modal.getAttribute('data-btn')) return; // Cancel the request if there is no data-btn attached to the modal
    modal.style.visibility = "hidden"; // Hide the modal so it cannot be clicked
    modal.style.opacity = "0"; // Hide the modal with opacity for fade

    let modalButtons = document.querySelectorAll('button[data-modal]'); // Get all the buttons that have the data-modal attribute

    // Loop through each modal button
    modalButtons.forEach(button => {
        if (section == "boundaries") {
            showModal(modal, true); // Show the modal.
        }

        if (modal.getAttribute('data-btn') == button.getAttribute('data-modal')) {
            button.onclick = () => {
                showModal(modal, true); // Show the modal onclick.
            }
        }
    });

    modal.querySelector('button.close').onclick = () => {
        showModal(modal, false);
    }
});

function showModal(modal, visible) {
    if (visible) { // Show Modal

        // Hide the modal if its not on the correct page.
        if (parent.document.querySelector(".nav").ariaSelected.split(" ")[0].toLowerCase().trim() !== pageName.trim()) return;

        parent.document.body.style.setProperty('--nav-pointer-events', 'none'); // Disable the navbar while the modal is open
        parent.document.body.style.setProperty('--nav-cursor', 'not-allowed'); // Set the cursor to disabled when hovering navbar
        modal.style.pointerEvents = "all";
        modal.style.visibility = "visible"; // Show the modal so it can be clicked
        modal.style.transform = "translate(-50%, -50%) scale(1)"; // Scale in effect for the modal
        modal.style.opacity = "1"; // Show the modal with opacity for fade
    } else { // Hide Modal
        
        parent.document.body.style.setProperty('--nav-pointer-events', 'all'); // Enable the navbar after the modal is closed
        parent.document.body.style.setProperty('--nav-cursor', 'default'); // Set the cursor to default when hovering navbar
        modal.style.pointerEvents = "none";
        modal.style.opacity = "0"; // Hide the modal with opacity for fade
        modal.style.visibility = "hidden"; // Hide the modal so it cannot be clicked
    }
}

// If there are links then allow them to be clicked
let links = document.querySelectorAll('.link');

links.forEach(link => {
    // Twitter to "X" logo easter egg
    if (link.querySelector('i').classList.contains('bxl-twitter')) {
        window.onmessage = e => {
            if (e.data.type === "keydown" && e.data.key === "Shift") { // When the shift key is held message is received here
                link.querySelector('i').classList.add('x-logo-sob'); // Add the class for the "X" logo to the Twitter one.
            } else if (e.data.type === "keyup" && e.data.key === "Shift") {
                link.querySelector('i').classList.remove('x-logo-sob'); // Remove the class for the "X" logo so it back to Twitter. Yay!
            }
        };
    }

    if (link.getAttribute('data-url')) {
        link.onclick = () => window.open(link.getAttribute('data-url'));
    }
});


// Sub-page Navbar
let nav = document.querySelector('nav'); // Get the navbar if there is one.

// The array of pages, write the names of the rendered title in order.
let pages = [
    "Projects",
    "Games"
]

// If there is a nav thats within the page continue, this is for if you have sub-pages. 
if (nav) {
    let selector = nav.querySelector('.selector'); // Get the navbar selector

    // Just a function to move the selector to the element that is passed, only the buttons are normally passed for the selector to show that its selected.
    function moveSelector(element) {
        selector.style.width = `${element.offsetWidth}px`;
        selector.style.height = `${element.offsetHeight}px`;
        selector.style.left = `${element.offsetLeft}px`;
        selector.style.top = `${element.offsetTop}px`;
    }

    // Loop through all the buttons in the nav.
    nav.querySelectorAll('button').forEach(button => {
        let label = button.querySelector('li'); // Get the rendered label for the button.

        label.style.transition = "none"; // Remove the transition from the label so this is instant
        label.style.fontWeight = "900"; // Change the font to the biggest font weight so the width is the biggest it can be.
        button.style.minWidth = `${button.offsetWidth}px`; // Set the min width to the biggest font width
        button.style.maxWidth = `${button.offsetWidth}px`; // Set the max width to the biggest font width
        label.style.fontWeight = "700"; // Change the font weight back to normal
        label.style.transition = "0.25s all ease-in-out"; // Re add the transition so when it moves next it will be animated to give a smooth look.

        let frame = document.createElement("iframe"); // Create a page.
        frame.src = window.location.origin + "/" + pageName + "/frames/" + label.innerText.split(" ")[0].toLowerCase().trim() + ".html"; // Set the page to the correct page as rendered in the button title.
        frame.classList.add('page', label.innerText.split(" ")[0].toLowerCase().trim()); // Add the correct class' for styling

        document.body.appendChild(frame); // Append the frame to the body.

        selector.style.transition = "none"; // Remove the transition for the selector so you cannot see the selector move.
        frame.style.transition = "none"; // Remove the transition for the selector so you cannot see the selector move.

        // If the button is selected.
        if (label.classList.contains('selected')) {
            moveSelector(button); // Move the selector to this button

            let name = label.innerText.split(" ")[0].toLowerCase().trim(); // Save the name of the page
            document.querySelector(`.${name}`).style.transition = "none"; // Remove the transition for the selector so you cannot see the selector move.
            document.querySelector(`.${name}`).style.left = "0%"; // Move the page to the center
        }

        selector.style.transition = "all 0.25s ease-in-out"; // Re add the transition so when it moves next it will be animated to give a smooth look.

        let front = []; // A list of pages in front of the currently selected one.
        let behind = []; // A list of pages behind the currently selected one.
        let found = false; // If the page that is selected is found so it can determine if it needs to be put in front or behind list.

        // Loop through all the pages in the 'pages' array.
        pages.forEach(page => {
            if (page.toLowerCase().trim() == frame.classList[1]) found = true; // If the page is the same as the current page then found is true.

            // Both the if and else if check for if the page is not the same as the current page.
            if (!found && page.toLowerCase().trim() !== frame.classList[1].split(" ")[0].toLowerCase().trim())
                front.push(page); // Add the pages to the 'front' array while found is false.
            else if (page.toLowerCase().trim() !== frame.classList[1].split(" ")[0].toLowerCase().trim())
                behind.push(page); // Add the pages to the 'behind' array while found it true.
        });

        // Loop through all the pages in the document.
        document.querySelectorAll('.page').forEach(page => {
            front.forEach(element => { // Loop through the 'front' array
                if (page.classList[1] == element.split(' ')[0].toLowerCase().trim()) {
                    document.querySelector(`.${element.split(' ')[0].toLowerCase().trim()}`).setAttribute('data-left', '-100%'); // Set the 'data-left' to -100% so its to the left
                }
            });

            behind.forEach(element => { // Loop through the 'behind' array
                if (page.classList[1] == element.split(' ')[0].toLowerCase().trim()) {
                    document.querySelector(`.${element.split(' ')[0].toLowerCase().trim()}`).setAttribute('data-left', '100%'); // Set the 'data-left' to 100% so its to the right
                }
            });
        });

        // When the button is clicked
        button.onclick = () => {
            if (label.classList.contains('selected')) return; // If the button is already selected don't detect any click events.

            nav.querySelectorAll('button').forEach(button => {
                button.querySelector('li').classList.remove("selected"); // Loop through all buttons and remove the selected to prevent multiple selected.
            });

            label.classList.add("selected"); // Add the selected class to the button that was just clicked.

            let name = label.innerText.split(" ")[0].toLowerCase().trim(); // Get the correct name for the sub page
        
            // Loop through all the sub-page elements
            document.querySelectorAll('.page').forEach(page => {
                page.style.transition = "0.25s all ease-in-out"; // Set a transition so it moves smoothly
                
                if (page.classList[1].split(" ")[0].toLowerCase().trim() !== name) {
                    page.style.left = page.getAttribute('data-left'); // Set the left to its data-left so it goes in the right direction.
                }
            });

            document.querySelector(`.${name}`).style.left = "0%"; // Move it to the center so its visible.

            moveSelector(button); // Move the selector to the correct button.
        }
    });
}

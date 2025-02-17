let buttons = document.querySelectorAll("button[data-page]"); // The navbar buttons.
let selector = document.querySelector('.selector'); // The selection box around the buttons.

// The array of pages, write the names of the rendered title in order.
let pages = [
    "Home",
    "Projects",
    "Contact Me",
    // "Example",
];

// Just a function to move the selector to the element that is passed, only the buttons are normally passed for the selector to show that its selected.
function moveSelector(element) {
    selector.style.width = `${element.offsetWidth}px`;
    selector.style.height = `${element.offsetHeight}px`;
    selector.style.left = `${element.offsetLeft}px`;
    selector.style.top = `${element.offsetTop}px`;
}

window.onload = () => {
    let nav = document.querySelector('iframe'); // Gets the nav bar on the main window.
    
    // Makes sure the document contains a nav bar so it understands that this document is a page document.
    if (nav) {
        let front = []; // This is the array that holds the pages that are in-front of the currently selected page.
        let back = []; // This is the array that holds the pages that are behind the currently selected page.
        let target = false; // This is if the currently selected page was found || Used for determining if we switch to back array.
        
        // Looping through each element in our pages array, (this is not any actual elements just a bunch of strings).
        pages.forEach(page => {
            if (page.split(" ")[0].toLowerCase() == nav.ariaSelected.split(" ")[0].toLowerCase()) target = true; // If the current index is the same as the current page then target is found.

            if (!target && page.split(" ")[0].toLowerCase() !== nav.ariaSelected.split(" ")[0].toLowerCase()) { // If target has not been found add the pages to the "front" array.
                front.push(page);
            } else if (page.split(" ")[0].toLowerCase() !== nav.ariaSelected.split(" ")[0].toLowerCase()) { // If the target was found add the pages to the "back" array.
                back.push(page);
            }

            let name = page.split(" ")[0].toLowerCase(); // Just store the page name split and all lowercase in a var to make it easier to define.

            if (front.includes(page)) { // If the page is in the "front" array then move it to the left.
                let page = createPage(name);

                document.body.appendChild(page);
                page.style.left = "-100%";
                page.setAttribute('data-left', page.style.left);
            } else if (back.includes(page)) { // If the page is in the "back" array then move it to the right.
                let page = createPage(name);

                document.body.appendChild(page);
                page.style.left = "100%";
                page.setAttribute('data-left', page.style.left);
            } else { // If the page is not in either array then move it to the center.
                let page = createPage(name);

                document.body.appendChild(page);
                page.style.left = "0%";
                page.setAttribute('data-left', page.style.left);
            }
        });
    }
}

// Creates a new iframe in the document, used for rendering the pages from each item.
function createPage(name) {
    let container = document.createElement("iframe");
    container.src = window.location.origin + `/${name}/${name}.html`;
    container.classList.add('page', name);
    
    return container;
}

// Loop through all the nav buttons
buttons.forEach(button => {
    let nav = parent.document.querySelector('iframe'); // This is the iframe that is in the current page's index.html, also the html file is the nav.html
    let label = button.querySelector('li'); // This is the label for the nav item

    label.style.transition = "none"; // Remove the transition from the label so this is instant
    label.style.fontWeight = "900"; // Change the font to the biggest font weight so the width is the biggest it can be.
    button.style.minWidth = `${button.offsetWidth}px`; // Set the min width to the biggest font width
    button.style.maxWidth = `${button.offsetWidth}px`; // Set the max width to the biggest font width
    button.style.minHeight = `${button.offsetHeight}px`; // Set the min height to the biggest font height
    button.style.maxHeight = `${button.offsetHeight}px`; // Set the max height to the biggest font height
    label.style.fontWeight = "700"; // Change the font weight back to normal
    label.style.transition = "0.25s all ease-in-out"; // Re add the transition so when it moves next it will be animated to give a smooth look.

    if (label.innerText == nav.ariaSelected) { // This is for when the navbar and the buttons load, it will set the selector to select the button with the text that is in the "ariaSelected" in the index.html for that page.
        label.classList.add('selected'); // Add the selected class to the button that is the default selected one.

        selector.style.transition = "none"; // Remove the transition for the selector so you cannot see the selector move.
        moveSelector(button); // Actually move the selector to the button that is the selected one by default.
        selector.style.transition = "all 0.25s ease-in-out"; // Re add the transition so when it moves next it will be animated to give a smooth look.
    }

    button.onclick = () => {
        // This is the name of the currently selected page || This is all lower case and you need to split the original name when using "ariaSelected".
        let name = button.getAttribute('data-page').replaceAll("/", "");

        if (label.classList.contains('selected')) return; // If the button is already selected don't detect any click events.

        buttons.forEach(button => {
            button.querySelector('li').classList.remove("selected"); // Delete the selected class from all buttons
        });

        label.classList.add("selected"); // Add the selected class to the button that was just clicked.

        parent.window.history.replaceState(100, name, button.getAttribute('data-page')); // This is important, it simulates changing the url when the user clicks a button.

        if (name == "") name = "home" // This is needed to make it so the code doesn't break because of the home button being "/" so it makes it empty, which it needs a value which is just the name of its directory "home".

        let currentPage; // Just gets the currently rendered page.

        // Loop through all the page elements
        parent.document.querySelectorAll('.page').forEach(pageElement => {
            // If the page is currently shown on the screen set our "currentPage" var to the page node.
            if (pageElement.style.left == "0%") {
                currentPage = pageElement;
            }

            // If the page isn't the page that is currently shown and the page button that was just clicked then do not give it an animation. Else give the page an animation.
            if ((pageElement.classList[1] !== name) && (pageElement.classList[1] !== nav.ariaSelected.split(" ")[0].toLowerCase().trim())) pageElement.style.transition = "none";
            else pageElement.style.transition = "0.5s all";
        });

        let [ front, back ] = changePages(nav); // This just organizes the arrays for "front" and "back".

        // Loop through the "front" array
        front.forEach(ele => {
            if (ele.split(" ")[0].toLowerCase().trim() == name) {
                currentPage.style.left = "100%"; // Move the current page to the right if the current button that was clicked was in the "front" array.
    
                // Change the selected element in the nav to allow the code to re-organize the "front" and "back" arrays.
                nav.ariaSelected = ele;

                // Reset the arrays, and target var.
                front = [];
                back = [];
                target = false;
            }
        });
    
        // Loop through the "back" array
        back.forEach(ele => {
            if (ele.split(" ")[0].toLowerCase().trim() == name) {
                currentPage.style.left = "-100%"; // Move the current page to the left if the current button that was clicked was in the "back" array.
    
                // Change the selected element in the nav to allow the code to re-organize the "front" and "back" arrays.
                nav.ariaSelected = ele;

                // Reset the arrays, and target var.
                front = [];
                back = [];
                target = false;
            }
        });

        [ front, back ] = changePages(nav); // This doesn't need to update the "front" and "back" variables but I am just for debugging reasons.

        parent.document.querySelector(`.${name}`).style.left = "0%"; // Moves the currently selected page to the front.

        moveSelector(button); // Moves the selector to the currently selected button.
    }
});

function changePages(nav) {
    let front = []; // This is the array that holds the pages that are in-front of the currently selected page.
    let back = []; // This is the array that holds the pages that are behind the currently selected page.
    let target = false; // This is if the currently selected page was found || Used for determining if we switch to back array.
        
    // Looping through each element in our pages array, (this is not any actual elements just a bunch of strings).
    pages.forEach(page => {
        if (page.split(" ")[0].toLowerCase() == nav.ariaSelected.split(" ")[0].toLowerCase()) target = true; // If the current index is the same as the current page then target is found.

        if (!target && page.split(" ")[0].toLowerCase() !== nav.ariaSelected.split(" ")[0].toLowerCase()) { // If target has not been found add the pages to the "front" array.
            front.push(page);
        } else if (page.split(" ")[0].toLowerCase() !== nav.ariaSelected.split(" ")[0].toLowerCase()) { // If the target was found add the pages to the "back" array.
            back.push(page);
        }

        if (front.includes(page)) { // If the page is in the "front" array then move it to the left.
            let pageElement = parent.document.querySelector(`.${page.split(" ")[0].toLowerCase()}`);

            pageElement.style.left = "-100%";
            pageElement.setAttribute('data-left', pageElement.style.left);
        } else if (back.includes(page)) { // If the page is in the "back" array then move it to the right.
            let pageElement = parent.document.querySelector(`.${page.split(" ")[0].toLowerCase()}`);

            pageElement.style.left = "100%";
            pageElement.setAttribute('data-left', pageElement.style.left);
        } else { // If the page is not in either array then move it to the center.
            let pageElement = parent.document.querySelector(`.${page.split(" ")[0].toLowerCase()}`);

            pageElement.style.left = "0%";
            pageElement.setAttribute('data-left', pageElement.style.left);
        }
    });

    return [ front, back ]; // Return the 2 "front" and "back" arrays.
}

// Twitter to "X" Easter Egg
window.onmessage = e => {
    if (e.data.type === "keydown" && e.data.key === "Shift") { // If the message is saying the shift key is held down
        document.querySelectorAll('.page').forEach(page => {
            if (page.getAttribute('data-left') == "0%") { // Get the currently shown page.
                page.contentWindow.postMessage({ type: "keydown", key: "Shift" }, "*"); // Send a message to the 'global.js' for that page.
            }
        });
    } else if (e.data.type === "keyup" && e.data.key === "Shift") { // If the message is saying the shift key is released
        document.querySelectorAll('.page').forEach(page => {
            if (page.getAttribute('data-left') == "0%") { // Get the currently shown page.
                page.contentWindow.postMessage({ type: "keyup", key: "Shift" }, "*"); // Send a message to the 'global.js' for that page.
            }
        });
    }
};

// Check if the document size is changed
window.onresize = () => {
    buttons.forEach(button => {
        let nav = parent.document.querySelector('iframe'); // This is the iframe that is in the current page's index.html, also the html file is the nav.html
        let label = button.querySelector('li'); // This is the label for the nav item
        
        label.style.transition = "none"; // Remove the transition from the label so this is instant
        button.style.minWidth = ''; // Set the min width to nothing to reset it.
        button.style.maxWidth = ''; // Set the min width to nothing to reset it.
        label.style.fontWeight = "900"; // Change the font to the biggest font weight so the width is the biggest it can be.
        button.style.minWidth = `${button.offsetWidth}px`; // Set the min width to the biggest font width
        button.style.maxWidth = `${button.offsetWidth}px`; // Set the max width to the biggest font width
        button.style.minHeight = ''; // Set the min height to nothing to reset it.
        button.style.maxHeight = ''; // Set the min height to nothing to reset it.
        button.style.minHeight = `${button.offsetHeight}px`; // Set the min height to the biggest font height
        button.style.maxHeight = `${button.offsetHeight}px`; // Set the max height to the biggest font height
        label.style.fontWeight = "700"; // Change the font weight back to normal
        label.style.transition = "0.25s all ease-in-out"; // Re add the transition so when it moves next it will be animated to give a smooth look.
    
        if (label.innerText == nav.ariaSelected) { // This is for when the navbar and the buttons load, it will set the selector to select the button with the text that is in the "ariaSelected" in the index.html for that page.
            label.classList.add('selected'); // Add the selected class to the button that is the default selected one.
    
            selector.style.transition = "none"; // Remove the transition for the selector so you cannot see the selector move.
            moveSelector(button); // Actually move the selector to the button that is the selected one by default.
            selector.style.transition = "all 0.25s ease-in-out"; // Re add the transition so when it moves next it will be animated to give a smooth look.
        }
    })
}

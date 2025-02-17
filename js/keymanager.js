// Detect when you hold down a key
window.onkeydown = e => {
    if (e.shiftKey) parent.window.postMessage({ type: "keydown", key: "Shift" }, "*") // If the shift key is held send a message to 'main.js'
};

// Detect when you release a key
window.onkeyup = e => {
    if (!e.shiftKey) parent.window.postMessage({ type: "keyup", key: "Shift" }, "*") // If the shift key is released send a message to 'main.js'
};

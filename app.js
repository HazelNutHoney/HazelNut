let element = null;
let draggable = true;

document.querySelector('input').addEventListener("change", () => {
    draggable = document.querySelector('input').checked;
    drag();
});

function drag() {
    if (draggable) {
        document.querySelectorAll('.drag').forEach(titlebar => {
            titlebar.style.height = "25px";
            titlebar.addEventListener('mousedown', () => {
                if (!titlebar.parentElement.parentElement.classList.contains('active')) {
                    document.querySelector('.active').classList.remove('active');
                    titlebar.parentElement.parentElement.classList.add('active');
                }

                document.onmouseup = () => {
                    element = null;
                    return;
                }

                document.onmousemove = (e) => {
                    titlebar.position
                    if (element != null) {
                        let x = e.movementX, y = e.movementY;

                        element.style.left = (element.offsetLeft + x) + 'px';
                        element.style.top = (element.offsetTop + y) + 'px';
                        
                        // if ((element.offsetLeft + x) > 0 && (element.offsetLeft + x) <= document.body.clientWidth - element.clientWidth) {
                        //     element.style.left = (element.offsetLeft + x) + 'px';
                        // }

                        // if ((element.offsetTop + y) > 0 && (element.offsetTop + y) <= document.body.clientHeight - element.clientHeight) {
                        //     element.style.top = (element.offsetTop + y) + 'px';
                        // }
                    }
                }    

                element = titlebar.parentElement.parentElement;
            });
        });
    } else {
        document.querySelectorAll('.drag').forEach(titlebar => {
            titlebar.style.height = "0";
        });
    }
}

document.querySelectorAll('.close').forEach(close => {
    close.addEventListener('click', () => {
        if (close.parentElement.parentElement.querySelector('.title').querySelector('p').innerText === 'About Meeee' || close.parentElement.parentElement.querySelector('.title').querySelector('p').innerText === 'Social Media')  {
            document.querySelector('.social').style.width = "0";
            document.querySelector('.about').style.width = "0";
            document.querySelector('.social').style.border = "none";
            document.querySelector('.about').style.border = "none";
        } else if (close.parentElement.parentElement.querySelector('.title').querySelector('p').innerText === 'Documentation') {
            document.querySelector('.docs').style.width = "0";
            document.querySelector('.docs').style.border = "none";
        } else if (close.parentElement.parentElement.querySelector('.title').querySelector('p').innerText === 'Downloads') {
            document.querySelector('.download').style.width = "0";
            document.querySelector('.download').style.border = "none";
        }
    });
});

document.querySelectorAll('.tabbar div').forEach(tab => {
    tab.addEventListener('click', () => {
        if (tab.innerHTML == "About Me" && document.querySelector('.social').style.width == "0px" && document.querySelector('.about').style.width == "0px") {
            document.querySelector('.social').style.width = getComputedStyle(document.documentElement).getPropertyValue('--window-width');
            document.querySelector('.about').style.width = getComputedStyle(document.documentElement).getPropertyValue('--about-width');
            document.querySelector('.social').style.border = "#f6b0ff 2px solid";
            document.querySelector('.about').style.border = "#f6b0ff 2px solid";
        } else if (tab.innerHTML == "Docs" && document.querySelector('.docs').style.width == "0px") {
            document.querySelector('.docs').style.width = getComputedStyle(document.documentElement).getPropertyValue('--window-width');
            document.querySelector('.docs').style.border = "#f6b0ff 2px solid";
        } else if (tab.innerHTML == "Downloads" && document.querySelector('.download').style.width == "0px") {
            document.querySelector('.download').style.width = getComputedStyle(document.documentElement).getPropertyValue('--download-width');
            document.querySelector('.download').style.border = "#f6b0ff 2px solid";
        }
    });
});

drag();

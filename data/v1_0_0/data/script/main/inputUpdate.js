"use strict";

const keyInputEvent = {
    mainP1: {
        up: false,
        right: false,
        down: false,
        left: false,
        botton: false,
    },
    mainP2: {
        up: false,
        right: false,
        down: false,
        left: false,
        botton: false,
    },
    menu: false
};

function turnInput(key, value) {
    switch (key) {
        case 'w':
            keyInputEvent.mainP1.up = value;
            break;
        case 'd':
            keyInputEvent.mainP1.right = value;
            break;
        case 's':
            keyInputEvent.mainP1.down = value;
            break;
        case 'a':
            keyInputEvent.mainP1.left = value;
            break;
        case 'r':
            keyInputEvent.mainP1.botton = value;
            break;
        case 'i':
            keyInputEvent.mainP2.up = value;
            break;
        case 'l':
            keyInputEvent.mainP2.right = value;
            break;
        case 'k':
            keyInputEvent.mainP2.down = value;
            break;
        case 'j':
            keyInputEvent.mainP2.left = value;
            break;
        case 'p':
            keyInputEvent.mainP2.botton = value;
            break;
        case ' ':
            keyInputEvent.menu = value;
            break;

        default:
            break;
    };
};

document.addEventListener('keydown', (event) => {
    turnInput(event.key, true);
})
document.addEventListener('keyup', (event) => {
    turnInput(event.key, false);
})

// 交給你喔

// document.addEventListener('mousemove', (e) => {
//     angle.yaw = e.clientX / window.innerWidth * 90;
//     angle.pitch = e.clientY / window.innerHeight * 90;
// })
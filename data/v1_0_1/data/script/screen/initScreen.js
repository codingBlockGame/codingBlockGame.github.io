"use strict";

const pageData = {
    'main': {
        'setting': {
            'right': 'language',
            'down': 'start'
        },
        'language': {
            'right': 'made',
            'left': 'setting',
            'down': 'start'
        },
        'made': {
            'left': 'language',
            'down': 'start'
        },

        'start': {
            'up': 'setting',
            'down': 'mode'
        },
        'mode': {
            'up': 'start',
            'down': 'reset'
        },
        'reset': {
            'up': 'mode'
        }
    },
    'setting': {
        'home': {
            'right': 'angle',
            'down': 'angle'
        },

        'angle': {
            'right': 'angle',
            'down': 'angle'
        },
    }
};
var cursor = 'start';
var initType = 'main';

function resetInitScreen() {
    const image = getImage('initBackground');
    const size = image.size;
    const unitWidth = canvas.width / size.width;
    const unitHeight = canvas.height / size.height;
    const deltaUnit = max(unitWidth, unitHeight);
    const drawWidth = size.width * deltaUnit;
    const drawHeight = size.height * deltaUnit;
    ctx.drawImage(image, (canvas.width - drawWidth) / 2, (canvas.height - drawHeight) / 2, drawWidth, drawHeight);
};

function drawInitScreen() {
    if (initType === 'main') {
        drawInitTitle(1 / 5);
        drawInitButtonY('startButton', 2 / 5);
        drawInitButtonY('modeButton', 3 / 5);
        drawInitButtonY('resetButton', 4 / 5);
        drawInitButtonX('settingButton', 13 / 16);
        drawInitButtonX('languageButton', 14 / 16);
        drawInitButtonX('informationButton', 15 / 16);
    } else if (/setting|mode|language|information/.test(initType)) {

    };
};

function finallyInitScreen() {

};

function drawInitTitle(y) {
    const titleName = 'BLOCKGAME';
    for (const text in titleName) {
        const id = `title${titleName[text]}`;
        const image = getImage(id);
        const size = image.size;
        const drawX = canvas.width / 2;
        const drawY = canvas.height * y;
        ctx.filter = `brightness(${1.1 + max(0, sin((gameTime - text * 0.2) * 100) * 0.2)})`;
        ctx.drawImage(
            image,
            drawX - (size.width / 2),
            drawY - (size.height / 2),
            (size.width),
            (size.height)
        );
    };
};

function drawInitButtonY(id, y) {
    const image = getImage(id);
    const size = image.size;
    const drawX = canvas.width / 2;
    const drawY = canvas.height * y;
    const type = id.replace('Button', '');
    var drawScale = 1;
    var isHover = false;
    if (type === cursor) {
        ctx.filter = `brightness(${1})`;
        drawScale = 1.1 + abs(sin(gameTime * 300)) * 0.1;
        isHover = true;
    } else {
        ctx.filter = `brightness(${0.8})`;
    };
    if (type === 'title') {
        ctx.filter = `brightness(${1})`;
    };
    ctx.drawImage(
        image,
        drawX - (size.width / 2 * drawScale),
        drawY - (size.height / 2 * drawScale),
        (size.width * drawScale),
        (size.height * drawScale)
    );
    if (isHover) {
        ctx.strokeStyle = "black";
        ctx.rect(
            drawX - (size.width / 2 * drawScale) + 5,
            drawY - (size.height / 2 * drawScale) + 5,
            (size.width * drawScale) - 10,
            (size.height * drawScale) - 10
        );
        ctx.lineWidth = 5;
        ctx.stroke();
    };
};

function drawInitButtonX(id, x) {
    const image = getImage(id);
    const size = image.size;
    const drawX = canvas.width * x;
    const drawY = canvas.height * 1 / 20;
    const type = id.replace('Button', '');
    var drawScale = 1;
    var isHover = false;
    if (type === cursor) {
        ctx.filter = `brightness(${1})`;
        drawScale = 1.1 + abs(sin(gameTime * 300)) * 0.1;
        isHover = true;
    } else {
        ctx.filter = `brightness(${0.8})`;
    };
    ctx.drawImage(
        image,
        drawX - (size.width / 2 * drawScale),
        drawY - (size.height / 2 * drawScale),
        (size.width * drawScale),
        (size.height * drawScale)
    );
    if (isHover) {
        ctx.strokeStyle = "black";
        ctx.rect(
            drawX - (size.width / 2 * drawScale) + 5,
            drawY - (size.height / 2 * drawScale) + 5,
            (size.width * drawScale) - 10,
            (size.height * drawScale) - 10
        );
        ctx.lineWidth = 3;
        ctx.stroke();
    };
};
"use strict";

const pageData = {
    'main': {
        'setting': {
            'right': 'language',
            'down': 'start'
        },
        'language': {
            'right': 'information',
            'left': 'setting',
            'down': 'start'
        },
        'information': {
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
    'mode': {
        'home': {
            'right': 'mode1P',
            'down': 'mode1P'
        },

        'mode1P': {
            'right': 'mode2P',
            'left': 'home',
            'up': 'home'
        },
        'mode2P': {
            'left': 'mode1P',
            'up': 'home'
        }
    },
    'reset': {
        'home': {
            'right': 'no',
            'down': 'no'
        },

        'no': {
            'right': 'yes',
            'left': 'home',
            'up': 'home'
        },
        'yes': {
            'left': 'no',
            'up': 'home'
        }
    },
    'isReseted': {},
    'setting': {
        'home': {
            'right': 'angle1',
        }
    }
};
var cursor = 'start';
var initType = 'main';

var menuFunction = {
    main: {
        start: function() { initGame(playerMode, nowLevel); },
        mode: function() {
            initType = 'mode';
            cursor = 'mode1P';
        },
        reset: function() {
            initType = 'reset';
            cursor = 'no';
        },
        setting: function() {
            initType = 'setting';
            cursor = 'angle1';
        },
        language: function() {
            // initType = 'language';
            cursor = 'home';
            // cursor = '中文(繁體)';
        },
        information: function() {
            initType = 'information';
            cursor = 'home';
        }
    },
    mode: {
        home: function() {
            initType = 'main';
            cursor = 'start';
        },
        mode1P: function() {
            playerMode = 1;
            nowLevel = 0;
        },
        mode2P: function() {
            playerMode = 2;
            nowLevel = 0;
        }
    },
    reset: {
        home: function() {
            initType = 'main';
            cursor = 'start';
        },
        no: function() {
            initType = 'main';
            cursor = 'start';
        },
        yes: function() {
            playerMode = 1;
            nowLevel = 0;
            initType = 'isReseted';
            cursor = 'ok';
        }
    },
    isReseted: {
        ok: function() {
            initType = 'main';
            cursor = 'start';
        }
    },
    setting: {
        home: function() {
            initType = 'main';
            cursor = 'start';
        },
        angle1: function() {
            _settingUpdate_('angle', 1);
        },
        angle2: function() {
            _settingUpdate_('angle', 2);
        },
        angle3: function() {
            _settingUpdate_('angle', 3);
        }
    },
    language: {
        home: function() {
            initType = 'main';
            cursor = 'start';
        }
    },
    information: {
        home: function() {
            initType = 'main';
            cursor = 'start';
        }
    }
};

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
        drawTitle();
        drawButton('startButton', 1 / 2, 2 / 5);
        drawButton('modeButton', 1 / 2, 3 / 5);
        drawButton('resetButton', 1 / 2, 4 / 5);
        drawButton('settingButton', 13 / 16, 1 / 16);
        drawButton('languageButton', 14 / 16, 1 / 16);
        drawButton('informationButton', 15 / 16, 1 / 16);
    } else if (/mode|reset|setting|language|information/.test(initType)) {
        drawButton('home', 1 / 16, 1 / 16);
    };
    if (initType === 'mode') {
        drawButton('mode1P', 5 / 16, 1 / 2);
        drawButton('mode2P', 11 / 16, 1 / 2);
    };
    if (initType === 'reset') {
        drawFilter('#f003');
        let randomX = (Math.random() - 0.5) * 0.01;
        let randomY = (Math.random() - 0.5) * 0.01;
        drawText('Are you sure?', 8 / 16 + randomX, 2 / 5 + randomY, '#000', true);
        drawText('Are you sure?', 8 / 16 + randomX, 2 / 5 + randomY, '#f00', false);
        drawButton('noButton', 5 / 16, 2 / 3);
        drawButton('yesButton', 11 / 16, 2 / 3);
    };
    if (initType === 'isReseted') {
        drawText('is reseted!', 8 / 16, 2 / 5, '#000', true);
        drawText('is reseted!', 8 / 16, 2 / 5, '#0af', false);
        drawButton('okButton', 8 / 16, 2 / 3);
    };
};

function finallyInitScreen() {
    if (inTurn) {
        turnY += getImage('turnHide').size.height / 8;
        if (turnType === 'dh' && turnY > canvas.height + (getImage('turnHide').size.height)) {
            turnCell();
            if (pageType === 'init') turnY = -(getImage('turnHide').size.height);
            if (pageType === 'game') turnY = -(getImage('turnHide').size.height) / resolution;
            turnType = 'ds';
        };
        if (turnType === 'ds' && turnY > canvas.height + (getImage('turnHide').size.height)) {
            inTurn = false;
        };
        let image;
        if (turnType === 'dh') image = getImage('turnHide');
        if (turnType === 'ds') image = getImage('turnShow');
        for (let x = 0; x < canvas.width + image.size.width; x += image.size.width) {
            ctx.drawImage(image, x, turnY, image.size.width, image.size.height);
        };
        ctx.beginPath();
        ctx.fillStyle = '#000';
        if (turnType === 'dh') ctx.rect(0, 0, canvas.width, turnY);
        if (turnType === 'ds') ctx.rect(0, turnY + image.size.height, canvas.width, canvas.height);
        ctx.fill();
        ctx.closePath();
    };
};

function drawTitle() {
    const id = 'title';
    const image = getImage(id);
    const size = image.size;
    const drawX = canvas.width / 2;
    const drawY = canvas.height / 5;
    ctx.filter = `brightness(1.1)`;
    ctx.drawImage(
        image,
        drawX - (size.width / 2),
        drawY - (size.height / 2),
        (size.width),
        (size.height)
    );
};

function drawButton(id, x, y) {
    const image = getImage(id);
    const size = image.size;
    const drawX = canvas.width * x;
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
    ctx.drawImage(
        image,
        drawX - (size.width / 2 * drawScale),
        drawY - (size.height / 2 * drawScale),
        (size.width * drawScale),
        (size.height * drawScale)
    );
    if (isHover) {
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.rect(
            drawX - (size.width / 2 * drawScale) + 5,
            drawY - (size.height / 2 * drawScale) + 5,
            (size.width * drawScale) - 10,
            (size.height * drawScale) - 10
        );
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();
    };
};

function drawText(text, x, y, color, move) {
    ctx.filter = `brightness(${1})`;
    const size = { width: fontSize * text.length, height: fontSize };
    const drawX = canvas.width * x + move * fontSize / 8;
    const drawY = canvas.height * y + move * fontSize / 8;
    ctx.font = `${fontSize}px "Press Start 2P"`;
    ctx.fillStyle = color;
    ctx.fillText(
        text,
        drawX - (size.width / 2),
        drawY - (size.height / 2)
    );
};

function drawFilter(color) {
    ctx.beginPath();
    ctx.filter = `brightness(${1})`;
    ctx.fillStyle = color;
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.closePath();
};

function _settingUpdate_(type, value) {
    if (type === 'bright') bright = { x: value, y: 1, z: (1 + value) / 2 };
    if (type === 'resolution') {};
    if (type === 'angle') {
        let angleDictionary = {
            1: { yaw: 60, pitch: 30 },
            2: { yaw: 45, pitch: 30 },
            3: { yaw: 45, pitch: 35.26438968275465431535 },
        };
        angle = angleDictionary[value];
    };
};

function turn(cell) {
    if (!inTurn) {
        turnY = -(getImage('turnHide').size.height);
        inTurn = true;
        turnType = 'dh';
        turnCell = cell;
    };
};
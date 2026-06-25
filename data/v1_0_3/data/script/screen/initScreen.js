"use strict";

const pageData = {
    'main': {
        'setting': {
            'right': 'language',
            'down': 'start',
            'left': 'start'
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
            'down': 'mode',
            'right': 'setting'
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
    'setting': {
        'home': {
            'right': 'angle1',
            'down': 'angle1'
        },

        'angle1': {
            'left': 'home',
            'up': 'home',
            'right': 'angle2',
            'down': 'resolution1'
        },
        'angle2': {
            'up': 'home',
            'left': 'angle1',
            'right': 'angle3',
            'down': 'resolution2'
        },
        'angle3': {
            'up': 'home',
            'left': 'angle2',
            'down': 'resolution3'
        },

        'resolution1': {
            'left': 'home',
            'up': 'angle1',
            'right': 'resolution2',
            'down': 'bright1'
        },
        'resolution2': {
            'up': 'angle2',
            'left': 'resolution1',
            'right': 'resolution3',
            'down': 'bright2'
        },
        'resolution3': {
            'up': 'angle3',
            'left': 'resolution2',
            'down': 'bright3'
        },

        'bright1': {
            'left': 'home',
            'up': 'resolution1',
            'right': 'bright2',
            'down': 'size1'
        },
        'bright2': {
            'up': 'resolution2',
            'left': 'bright1',
            'right': 'bright3',
            'down': 'size2'
        },
        'bright3': {
            'up': 'resolution3',
            'left': 'bright2',
            'down': 'size3'
        },

        'size1': {
            'left': 'home',
            'up': 'bright1',
            'right': 'size2'
        },
        'size2': {
            'up': 'bright2',
            'left': 'size1',
            'right': 'size3'
        },
        'size3': {
            'up': 'bright3',
            'left': 'size2'
        }
    },
    'gameSetting': {
        'home': {
            'right': 'angle1',
            'down': 'angle1'
        },

        'angle1': {
            'left': 'home',
            'up': 'home',
            'right': 'angle2',
            'down': 'resolution1'
        },
        'angle2': {
            'up': 'home',
            'left': 'angle1',
            'right': 'angle3',
            'down': 'resolution2'
        },
        'angle3': {
            'up': 'home',
            'left': 'angle2',
            'down': 'resolution3'
        },

        'resolution1': {
            'left': 'home',
            'up': 'angle1',
            'right': 'resolution2',
            'down': 'bright1'
        },
        'resolution2': {
            'up': 'angle2',
            'left': 'resolution1',
            'right': 'resolution3',
            'down': 'bright2'
        },
        'resolution3': {
            'up': 'angle3',
            'left': 'resolution2',
            'down': 'bright3'
        },

        'bright1': {
            'left': 'home',
            'up': 'resolution1',
            'right': 'bright2',
            'down': 'size1'
        },
        'bright2': {
            'up': 'resolution2',
            'left': 'bright1',
            'right': 'bright3',
            'down': 'size2'
        },
        'bright3': {
            'up': 'resolution3',
            'left': 'bright2',
            'down': 'size3'
        },

        'size1': {
            'left': 'home',
            'up': 'bright1',
            'right': 'size2'
        },
        'size2': {
            'up': 'bright2',
            'left': 'size1',
            'right': 'size3'
        },
        'size3': {
            'up': 'bright3',
            'left': 'size2'
        }
    },
    'language': {},
    'information': {},
    'isReseted': {},
    'comingSoon': {},
    'menu': {
        'back': { 'right': 'home' },
        'home': { 'right': 'setting', 'left': 'back' },
        'setting': { 'left': 'home' },
    }
};
var cursor = 'start';
var initType = 'main';

var menuFunction = {
    main: {
        start: function() {
            _settingUpdate_();
            initGame(playerMode, nowLevel);
        },
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
            // cursor = 'home';
            initType = 'comingSoon';
            cursor = 'ok';
        },
        information: function() {
            // initType = 'information';
            // cursor = 'home';
            initType = 'comingSoon';
            cursor = 'ok';
        }
    },
    mode: {
        home: function() {
            initType = 'main';
            cursor = 'mode';
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
            cursor = 'reset';
        },
        no: function() {
            initType = 'main';
            cursor = 'reset';
        },
        yes: function() {
            playerMode = 1;
            nowLevel = 0;
            angleType = 1;
            resolutionType = 2;
            brightType = 3;
            sizeType = 2;
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
            cursor = 'setting';
        },
        angle1: function() { _settingTo_('angle', 1); },
        angle2: function() { _settingTo_('angle', 2); },
        angle3: function() { _settingTo_('angle', 3); },
        resolution1: function() { _settingTo_('resolution', 1); },
        resolution2: function() { _settingTo_('resolution', 2); },
        resolution3: function() { _settingTo_('resolution', 3); },
        bright1: function() { _settingTo_('bright', 1); },
        bright2: function() { _settingTo_('bright', 2); },
        bright3: function() { _settingTo_('bright', 3); },
        size1: function() { _settingTo_('size', 1); },
        size2: function() { _settingTo_('size', 2); },
        size3: function() { _settingTo_('size', 3); }
    },
    gameSetting: {
        home: function() {
            pageType = 'game';
            initType = 'menu';
            cursor = 'setting';
        },
        angle1: function() { _settingTo_('angle', 1); },
        angle2: function() { _settingTo_('angle', 2); },
        angle3: function() { _settingTo_('angle', 3); },
        resolution1: function() { _settingTo_('resolution', 1); },
        resolution2: function() { _settingTo_('resolution', 2); },
        resolution3: function() { _settingTo_('resolution', 3); },
        bright1: function() { _settingTo_('bright', 1); },
        bright2: function() { _settingTo_('bright', 2); },
        bright3: function() { _settingTo_('bright', 3); },
        size1: function() { _settingTo_('size', 1); },
        size2: function() { _settingTo_('size', 2); },
        size3: function() { _settingTo_('size', 3); }
    },
    language: {
        ok: function() {
            initType = 'main';
            cursor = 'language';
        }
    },
    information: {
        ok: function() {
            initType = 'main';
            cursor = 'information';
        }
    },
    comingSoon: {
        ok: function() {
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
    } else if (/mode|reset|setting|gameSetting/.test(initType)) {
        drawButton('home', 1 / 16, 1 / 16);
    };
    if (initType === 'mode') {
        drawButton('mode1P', 5 / 16, 1 / 2, (playerMode === 1));
        drawButton('mode2P', 11 / 16, 1 / 2, (playerMode === 2));
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
        drawText('is reseted!', 8 / 16, 2 / 5, '#0000', false, true);
        drawText('is reseted!', 8 / 16, 2 / 5, '#000', true);
        drawText('is reseted!', 8 / 16, 2 / 5, '#0af', false);
        drawButton('okButton', 8 / 16, 2 / 3);
    };
    if (initType === 'comingSoon') {
        drawText('Coming Soon!', 8 / 16, 2 / 5, '#0000', false, true);
        drawText('Coming Soon!', 8 / 16, 2 / 5, '#000', true);
        drawText('Coming Soon!', 8 / 16, 2 / 5, '#0af', false);
        drawButton('okButton', 8 / 16, 2 / 3);
    };
    if (initType === 'setting' || initType === 'gameSetting') {
        drawText('angle', 5 / 16, 1 / 8, '#0000', false, true);
        drawText('angle', 5 / 16, 1 / 8, '#000', true);
        drawText('angle', 5 / 16, 1 / 8, '#f00', false);
        drawButton('angle1', 8 / 16, 1 / 8, (angleType === 1));
        drawButton('angle2', 10 / 16, 1 / 8, (angleType === 2));
        drawButton('angle3', 12 / 16, 1 / 8, (angleType === 3));

        drawText('resolution', 3.5 / 16, 3 / 8, '#0000', false, true);
        drawText('resolution', 3.5 / 16, 3 / 8, '#000', true);
        drawText('resolution', 3.5 / 16, 3 / 8, '#f00', false);
        drawButton('resolution1', 8 / 16, 3 / 8, (resolutionType === 1));
        drawButton('resolution2', 10 / 16, 3 / 8, (resolutionType === 2));
        drawButton('resolution3', 12 / 16, 3 / 8, (resolutionType === 3));

        drawText('bright', 4.75 / 16, 5 / 8, '#0000', false, true);
        drawText('bright', 4.75 / 16, 5 / 8, '#000', true);
        drawText('bright', 4.75 / 16, 5 / 8, '#f00', false);
        drawButton('bright1', 8 / 16, 5 / 8, (brightType === 1));
        drawButton('bright2', 10 / 16, 5 / 8, (brightType === 2));
        drawButton('bright3', 12 / 16, 5 / 8, (brightType === 3));

        drawText('size', 5.25 / 16, 7 / 8, '#0000', false, true);
        drawText('size', 5.25 / 16, 7 / 8, '#000', true);
        drawText('size', 5.25 / 16, 7 / 8, '#f00', false);
        drawButton('size1', 8 / 16, 7 / 8, (sizeType === 1));
        drawButton('size2', 10 / 16, 7 / 8, (sizeType === 2));
        drawButton('size3', 12 / 16, 7 / 8, (sizeType === 3));
    };
};

function finallyInitScreen() {
    tipsDiv.className = 'hidden';
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

function drawButton(id, x, y, choose) {
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
    } else if (choose) {
        ctx.filter = `brightness(${0.9})`;
        drawScale = 1.1;
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
    if (choose) {
        ctx.strokeStyle = "#f00";
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
    if (isHover) {
        ctx.strokeStyle = "#00f";
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

function drawText(text, x, y, color, move, bg) {
    ctx.filter = `brightness(${1})`;
    const size = { width: fontSize * text.length, height: fontSize };
    const drawX = canvas.width * x + move * fontSize / 8;
    const drawY = canvas.height * y + move * fontSize / 8;

    if (bg) {
        ctx.fillStyle = '#ffffff7f';
        ctx.beginPath();
        ctx.rect(
            drawX - (size.width / 2) - fontSize / 8,
            drawY - (size.height / 2) - fontSize / 8,
            size.width + fontSize / 4,
            size.height + fontSize / 4
        )
        ctx.fill();
        ctx.closePath();
    };

    ctx.font = `${fontSize}px "Press Start 2P"`;
    ctx.fillStyle = color;
    ctx.fillText(
        text,
        drawX - (size.width / 2),
        drawY + (size.height / 2)
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

function _settingUpdate_() {
    let brightDictionary = {
        1: { x: 0.8, y: 1, z: 0.925 },
        2: { x: 0.7, y: 1, z: 0.85 },
        3: { x: 0.55, y: 1, z: 0.775 }
    };
    let resolutionDictionary = { 1: 1, 2: 2, 3: 4 };
    let sizeDictionary = { 1: 1.5, 2: 2, 3: 2.5 };
    let angleDictionary = {
        1: { yaw: 75, pitch: 30 },
        2: { yaw: 45, pitch: 30 },
        3: { yaw: 15, pitch: 30 }
    };
    bright = brightDictionary[brightType];
    resolution = resolutionDictionary[resolutionType];
    scaleSize = sizeDictionary[sizeType];
    angle = angleDictionary[angleType];

    smallNumber1 = 0.125 * resolution;
    smallNumber2 = 0.015625 * resolution;

    scale = scaleSize - 0;
    toScale = scaleSize - 0;
};

function _settingTo_(type, value) {
    if (type === 'angle') angleType = value;
    if (type === 'resolution') resolutionType = value;
    if (type === 'bright') brightType = value;
    if (type === 'size') sizeType = value;
    _settingUpdate_();
};

function turn(cell) {
    if (!inTurn) {
        turnY = -(getImage('turnHide').size.height);
        inTurn = true;
        turnType = 'dh';
        turnCell = cell;
    };
};
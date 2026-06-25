var keyPress = {
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

function keyDown(event) {
    for (let player in event) {
        if (player !== 'menu') {
            let playerTag = player.replace('mainP', '');
            for (let key in event[player]) {
                if (event[player][key] && !keyPress[player][key]) {
                    keyPress[player][key] = true;
                    keyDownEvent(`${key}-${playerTag}p`);
                };
            };
        } else {
            if (event.menu && !keyPress.menu) {
                keyPress.menu = true;
                keyDownEvent('menu');
            };
        };
    };
};

function keyDownEvent(key) {
    if (pageType === 'init') {
        if (/(up|right|down|left)-(1|2)p/.test(key)) {
            let keyTag = key.replace(/-(1|2)p/, '');
            if (pageData[initType] && pageData[initType][cursor] && pageData[initType][cursor][keyTag]) {
                cursor = pageData[initType][cursor][keyTag];
            };
        };
        if (/(menu)|(botton-(1|2)p)/.test(key)) {
            if (/home/.test(cursor) || !/gameSetting|setting|language|mode/.test(initType)) turn(menuFunction[initType][cursor]);
            else menuFunction[initType][cursor]();
        };
        return;
    } else if (inMenu) {
        if (/(up|right|down|left)-(1|2)p/.test(key)) {
            let keyTag = key.replace(/-(1|2)p/, '');
            if (pageData[initType] && pageData[initType][cursor] && pageData[initType][cursor][keyTag]) {
                cursor = pageData[initType][cursor][keyTag];
            };
        };
        if (/(menu)|(botton-(1|2)p)/.test(key)) {
            if (cursor === 'back') inMenu = !inMenu;
            if (cursor === 'home') turn(function() {
                inMenu = !inMenu;
                pageType = 'init';
                initType = 'main';
                cursor = 'start';
            });
            if (cursor === 'setting') turn(function() {
                pageType = 'init';
                initType = 'gameSetting';
                cursor = 'angle1';
            });
        };
    } else if (pageType === 'game') {
        if (/menu/.test(key)) {
            inMenu = !inMenu;
            initType = 'menu';
            cursor = 'back';
        };
        if (/botton-(1|2)p/.test(key)) {
            let playerTag = key.replace('botton-', '');
            runCommand([{ type: 'reset', data: { player: playerTag } }]);
        };
        if (Level === 0) {
            if (/(up|right|down|left)-(1|2)p/.test(key) && gameTime > 11) {
                if (!variable.isMove) {
                    variable.isMove = true;
                };
            };
        };
        return;
    };
};

function keyUpdate(event) {
    if (pageType === 'game') {
        if (player[0] !== null) {
            let vRL = (event.mainP1.right - event.mainP1.left);
            let vUD = (event.mainP1.up - event.mainP1.down);
            let moveKey = ['-', '-', angleType];
            if (vRL === 1) moveKey[0] = 'r';
            if (vRL === -1) moveKey[0] = 'l';
            if (vUD === 1) moveKey[1] = 'u';
            if (vUD === -1) moveKey[1] = 'd';
            switch (moveKey.join('')) {
                case 'r-1':
                case 'rd2':
                case '-d3':
                    player[0].setV(moveData.a, 0);
                    break;
                case 'rd1':
                case '-d2':
                case 'ld3':
                    player[0].setV(moveData.b, moveData.b);
                    break;
                case '-d1':
                case 'ld2':
                case 'l-3':
                    player[0].setV(0, moveData.a);
                    break;
                case 'ld1':
                case 'l-2':
                case 'lu3':
                    player[0].setV(-moveData.b, moveData.b);
                    break;
                case 'l-1':
                case 'lu2':
                case '-u3':
                    player[0].setV(-moveData.a, 0);
                    break;
                case 'lu1':
                case '-u2':
                case 'ru3':
                    player[0].setV(-moveData.b, -moveData.b);
                    break;
                case '-u1':
                case 'ru2':
                case 'r-3':
                    player[0].setV(0, -moveData.a);
                    break;
                case 'ru1':
                case 'r-2':
                case 'rd3':
                    player[0].setV(moveData.b, -moveData.b);
                    break;
                default:
                    player[0].setV(0, 0);
                    break;
            };
        };
        if (player[1] !== null) {
            let vRL = (event.mainP2.right - event.mainP2.left);
            let vUD = (event.mainP2.up - event.mainP2.down);
            let moveKey = ['-', '-', angleType];
            if (vRL === 1) moveKey[0] = 'r';
            if (vRL === -1) moveKey[0] = 'l';
            if (vUD === 1) moveKey[1] = 'u';
            if (vUD === -1) moveKey[1] = 'd';
            switch (moveKey.join('')) {
                case 'r-1':
                case 'rd2':
                case '-d3':
                    player[1].setV(moveData.a, 0);
                    break;
                case 'rd1':
                case '-d2':
                case 'ld3':
                    player[1].setV(moveData.b, moveData.b);
                    break;
                case '-d1':
                case 'ld2':
                case 'l-3':
                    player[1].setV(0, moveData.a);
                    break;
                case 'ld1':
                case 'l-2':
                case 'lu3':
                    player[1].setV(-moveData.b, moveData.b);
                    break;
                case 'l-1':
                case 'lu2':
                case '-u3':
                    player[1].setV(-moveData.a, 0);
                    break;
                case 'lu1':
                case '-u2':
                case 'ru3':
                    player[1].setV(-moveData.b, -moveData.b);
                    break;
                case '-u1':
                case 'ru2':
                case 'r-3':
                    player[1].setV(0, -moveData.a);
                    break;
                case 'ru1':
                case 'r-2':
                case 'rd3':
                    player[1].setV(moveData.b, -moveData.b);
                    break;
                default:
                    player[1].setV(0, 0);
                    break;
            };
        };
    };
};

function keyUp(event) {
    for (let player in event) {
        if (player !== 'menu') {
            let playerTag = player.replace('mainP', '');
            for (let key in event[player]) {
                if (!event[player][key] && keyPress[player][key]) {
                    keyPress[player][key] = false;
                    keyUpEvent(`${key}-${playerTag}p`);
                };
            };
        } else {
            if (!event.menu && keyPress.menu) {
                keyPress.menu = false;
                keyUpEvent('menu');
            };
        };
    };
};

function keyUpEvent(key) {};

function keyFunction(event = keyInputEvent) {
    keyDown(event);
    keyUpdate(event);
    keyUp(event);
};
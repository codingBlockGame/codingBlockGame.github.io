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
    // console.log(key, 'down');

    if (pageType === 'init') {
        if (/(up|right|down|left)-(1|2)p/.test(key)) {
            let keyTag = key.replace(/-(1|2)p/, '');
            if (pageData[initType] && pageData[initType][cursor] && pageData[initType][cursor][keyTag]) {
                cursor = pageData[initType][cursor][keyTag];
            };
        };
        if (/(menu)|(botton-(1|2)p)/.test(key)) {
            if (initType === 'main' && cursor === 'start') {
                console.log(1);

                initGame();
            };
        };
        return;
    };
    if (pageType === 'game') {
        if (/menu/.test(key)) {
            inMenu = !inMenu;
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
        if (player[0] !== null) player[0].setV(
            (event.mainP1.right - event.mainP1.left),
            (event.mainP1.down - event.mainP1.up)
        );
        if (player[1] !== null) player[1].setV(
            (event.mainP2.right - event.mainP2.left),
            (event.mainP2.down - event.mainP2.up)
        );
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

function keyUpEvent(key) {
    // console.log(key, 'up');

};

function keyFunction(event = keyInputEvent) {
    keyDown(event);
    keyUpdate(event);
    keyUp(event);
};
"use strict";

function resetGameScreen() {
    const image = getImage('gameBackground');
    const size = image.size;
    const unitWidth = (canvas.width / size.width);
    const unitHeight = (canvas.height / size.height);
    const deltaUnit = max(unitWidth, unitHeight);
    const drawWidth = size.width * deltaUnit;
    const drawHeight = size.height * deltaUnit;
    ctx.drawImage(image, (canvas.width - drawWidth) / 2, (canvas.height - drawHeight) / 2, drawWidth, drawHeight);

    blockPosId = {};
    drawData = [];
    for (const index in blocks) {
        let data = blocks[index];
        drawData.push(new Block(blocks[index].id, blocks[index].pos));
    };
    for (const element in portalData) {
        if (element !== null) {
            const key = element.split('|');
            const id = key[0];
            const pos = Array.from(key[1].split('-'), (v) => v - 0);
            drawData.push(new Block(id, pos));
        }
    };
};
// shadow
function pushEntity() {
    if (player[0] !== null) {
        drawData.push(player[0]);
    };
    if (player[1] !== null) {
        drawData.push(player[1]);
    };

    for (const index in entityData) {
        const data = entityData[index];
        if (data !== undefined) drawData.push(data);
    };
};

function drawGameScreen() {
    if (player[1] === null) {
        translate.x -= (translate.x + (player[0].oPoint[0])) / 3;
        translate.y -= (translate.y + (player[0].oPoint[1])) / 3;
        toScale = min(
            window.innerWidth / (2 * blockSize),
            window.innerHeight / (2 * blockSize)
        );
    } else {
        translate.x -= (translate.x + (player[0].oPoint[0] + player[1].oPoint[0]) / 2) / 3;
        translate.y -= (translate.y + (player[0].oPoint[1] + player[1].oPoint[1]) / 2) / 3;
        toScale = min(
            window.innerWidth / (2 * blockSize + abs(player[0].oPoint[0], player[1].oPoint[0])),
            window.innerHeight / (2 * blockSize + abs(player[0].oPoint[1], player[1].oPoint[1]))
        );
    };

    if (scale > scaleSize) scale = scaleSize;
    scale -= (scale - toScale * 0.8) / 10;

    screenOpos.x = canvas.width / 2 + translate.x;
    screenOpos.y = canvas.height / 2 - translate.y;

    drawBackGround(levelData.bg.x, 'x');
    drawBackGround(levelData.bg.z, 'z');
    drawBackGround(levelData.bg.y, 'y');

    const sortResult = drawSort();

    for (let item of sortResult) {
        drawData[item].draw(item);
    };

};

function finallyGameScreen() {
    tipsDiv.style.filter = `brightness(1)`;
    var tipsObject = tips[tipsCount];
    if (tipsObject) {
        if (tipsDiv.count !== tipsCount) {
            setTips(tipsObject);
        };
        if (tipsObject.start > gameTime) {
            tipsDiv.className = 'hidden';
            tipsDiv.style.opacity = 0;
        } else if (tipsObject.start + tipsObject.opacity > gameTime) {
            tipsDiv.className = '';
            tipsDiv.style.opacity = (gameTime - tipsObject.start) / tipsObject.opacity;
        } else if (tipsObject.end - tipsObject.opacity > gameTime) {
            tipsDiv.style.opacity = 1;
        } else if (tipsObject.end > gameTime) {
            tipsDiv.style.opacity = (tipsObject.end - gameTime) / tipsObject.opacity;
        } else {
            tipsDiv.className = 'hidden';
            tipsDiv.style.opacity = 0;
            tipsCount++;
        };
    };

    if (inMenu) {
        drawMenu();
    };

    if (inTurn) {
        turnY += getImage('turnHide').size.height / 8 / resolution;
        if (turnType === 'dh' && turnY > canvas.height + (getImage('turnHide').size.height) / resolution) {
            turnCell();
            if (pageType === 'init') turnY = -(getImage('turnHide').size.height);
            if (pageType === 'game') turnY = -(getImage('turnHide').size.height) / resolution;

            turnType = 'ds';
        };
        if (turnType === 'ds' && turnY > canvas.height + (getImage('turnHide').size.height) / resolution) {
            inTurn = false;
        };
        let image;
        if (turnType === 'dh') image = getImage('turnHide');
        if (turnType === 'ds') image = getImage('turnShow');
        for (let x = 0; x < canvas.width + image.size.width / resolution; x += image.size.width / resolution) {
            ctx.drawImage(image, x, turnY, image.size.width / resolution, image.size.height / resolution);
        };
        ctx.beginPath();
        ctx.fillStyle = '#000';
        if (turnType === 'dh') ctx.rect(0, 0, canvas.width, turnY);
        if (turnType === 'ds') ctx.rect(0, turnY + image.size.height / resolution, canvas.width, canvas.height);
        ctx.fill();
        ctx.closePath();
    };
};

function nextLevel(id) {
    if (/player(1|2)/.test(id)) {
        isPass[id.replace('player', '') - 1] = true;
        player[id.replace('player', '') - 1].toHide = true;
        player[id.replace('player', '') - 1].freezeTime = 9999999999;
        testPass();
    } else {
        entityData[id].toHide = true;
        entityData[id].freezeTime = 9999999999;
    };
};

function setTips(tipsText) {
    tipsDiv.count = tipsCount;
    tipsDiv.innerHTML = '';
    for (const item of tipsText.text) {
        if (typeof item === 'string') {
            const itemSpan = document.createElement('span');
            if (item[0] === '/') {
                itemSpan.className = 'italic';
            }
            itemSpan.innerHTML = item.replaceAll('/', '');
            tipsDiv.appendChild(itemSpan);
        } else if (item.type === 'image') {
            const itemImage = getImage(item.id);
            tipsDiv.appendChild(itemImage);
        };
    };
};

function drawMenu() {
    ctx.fillStyle = `rgba(0, 0, 0, ${menuOpenness})`;
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    tipsDiv.style.filter = `brightness(${menuOpenness / 2})`;
    drawMenuButton('back', 4 / 10, 1 / 2);
    drawMenuButton('home', 5 / 10, 1 / 2);
    drawMenuButton('settingButton', 6 / 10, 1 / 2);
};

function drawMenuButton(id, x, y) {
    const image = getImage(id);
    const size = image.size;
    const drawX = canvas.width * x;
    const drawY = canvas.height * y;
    const type = id.replace('Button', '');
    var drawScale = 1;
    var isHover = false;
    if (type === cursor) {
        ctx.filter = `brightness(${1})`;
        drawScale = 1.1;
        isHover = true;
    } else {
        ctx.filter = `brightness(${0.8})`;
    };
    ctx.drawImage(
        image,
        drawX - (size.width / 2 * drawScale / resolution * 2),
        drawY - (size.height / 2 * drawScale / resolution * 2),
        (size.width * drawScale / resolution * 2),
        (size.height * drawScale / resolution * 2)
    );
    if (isHover) {
        ctx.strokeStyle = "#00f";
        ctx.beginPath();
        ctx.rect(
            drawX - ((size.width / 2 * drawScale) - 5) / resolution * 2,
            drawY - ((size.height / 2 * drawScale) - 5) / resolution * 2,
            ((size.width * drawScale) - 10) / resolution * 2,
            ((size.height * drawScale) - 10) / resolution * 2
        );
        ctx.lineWidth = 5 / resolution;
        ctx.stroke();
        ctx.closePath();
    };
};

function testPass() {
    if (testAll(isPass, true)) {
        if (nowLevel < maxLevel) turn(function() {
            nowLevel++;
            initGame(playerMode, nowLevel);
        });
        else turn(function() {
            pageType = 'init';
            initType = 'comingSoon';
            cursor = 'ok';
        });
    };
};
"use strict";

// screenData
const blockSize = 64;
const playerSize = 40;
const screenOpos = { x: 0, y: 0 };
var translate = { x: 0, y: 0 };
var tipsDiv = document.getElementById('tips');

// setting
var nowLevel = 0;
var playerMode = 1;

var angleType = 1;
var resolutionType = 2;
var brightType = 3;
var sizeType = 2;


var menuOpenness = 0.7;
var moveDefinition = 16;

// timeData
var startTime = Date.now();
var time = Date.now();
var gameTime;
var deltaTime;
var FPS = 60;
var FPSlist = [];
const speed = 1;
const intervalList = [];

// pageType
var pageType = 'init';
var turnType;
var turnY;
var turnCell;
var inMenu = false;
var inTurn = false;
var Level;
var fontSize = 48;

// gameData
var imageData = {};
var portalData = {};
var resourceData;
var levelData;
var drawData;
var entityData;
var gameRunner;
var blockPosId = [];
const moveData = { a: 2.8284, b: 2, g: 0.5 };

const maxLevel = 1;

var angle;
var resolution;
var bright;
var scaleSize;

var smallNumber1;
var smallNumber2;
var scale;
var toScale;

// gameInfo
var player = [null, null];
var isPass = [true, true];
var entity;
var blocks;
var portal;
var functions;
var tips;
var tipsCount;

function initGame(players = 1, level = 0) {
    const id = `lv${level}-${players}P`;
    Level = level;
    tipsCount = 0;
    levelData = JSON.parse(document.getElementById(id).innerText);
    resourceData = JSON.parse(document.getElementById('resource').innerText);
    blocks = levelData.blocks;
    portal = levelData.portal;
    entity = levelData.entity;
    functions = levelData.functions;
    tips = levelData.tips;
    moveData[1] = 0;
    moveData[-1] = (levelData.size - 1) * blockSize;
    player[0] = new Entity('player1', levelData.player['1'].pos);
    isPass[0] = false;
    if (players === 2) {
        player[1] = new Entity('player2', levelData.player['2'].pos);
        isPass[1] = false;
    } else {
        player[1] = null;
        isPass[1] = true;
    };
    entityData = [];
    for (const index in entity) {
        const data = entity[index];
        summon(data);
    };
    for (const index in portal) {
        for (const portalObject of portal[index]) {
            const pos = portalObject.pos;
            const side = portalObject.side;
            const to = portalObject.to;
            portalData[`portal${index}-${side}|${pos.join('-')}`] = to;
        };
    };
    console.log('load file:', count);
    pageType = 'game';
    timeReset();
};

function updateValue() {
    //get FPS
    deltaTime = (Date.now() - time) * speed;
    if (inMenu || inTurn) {
        startTime += deltaTime;
    }
    gameTime = (Date.now() - startTime) / 1000 * speed + 11000;
    FPSlist.unshift(1000 / deltaTime * speed);
    FPSlist = FPSlist.slice(0, 1);
    FPS = floor(sum(FPSlist) / FPSlist.length);
    time = Date.now();

    if (pageType === 'game') {
        if (!inMenu && !inTurn) {
            // player move
            if (player[0] !== null) player[0].moveUpdate();
            if (player[1] !== null) player[1].moveUpdate();

            runFunction();

            // entity move
            for (const index in entityData) {
                const data = entityData[index];
                if (data !== undefined) data.moveUpdate();
            };
        }
        tipsDiv.style.top = `${window.innerHeight - 80}px`;
    };
};

function timeReset() { startTime = Date.now(); };
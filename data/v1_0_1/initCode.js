"use strict";

var count = 0;

const gameData = {
    imageData: document.getElementById('imageData'),
    levelData: document.getElementById('levelData'),
    speedDiv: document.getElementById('plannedSpeedBlock'),
    speedBlock: document.getElementById('plannedSpeed'),
    speedText: document.getElementById('speed'),
    count: 73,
    speed: 0,
    start: false
};

function initData() {
    fetch('./data/type.json').then(response => response.json()).then((typeData) => {
        for (const key in typeData) {
            fetch(`./data/${typeData[key].name}/path.json`).then(response => response.json()).then((data) => {
                importFile(
                    typeData[key].type,
                    typeData[key].id,
                    data,
                    `./data/${typeData[key].name}`
                );
            });
        };
    });
};

function importFile(type, id, index, path) {
    if (index.info) {
        for (const key in index) {
            if (key !== "info") {
                importFile(
                    type,
                    id,
                    index[key],
                    `${path}/${key}`
                );
            };
        };
    } else if (index.name) {
        path = path.split('/');
        path.pop();
        path = path.join('/');
        let tag = (index.name.split('.').at(-1) === 'json') ? 'span' : 'img';
        let url = `${path}/${index.name}`;
        let element = document.createElement(tag);
        element.id = index.id;
        element.classList.add('hidden');
        element.load = setTimeout(function() {
            gameData.speed += 100 / gameData.count;
            gameData.speedBlock.style.width = `${2 * Math.floor(gameData.speed)}px`;
            gameData.speedText.innerText = Math.floor(gameData.speed);
            count++;
            if (gameData.speed >= 100) {
                if (!gameData.start) {
                    gameData.start = true;
                    gameData.speedDiv.className = 'hidden';
                    gameRunner = setInterval(update, 33);
                };
            };
        }, 100);
        if (index.name.split('.').at(-1) === 'json') {
            fetch(url).then(response => response.json()).then((data) => {
                element.innerText = JSON.stringify(data);
                gameData[id].appendChild(element);
            });
        } else {
            element.src = url;
            element.size = index.cutSize;
            element.width = index.size.width;
            element.height = index.size.height;
            if (index.cut) {
                element.cut = index.cut;
            };
            element.style.imageRendering = 'pixelated';
            gameData[id].appendChild(element);
        };
    };
};

initData();
"use strict";

const canvas = document.querySelector('#screen');

const ctx = canvas.getContext('2d');


function resizeScreen(r = 1) {
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    canvas.width = window.innerWidth / r;
    canvas.height = window.innerHeight / r;
};

function update() {

    keyFunction();

    if (pageType === 'init') resizeScreen();
    if (pageType === 'game') resizeScreen(resolution);

    // reset
    if (pageType === 'init') resetInitScreen();
    if (pageType === 'game') resetGameScreen();

    updateValue();

    // push entity
    if (pageType === 'game') pushEntity();

    // draw
    if (pageType === 'init') drawInitScreen();
    if (pageType === 'game') drawGameScreen();


    // finally
    if (pageType === 'init') finallyInitScreen();
    if (pageType === 'game') finallyGameScreen();

    // debugger;
    requestAnimationFrame(update);
};
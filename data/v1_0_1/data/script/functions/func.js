"use strict";

function sin(d, r = 1) { return (Math.sin(d / 180 * Math.PI) * r) };

function cos(d, r = 1) { return (Math.cos(d / 180 * Math.PI) * r) };

function abs(n, m = 0) { return Math.abs(n - m) };

function floor(n) { return Math.floor(n) };

function round(n) { return Math.round(n) };

function ceil(n) { return Math.ceil(n) };

function hypot(...n) {
    return Math.hypot(...n);
};

function min(m, n) { return Math.min(m, n); };

function max(m, n) { return Math.max(m, n); };

function sum(l) { return l.reduce((n1, n2) => n1 + n2, 0); };

function getImage(id) {
    if (imageData[id] === undefined)
        imageData[id] = document.getElementById(id) || document.getElementById('debug');
    return imageData[id];
}

function drawSort() {
    /**
     *  
     * @returns {'<'|'='|'>'} 
     */
    function getDeltaDeep(id1, id2) {

        const deltaSide = Array.from({ length: 3 }, (_v, k) => (drawData[id1].size[posTag[k]] + drawData[id2].size[posTag[k]]) / 2 - smallNumber2);
        const deltaPos = Array.from({ length: 3 }, (_v, k) => abs(drawData[id1].pos[posTag[k]], drawData[id2].pos[posTag[k]]));

        const testDeep = Array.from({ length: 3 }, (_v, k) => {
            if (deltaPos[k] < deltaSide[k]) return 0;
            return deltaPos[k] - deltaSide[k];
        });

        const getList = getMaxList(testDeep);
        if (getList.length === 1) {
            if (drawData[id1].pos[posTag[getList[0]]] >= drawData[id2].pos[posTag[getList[0]]]) return '>';
            return '<';
        };
        if (getList.length === 2) {
            const _Pos = Array.from({ length: 3 }, (_v, k) => drawData[id1].pos[posTag[k]] - drawData[id2].pos[posTag[k]]);
            if (_Pos[getList[0]] * _Pos[getList[1]] < 0) {
                if (
                    getList[0] > getList[1] && _Pos[getList[0]] > 0 ||
                    getList[0] < getList[1] && _Pos[getList[1]] > 0
                ) return '>';
                else return '<';
            } else {
                if (_Pos[getList[0]] > 0) return '>';
                else return '<';
            };
        };
    };

    // const rules = new Array(drawData.length).fill(0);
    const rules = Array.from(drawData, () => ([]));
    for (let i = 0; i < drawData.length; i++) {
        for (let j = i + 1; j < drawData.length; j++) {
            let testDeep = getDeltaDeep(i, j);
            if (testDeep === '=') continue;
            // if (testDeep === '>') rules[i]++;
            // if (testDeep === '<') rules[j]++;
            if (testDeep === '>') rules[i].push(j);
            if (testDeep === '<') rules[j].push(i);
        };
    };

    const result = Array.from(drawData, (_v, k) => [k, rules[k]]);
    // result.sort((a, b) => a[1] - b[1]);
    result.sort((a, b) => a[1].length - b[1].length);

    const returns = Array.from(result, (v) => v[0]);

    console.log(objectToString('2|0|0|2|y', rules));
    console.log(objectToString('2|0|0|2|[0]', result));
    console.log(objectToString('2|0|0|2|y', returns));
    return returns;
};

function testAll(l, v) {
    for (const g of l) {
        if (g !== v) { return false; };
    };
    return true;
};

function testOne(l, v) {
    for (const g of l) {
        if (g === v) { return true; };
    };
    return false;
};

function getMaxId(l) {
    return Array.from(l, (_v, k) => [k, l[k]]).sort((a, b) => b[1] - a[1]).at(0).at(0);
};

function getMinId(l) {
    return Array.from(l, (_v, k) => [k, l[k]]).sort((a, b) => a[1] - b[1]).at(0).at(0);
};

function getMaxList(l) {
    const g = Array.from(l, (_v, k) => [k, l[k]]).sort((a, b) => b[1] - a[1]);
    const max = g[0][1] - 0;
    const r = [];
    while (g[0] && (g[0][1] === max)) r.push(g.shift()[0]);
    return r;
};

function getMinList(l) {
    const g = Array.from(l, (_v, k) => [k, l[k]]).sort((a, b) => a[1] - b[1]);
    const min = g[0][1] - 0;
    const r = [];
    while (g[0] && (g[0][1] === min)) r.push(g.shift()[0]);
    return r;
};

function getMax(l) { return Math.max.apply(null, l); };

function getMin(l) { return Math.min.apply(null, l); };

function setblock(data) { blocks.push(data); };

function summon(data) { entityData[data.id] = new Entity(data.type, data.pos, data.tag); };

function addPortal(data) {
    const type = data.type;
    for (const portalObject of data.portal) {
        const pos = portalObject.pos;
        const side = portalObject.side;
        const to = portalObject.to;
        portalData[`portal${type}-${side}|${pos.join('-')}`] = to;
    };
};

function ctx_drawImage(image, ...input) {
    if (input.length === 2) {
        const [dx, dy] = input;
    };
    if (input.length === 4) {
        const [dx, dy, dw, dh] = input;
    };
    if (input.length === 8) {
        const [sx, sy, sw, sh, dx, dy, dw, dh] = input;
    };
    ctx.drawImage(image, ...input);
};

function listToString(input, t = 0, Lspace = 0, Nspace = 2, online = [true]) {
    online.push(true);
    let returnText;

    if (!online[0]) returnText = `${' '.repeat(t*Nspace)}`;

    returnText = '[';

    var lastIndex = '';
    for (const key in input) lastIndex = key;

    for (const index in input) {
        const element = input[index];

        if (!online[0]) returnText += `\n${' '.repeat((t+1)*Nspace)}`;
        else returnText += `${' '.repeat(Lspace)}`;

        if (typeof element === "object") {
            if (JSON.stringify(element).charAt(0) === '[') {
                returnText += listToString(element, t + !online[0], Lspace, Nspace, online.slice(1));
            };
            if (JSON.stringify(element).charAt(0) === '{') {
                returnText += dictionaryToString(element, t + !online[0], Lspace, Nspace, online.slice(1));
            };
        } else if (typeof element === "string") {
            returnText += `\'${element}\'`;
        } else if (typeof element === "boolean") {
            returnText += element ? 'true' : 'false';
        } else if (typeof element === "undefined") {
            returnText += 'undefined';
        } else if (typeof element === "number") {
            returnText += element;
        };

        if (index !== lastIndex) returnText += ',';
    };
    if (!online[0]) returnText += `\n${' '.repeat(t*Nspace)}`;
    else returnText += `${' '.repeat(Lspace)}`;

    returnText += ']';

    return returnText;
};

function dictionaryToString(input, t = 0, Lspace = 0, Nspace = 2, online = [true]) {
    online.push(true);
    let returnText;

    if (!online[0]) returnText = `${' '.repeat(t*Nspace)}`;

    returnText = '{';

    var lastIndex = '';
    for (const key in input) lastIndex = key;

    for (const index in input) {
        const element = input[index];

        if (!online[0]) returnText += `\n${' '.repeat((t+1)*Nspace)}`;
        else returnText += `${' '.repeat(Lspace)}`;

        returnText += `${index}:${' '.repeat(Lspace)}`

        if (typeof element === "object") {
            if (JSON.stringify(element).charAt(0) === '[') {
                returnText += listToString(element, t + !online[0], Lspace, Nspace, online.slice(1));
            };
            if (JSON.stringify(element).charAt(0) === '{') {
                returnText += dictionaryToString(element, t + !online[0], Lspace, Nspace, online.slice(1));
            };
        } else if (typeof element === "string") {
            returnText += `\'${element}\'`;
        } else if (typeof element === "boolean") {
            returnText += element ? 'true' : 'false';
        } else if (typeof element === "undefined") {
            returnText += 'undefined';
        } else if (typeof element === "number") {
            returnText += element;
        };

        if (index !== lastIndex) returnText += ',';
    };
    if (!online[0]) returnText += `\n${' '.repeat(t*Nspace)}`;
    else returnText += `${' '.repeat(Lspace)}`;

    returnText += '}';

    return returnText;
};

function objectToString(type, input) {
    // type: 'c|t|l|n|o[]'
    let getType = type.split('|');
    let fc;

    if (JSON.stringify(input).charAt(0) === '[') fc = listToString;
    if (JSON.stringify(input).charAt(0) === '{') fc = dictionaryToString;
    if (/^(y|n)$/.test(getType[4])) {
        return fc(input, getType[1] - 0, getType[2] - 0, getType[3] - 0, new Array(getType[0] - 0).fill(getType[4] === 'y' ? true : false));
    } else {
        return fc(input, getType[1] - 0, getType[2] - 0, getType[3] - 0, Array.from({ length: getType[0] - 0 }, (_v, k) => (JSON.parse(getType[4]).indexOf(k) !== -1 ? false : true)));
    };
};
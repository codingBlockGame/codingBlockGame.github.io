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
            if (deltaPos[k] <= deltaSide[k]) return 0;
            return deltaPos[k] - deltaSide[k];
        });

        const deltaOpointSide = [
            new Pos('3D', [deltaSide[0], -deltaSide[1], -deltaSide[2]]).get2DRlt().x,
            new Pos('3D', [-deltaSide[0], deltaSide[1], -deltaSide[2]]).get2DRlt().y
        ];

        const deltaOpointPos = new Pos('3D', Array.from({ length: 3 }, (_v, k) => drawData[id1].pos[posTag[k]] - drawData[id2].pos[posTag[k]])).get2DRlt().pos;

        const testOpointDeep = Array.from({ length: 2 }, (_v, k) => (abs(deltaOpointPos[k]) >= deltaOpointSide[k]));

        if (testOne(testOpointDeep, true)) {
            return '=';
        };


        const getList = getMaxList(testDeep);

        const _Pos = Array.from({ length: 3 }, (_v, k) => drawData[id1].pos[posTag[k]] - drawData[id2].pos[posTag[k]]);

        if (testDeep[0] > 0 && testDeep[1] > 0 && (_Pos[0] * _Pos[1] < 0)) return '=';
        if (testDeep[1] > 0 && testDeep[2] > 0 && (_Pos[1] * _Pos[2] < 0)) return '=';
        if (testDeep[2] > 0 && testDeep[0] > 0 && (_Pos[2] * _Pos[0] < 0)) return '=';

        if (getList.every((v) => (_Pos[getList[0]] * _Pos[v] > 0))) {
            if (_Pos[getList[0]] > 0) return '>';
            else return '<';
        } else {
            return '=';
        };
    };
    const graph = {};
    for (let i = 0; i < drawData.length; i++) {
        graph[i] = [];
    };
    for (let i = 0; i < drawData.length; i++) {
        for (let j = i + 1; j < drawData.length; j++) {
            let testDeep = getDeltaDeep(i, j);
            if (testDeep === '=') continue;
            if (testDeep === '<') graph[i].push(j);
            if (testDeep === '>') graph[j].push(i);
        };
    };
    // from copilot
    const indegree = {};
    const result = [];
    const queue = [];
    for (const node in graph) {
        indegree[node] = 0;
    }
    for (const node in graph) {
        for (const neighbor of graph[node]) {
            indegree[neighbor]++;
        }
    }
    for (const node in indegree) {
        if (indegree[node] === 0) {
            queue.push(node);
        }
    }
    while (queue.length > 0) {
        const u = queue.shift();
        result.push(u);
        for (const v of graph[u]) {
            indegree[v]--;
            if (indegree[v] === 0) {
                queue.push(v);
            }
        }
    }
    if (result.length !== Object.keys(graph).length) {
        throw new Error("Graph has a cycle!");
    }
    return result;
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

function summon(data) {
    entityData[data.id] = new Entity(data.type, data.pos, data.tag);
};

function deleteEntity(data) {
    if (/player(1|2)/.test(data.id)) {
        // player[data.id.replace('player', '') - 1] = null;
    } else {
        entityData[data.id] = undefined;
    };
};

function deleteBlock(data) {
    for (let index = 0; index < blocks.length; index++) {
        if (blocks[index].pos.join('-') === data.id) {
            blocks.splice(index, 1);
            break;
        };
    };
};

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
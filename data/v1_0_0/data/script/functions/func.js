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

function sort(inl, inf) {
    if (typeof inf !== 'function') {
        inf = (n1, n2) => n1 - n2;
    };

    function Q(ql, qf) {
        const m = floor(ql.length / 2);
        let al = [];
        let bl = [];
        for (let i = 0; i < ql.length; i++) {
            if (m !== i) {
                if (qf(ql[i], ql[m]) < 0) al.push(ql[i]);
                else bl.push(ql[i]);
            };
        };
        ql = [...sort(al, qf), ql[m], ...sort(bl, qf)]
        return ql;
    };

    function S(sl, sf) {
        for (let a = 0; a < sl.length; a++) {
            for (let b = 0; b < sl.length - a - 1; b++) {
                const c = b + a + 1;
                if (sf(sl[a], sl[c]) > 0) {
                    [sl[a], sl[c]] = [sl[c], sl[a]];
                };
            };
        };
        return sl;
    };

    var rl;

    if (inl.length <= 1) {
        return inl;
    } else if (inl.length <= 5) {
        rl = S(inl, inf);
    } else {
        rl = Q(inl, inf);
    };

    for (let index = 0; index < rl.length - 1; index++) {
        let a = index;
        let b = index + 1;
        if (inf(rl[a], rl[b]) > 0) {
            [rl[a], rl[b]] = [rl[b], rl[a]];
        };
    };

    return rl;
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

function getMinId(l) { return Array.from(l, (_v, k) => k).sort((a, b) => l[a] - l[b]).at(0); };

function getMaxId(l) { return Array.from(l, (_v, k) => k).sort((a, b) => l[b] - l[a]).at(0); };

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
}
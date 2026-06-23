"use strict";

function drawBlock(id, pos, direction) {
    const oPoint = pos.copy().get2DRlt().getAbs().pos;

    if (
        oPoint[0] + blockSize * 2 > 0 &&
        oPoint[1] + blockSize * 2 > 0 &&
        oPoint[0] - blockSize * 2 < canvas.width &&
        oPoint[1] - blockSize * 2 < canvas.height
    ) {

        const image = getImage(id[direction] || id.normal);

        const size = image.size;
        var cutStart = { x: 0, y: 0 };
        var cutData = { width: image.width, height: image.height };
        if (image.cut && image.cut.type === 'time') {
            if (image.cut.type === 'time') {
                let data = `${floor(gameTime * 1000 / image.cut.speed) % image.cut.count}`;
                cutStart = image.cut[data];
                cutData = { width: image.cut.width, height: image.cut.height };
            };
        };

        function g(p, p1, p3, p2) { return [(p1[0] - p[0]) / size, (p1[1] - p[1]) / size, (p2[0] - p[0]) / size, (p2[1] - p[1]) / size, ...p]; };

        const d = { '+': (size / 2), '-': (size / -2) };

        const tg = Array.from({ length: 7 }, (v, k) => Array.from(((k + 1).toString(2).padStart(3, '0')).split(''), (v, k) => ((v === '0') ? '-' : '+')));

        const points = {};

        Array.from({ length: 7 }, (v, index) => { points[tg[index].join('')] = pos.copy().move(new Vector('3D', Array.from({ length: 3 }, (v, k) => (d[tg[index][k]])))).get2DRlt().getAbs().pos });

        const side = { 'x': ['+++', '++-', '+--', '+-+'], 'y': ['-+-', '++-', '+++', '-++'], 'z': ['-++', '+++', '+-+', '--+'] };

        ctx.save();
        ctx.filter = `brightness(${bright[direction]})`;
        ctx.transform(...g(...Array.from(side[direction], (v, k) => (points[v]))));
        ctx.drawImage(image, cutStart.x, cutStart.y, cutData.width, cutData.height, -smallNumber1, -smallNumber1, size + smallNumber1, size + smallNumber1);
        ctx.restore();
    };

};

function drawBackGround(id, direction) {
    var image;

    function getSideImage(side) {
        image = getImage(resourceData[id][side] || resourceData[id].normal);
        ctx.filter = `brightness(${bright[side]})`;
    };

    function g(p, p1, p2) {
        return [
            (p1[0] - p[0]) / (blockSize * levelData.size),
            (p1[1] - p[1]) / (blockSize * levelData.size),
            (p2[0] - p[0]) / (blockSize * levelData.size),
            (p2[1] - p[1]) / (blockSize * levelData.size),
            ...p
        ];
    };

    const v0 = 0;
    const v1 = -(blockSize / 2) - blockSize;
    const v2 = -(blockSize / 2);
    const v3 = (blockSize * levelData.size);

    var pos0, pos1, pos2;
    if (direction === 'x') {
        getSideImage('x');
        pos0 = new Pos('3D', [v2 + v0, v3 + v2, v3 + v2]).get2DRlt().getAbs().pos;
        pos1 = new Pos('3D', [v2 + v0, v3 + v2, v2 + v0]).get2DRlt().getAbs().pos;
        pos2 = new Pos('3D', [v2 + v0, v2 + v0, v3 + v2]).get2DRlt().getAbs().pos;
        drawType1(pos0, pos1, pos2);

        getSideImage('y');
        pos0 = new Pos('3D', [v1 + v0, v3 + v2, v1 + v0]).get2DRlt().getAbs().pos;
        pos1 = new Pos('3D', [v1 + v3, v3 + v2, v1 + v0]).get2DRlt().getAbs().pos;
        pos2 = new Pos('3D', [v1 + v0, v3 + v2, v1 + v3]).get2DRlt().getAbs().pos;
        drawType2(pos0, pos1, pos2);

        getSideImage('z');
        pos0 = new Pos('3D', [v1 + v0, v3 + v2, v3 + v2]).get2DRlt().getAbs().pos;
        pos1 = new Pos('3D', [v1 + v3, v3 + v2, v3 + v2]).get2DRlt().getAbs().pos;
        pos2 = new Pos('3D', [v1 + v0, v2 + v0, v3 + v2]).get2DRlt().getAbs().pos;
        drawType3(pos0, pos1, pos2);
    };

    if (direction === 'y') {
        getSideImage('y');
        pos0 = new Pos('3D', [v2 + v0, v2 + v0, v2 + v0]).get2DRlt().getAbs().pos;
        pos1 = new Pos('3D', [v3 + v2, v2 + v0, v2 + v0]).get2DRlt().getAbs().pos;
        pos2 = new Pos('3D', [v2 + v0, v2 + v0, v3 + v2]).get2DRlt().getAbs().pos;
        drawType1(pos0, pos1, pos2);

        getSideImage('x');
        pos0 = new Pos('3D', [v3 + v2, v2 + v0, v3 + v2]).get2DRlt().getAbs().pos;
        pos1 = new Pos('3D', [v3 + v2, v2 + v0, v2 + v0]).get2DRlt().getAbs().pos;
        pos2 = new Pos('3D', [v3 + v2, v2 - v3, v3 + v2]).get2DRlt().getAbs().pos;
        drawType2(pos0, pos1, pos2);

        getSideImage('z');
        pos0 = new Pos('3D', [v1 + v0, v2 + v0, v3 + v2]).get2DRlt().getAbs().pos;
        pos1 = new Pos('3D', [v1 + v3, v2 + v0, v3 + v2]).get2DRlt().getAbs().pos;
        pos2 = new Pos('3D', [v1 + v0, v2 - v3, v3 + v2]).get2DRlt().getAbs().pos;
        drawType2(pos0, pos1, pos2);
    };

    if (direction === 'z') {
        getSideImage('z');
        pos0 = new Pos('3D', [v2 + v0, v3 + v2, v2 + v0]).get2DRlt().getAbs().pos;
        pos1 = new Pos('3D', [v3 + v2, v3 + v2, v2 + v0]).get2DRlt().getAbs().pos;
        pos2 = new Pos('3D', [v2 + v0, v2 + v0, v2 + v0]).get2DRlt().getAbs().pos;
        drawType1(pos0, pos1, pos2);

        getSideImage('x');
        pos0 = new Pos('3D', [v3 + v2, v3 + v2, v2 + v0]).get2DRlt().getAbs().pos;
        pos1 = new Pos('3D', [v3 + v2, v3 + v2, v2 - v3]).get2DRlt().getAbs().pos;
        pos2 = new Pos('3D', [v3 + v2, v2 + v0, v2 + v0]).get2DRlt().getAbs().pos;
        drawType3(pos0, pos1, pos2);

        getSideImage('y');
        pos0 = new Pos('3D', [v1 + v0, v3 + v2, v1 + v0]).get2DRlt().getAbs().pos;
        pos1 = new Pos('3D', [v1 + v3, v3 + v2, v1 + v0]).get2DRlt().getAbs().pos;
        pos2 = new Pos('3D', [v1 + v0, v3 + v2, v1 + v3]).get2DRlt().getAbs().pos;
        drawType3(pos0, pos1, pos2);
    };

    function drawType1(pos0, pos1, pos2) {
        ctx.save();
        ctx.transform(...g(pos0, pos1, pos2));
        for (let a = 0; a < levelData.size; a++) {
            for (let b = 0; b < levelData.size; b++) {
                ctx.drawImage(image, a * blockSize - smallNumber1, b * blockSize - smallNumber1, blockSize + smallNumber1 * 2, blockSize + smallNumber1 * 2);
            };
        };
        ctx.restore();
    };

    function drawType2(pos0, pos1, pos2) {
        ctx.save();
        ctx.transform(...g(pos0, pos1, pos2));
        for (let c = 0; c <= levelData.size; c++) {
            ctx.drawImage(image, c * blockSize - smallNumber1, -smallNumber1, blockSize + smallNumber1 * 2, blockSize + smallNumber1 * 2);
        };
        ctx.restore();
    };

    function drawType3(pos0, pos1, pos2) {
        ctx.save();
        ctx.transform(...g(pos0, pos1, pos2));
        for (let c = 0; c <= levelData.size; c++) {
            ctx.drawImage(image, -smallNumber1, c * blockSize - smallNumber1, blockSize + smallNumber1 * 2, blockSize + smallNumber1 * 2);
        };
        ctx.restore();
    };
};

function drawEntity(image, oPoint, direction, yaw = 0) {
    const size = image.size;

    const cutData = image.cut[direction];

    function g(p, p1, p3, p2) {
        return [
            (p1[0] - p[0]) / drawSize[direction][0],
            (p1[1] - p[1]) / drawSize[direction][0],
            (p2[0] - p[0]) / drawSize[direction][1],
            (p2[1] - p[1]) / drawSize[direction][1],
            ...p
        ];
    };

    const drawSize = {
        'top': [size.x, size.z],
        'front': [size.z, size.y],
        'right': [size.x, size.y],
        'back': [size.z, size.y],
        'left': [size.x, size.y]
    };

    const d = [
        { '+': (size.x / 2), '-': (size.x / -2) },
        { '+': (size.y / 2), '-': (size.y / -2) },
        { '+': (size.z / 2), '-': (size.z / -2) }
    ];

    const tg = Array.from({ length: 8 }, (v, k) => Array.from(((k).toString(2).padStart(3, '0')).split(''), (v, k) => ((v === '0') ? '-' : '+')));

    const points = {};

    Array.from({ length: 8 }, (v, index) => { points[tg[index].join('')] = new Pos('3D', [0, 0, 0]).move(new Vector('3D', Array.from({ length: 3 }, (v, k) => (d[k][tg[index][k]])))).get2DRlt(yaw).move(new Vector('2D', oPoint)).getAbs().pos });

    const side = {
        'top': ['-+-', '++-', '+++', '-++'],
        'front': ['+++', '++-', '+--', '+-+'],
        'right': ['-++', '--+', '+-+', '+++'],
        'back': ['-++', '-+-', '---', '--+'],
        'left': ['-+-', '++-', '+--', '---']
    };

    ctx.save();
    ctx.filter = `brightness(1)`;
    ctx.transform(...g(...Array.from(side[direction], (v, k) => (points[v]))));
    ctx.drawImage(image, cutData.x, cutData.y, cutData.width, cutData.height, -smallNumber1, -smallNumber1, drawSize[direction][0] + smallNumber1, drawSize[direction][1] + smallNumber1);
    ctx.restore();
};

function drawSign(id, pos) {
    const image = getImage(id);

    const size = image.size;
    var cutStart = { x: 0, y: 0 };
    var cutData = { width: image.width, height: image.height };
    if (image.cut && image.cut.type === 'time') {
        if (image.cut.type === 'time') {
            let data = `${floor(gameTime * 1000 / image.cut.speed) % image.cut.count}`;
            cutStart = image.cut[data];
            cutData = { width: image.cut.width, height: image.cut.height };
        };
    };

    function g(p, p1, p2) { return [(p1[0] - p[0]) / size, (p1[1] - p[1]) / size, (p2[0] - p[0]) / size, (p2[1] - p[1]) / size, ...p]; };

    let lt = pos.copy().move(new Vector('3D', [-(size / 2), 0, -(size / 2)])).get2DRlt().getAbs().pos;
    let rt = pos.copy().move(new Vector('3D', [(size / 2), 0, -(size / 2)])).get2DRlt().getAbs().pos;
    let lb = pos.copy().move(new Vector('3D', [-(size / 2), 0, (size / 2)])).get2DRlt().getAbs().pos;

    ctx.save();
    ctx.filter = `opacity(0.5)`;
    ctx.transform(...g(lt, rt, lb));
    ctx.drawImage(image, cutStart.x, cutStart.y, cutData.width, cutData.height, 0, 0, size, size);
    ctx.restore();
};
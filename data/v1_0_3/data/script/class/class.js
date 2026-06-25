"use strict";

const posTag = ['x', 'y', 'z'];
const signedTag = ['-', '+'];

class Pos {
    /**
     * 
     * @param {String} type abs2D | rlt2D | 3D 
     * @param  {...Number} posValue x, y, [...z]
     */
    constructor(type, posValue) {
        this.type = type;
        this.pos = posValue;
        this.d = 2;
        switch (this.type) {
            case 'abs2D':
                this.x = (this.pos[0]).toFixed(8) - 0;
                this.y = (this.pos[1]).toFixed(8) - 0;

                this.absX = this.x - 0;
                this.absY = this.y - 0;

                this.rltX = (this.absX - screenOpos.x);
                this.rltY = (-this.absY + screenOpos.y);
                break;

            case 'rlt2D':
                this.x = (this.pos[0]).toFixed(8) - 0;
                this.y = (this.pos[1]).toFixed(8) - 0;

                this.rltX = this.x - 0;
                this.rltY = this.y - 0;

                this.absX = (this.rltX + screenOpos.x);
                this.absY = (-this.rltY + screenOpos.y);
                break;

            case '3D':
                this.x = (this.pos[0]).toFixed(8) - 0;
                this.y = (this.pos[1]).toFixed(8) - 0;
                this.z = (this.pos[2]).toFixed(8) - 0;
                this.d++;
                break;

            default:
                break;
        };
    };
    /**
     * @returns {Pos} abs Pos
     */
    getAbs() { return new Pos('abs2D', [this.absX, this.absY]); };
    /**
     * @returns {Pos} relative Pos
     */
    getRlt() { return new Pos('rlt2D', [this.rltX, this.rltY]); };
    /**
     * @returns {Pos} 2D Pos
     */
    get2DRlt(yaw = 0, pitch = 0) {
        return new Pos('rlt2D', [
            ((
                (this.x * sin(angle.yaw + yaw)) -
                (this.z * cos(angle.yaw + yaw))
            ) * scale / resolution).toFixed(8) - 0,
            ((
                (this.y * cos(angle.pitch + pitch)) -
                (this.x * cos(angle.yaw + yaw) * sin(angle.pitch + pitch)) -
                (this.z * sin(angle.yaw + yaw) * sin(angle.pitch + pitch))
            ) * scale / resolution).toFixed(8) - 0
        ])
    };
    /**
     * @param {...Number} posValue x, y, [...z]
     * @returns {Pos} set Pos
     */
    setPos(posValue) { return new Pos(this.type, posValue); };
    /**
     * @param {Vector} vector 2D | 3D
     * @returns {Pos} Pos + Vector
     */
    move(vector) {
        this.x += vector.x;
        this.y += vector.y;
        if (this.type === '3D') {
            this.z += vector.z;
            return new Pos(this.type, [this.x, this.y, this.z]);
        };
        return new Pos(this.type, [this.x, this.y])
    };
    copy() {
        return new Pos(this.type, this.pos);
    };
};

class Vector {
    /**
     * 
     * @param {String} type 
     * @param  {Number[]} vactorValue 
     */
    constructor(type, vactorValue) {
        this.type = type;
        this.vector = vactorValue;
        this.x = this.vector[0] - 0;
        this.y = this.vector[1] - 0;
        this.d = 2;
        if (this.type === '3D') {
            this.z = this.vector[2] - 0;
            this.d++;
        };
    };
    /**
     * 
     * @param {Number[]} vector
     * @param {Number} r
     * @returns {Vector} vector1 + vector2
     */
    fc1(vector, r) { return new Vector(this.type, Array.from(vector, (v, k) => (v * r))) };

    /**
     * 
     * @param {Pos} pos1 abs2D | rlt2D | 3D 
     * @param {Pos} pos2 abs2D | rlt2D | 3D 
     * @returns {Vector} 2D | 3D
     */
    getVector(pos1, pos2) {
        let dx = pos2.x - pos1.x;
        let dy = pos2.y - pos1.y;
        let dz = (pos1.type === '3D') ? (pos2.z - pos1.z) : 0;
        return new Vector(`${pos1.d}D`, [dx, dy, dz]);
    };
    copy() {
        return new Vector(this.type, this.vector);
    };
};

class Block {
    className = 'Block';
    constructor(type, pos) {
        this.type = type;
        this.id = resourceData[this.type] || resourceData.debug;
        this.image = document.getElementById(this.id.normal);
        this.size = { x: blockSize, y: blockSize, z: blockSize };
        this.drawPos = Array.from(pos, (v) => (v + 1));
        this.inputPos = pos;
        this.pos = new Pos('3D', Array.from(pos, (v) => (v * blockSize)));
        this.oPoint = this.pos.get2DRlt().pos;
        this.posId = pos.join('-');
        blockPosId[this.posId] = this;
    };
    draw() {
        const drawTestPos = Array.from({ length: 3 }, (_v, k) => Array.from({ length: 3 }, (_v, k2) => (k === k2) ? this.drawPos[k2] : this.inputPos[k2]).join('-'));
        for (let posId in drawTestPos) {
            if (blockPosId[drawTestPos[posId]] === undefined || (/air|door[1-2]P|stone2/.test(blockPosId[drawTestPos[posId]].type) && !/air|door[1-2]P|stone2/.test(this.type))) {
                drawBlock(this.id, this.pos, posTag[posId]);
            };
        };
    };
};

class Entity {
    className = 'Entity';
    constructor(id, pos, tagData = null) {
        this.type = id;
        this.yaw = 0;
        this.absYaw = (this.yaw + angle.yaw + 360) % 360;
        this.image = getImage(id);
        this.id = resourceData[id];
        this.size = this.image.size;
        this.side = {
            x: (blockSize - this.size.x) / 2,
            y: (blockSize - this.size.y) / 2,
            z: (blockSize - this.size.z) / 2
        };

        this.pos = new Pos('3D', Array.from(pos, (v) => (v * blockSize)));
        this.oPoint = this.pos.get2DRlt().pos;
        this.inputPos = pos;
        this.v = { x: 0, y: 0, z: 0 };
        this.freezeTime = 0;
        this.tagData = tagData;
        this.toHide = false

        this.signed = '';
        this.onPlayerHead = false;
        this.playerDeltaPos = [0, 0, 0];
    };
    see(x, z) {
        let toYaw = ((Math.atan2(x, z) / Math.PI) * 180) - 90;
        this.yaw = (toYaw + 360) % 360;
        this.absYaw = (this.yaw + angle.yaw + 360) % 360;
    };
    move(moveDirection, vector) {
        this.pos = this.pos.copy().move(new Vector('3D', Array.from(vector, (v) => (v * blockSize))));
        var returns = false;
        this.moveDirection = moveDirection;

        const signed = (vector[posTag.indexOf(this.moveDirection)] < 0) ? 1 : -1;

        if (signed * (this.pos[this.moveDirection] + signed * this.side[this.moveDirection]) < signed * (moveData[signed])) {
            const toPos = Array.from({ length: 3 }, (_v, k) => ((posTag[k] === this.moveDirection) ? (moveData[signed] - (signed * this.side[this.moveDirection])) : (this.pos[posTag[k]])));
            this.v[this.moveDirection] = 0;
            returns = true;

            this.to(toPos);
        };

        this.blockPos = Array.from({ length: 3 }, (_v, k) => (round((this.pos.pos[k]) / blockSize) * blockSize));

        this.blockPosKey = Array.from({ length: 8 }, (_v0, k0) => Array.from((k0).toString(2).padStart(3, '0').split(''), (v, k) => signedTag[v - 0]));
        this.blockPosValue = Array.from({ length: 8 }, (_v0, k0) => Array.from({ length: 3 }, (_v1, k1) => (abs(round((this.pos.pos[k1] + (this.size[posTag[k1]] / 2 - smallNumber2) * ((this.blockPosKey[k0][k1] === '-') ? -1 : 1)) / blockSize)))).join('-'));

        const tagId = posTag.indexOf(this.moveDirection);
        if (vector[posTag.indexOf(this.moveDirection)] !== 0) {
            this.signed = (vector[posTag.indexOf(this.moveDirection)] < 0) ? '-' : '+';
            this.canIntoPortal = (/(x|z)/.test(this.moveDirection) && /-/.test(this.signed));
            this.touchBlock = this.test(tagId, this.signed);
            if (this.touchBlock !== false) {
                this.v[this.moveDirection] = 0;
                returns = true;
                this.testFor();
            };
        };
        this.oPoint = this.pos.get2DRlt().pos;
        this.top = Array.from({ length: 3 }, (_v, k) => round((this.pos.pos[k] + this.size[posTag[k]] / 2)));
        return returns;
    };
    to(pos) {
        this.pos = new Pos('3D', pos);
        return this;
    };
    setV(vx, vz) {
        this.v.x = vx * (deltaTime / 1000);
        this.v.z = vz * (deltaTime / 1000);
    };
    draw() {
        this.oPoint = this.pos.get2DRlt().pos;

        if (this.size.y > 0) {
            if (this.absYaw > 90 && this.absYaw < 270) drawEntity(this.image, this.oPoint, 'front', this.yaw);
            else drawEntity(this.image, this.oPoint, 'back', this.yaw);
            if (this.absYaw > 0 && this.absYaw < 180) drawEntity(this.image, this.oPoint, 'left', this.yaw);
            else drawEntity(this.image, this.oPoint, 'right', this.yaw);
        };
        drawEntity(this.image, this.oPoint, 'top', this.yaw);
        if (this.size.y > 0) {
            if (this.absYaw > 90 && this.absYaw < 270) drawEntity(this.image, this.oPoint, 'back', this.yaw);
            else drawEntity(this.image, this.oPoint, 'front', this.yaw);
            if (this.absYaw > 0 && this.absYaw < 180) drawEntity(this.image, this.oPoint, 'right', this.yaw);
            else drawEntity(this.image, this.oPoint, 'left', this.yaw);
        };
    };
    drawSign() {
        drawSign('upSign', this.pos.copy().move(new Vector('3D', [0, this.size.y / -2, blockSize * -0.75])));
        drawSign('rightSign', this.pos.copy().move(new Vector('3D', [blockSize * 0.75, this.size.y / -2, 0])));
        drawSign('downSign', this.pos.copy().move(new Vector('3D', [0, this.size.y / -2, blockSize * 0.75])));
        drawSign('leftSign', this.pos.copy().move(new Vector('3D', [blockSize * -0.75, this.size.y / -2, 0])));
    };
    moveUpdate() {
        if (this.toHide) {
            this.size.x -= 2;
            this.size.y -= 2;
            this.size.z -= 2;
            if (this.size.x <= 0 || this.size.y <= 0 || this.size.z <= 0) {
                this.toHide = false;
                deleteEntity({ id: this.type });
            };
            this.side = {
                x: (blockSize - this.size.x) / 2,
                y: (blockSize - this.size.y) / 2,
                z: (blockSize - this.size.z) / 2
            };
        };
        if (this.freezeTime <= 0 && !(this.tagData && this.tagData.noMovement)) {
            if (this.v.x !== 0 || this.v.z !== 0) {
                this.see(this.v.x, this.v.z);
            };
            if (!(this.tagData && this.tagData.noGravity)) {
                this.v.y -= moveData.g * (deltaTime / 1000);
            };
            let moveUnit = (1 / moveDefinition);

            for (let tagId = 0; tagId < posTag.length; tagId++) {
                let tag = posTag[tagId];
                const vUnit = floor(abs(this.v[tag]) / moveUnit);
                const vRemainder = (abs(this.v[tag]) % moveUnit);
                const vSigned = (this.v[tag] >= 0) ? 1 : -1;
                if (vUnit !== 0) {
                    const moveDelta = Array.from({ length: 3 }, (_v, k) => (k === tagId) ? (vSigned * moveUnit) : 0);
                    var isMoveHit = false;
                    for (let times = 0; times < vUnit && !isMoveHit; times++) {
                        isMoveHit = this.move(tag, moveDelta);

                        if (!/player[1-2]/.test(this.type)) { isMoveHit = isMoveHit || this.touchUpdate(); };
                    };
                };
                this.move(tag, Array.from({ length: 3 }, (_v, k) => (k === tagId) ? (vSigned * vRemainder) : 0));

                if (!/player[1-2]/.test(this.type)) this.touchUpdate();
            };
        } else if (!(this.tagData && this.tagData.noGravity)) {
            this.freezeTime -= deltaTime;
        };
        this.touchUpdate();
    };
    touchUpdate() {
        if (/test[0-6]/.test(this.type)) {
            let testType = this.type.replace('test', '');
            if (entityData[`block${testType}`]) {
                const getBlock = entityData[`block${testType}`];

                const otherSide = Array.from({ length: 3 }, (_v, k) => (this.size[posTag[k]] + getBlock.size[posTag[k]]) / 2 + smallNumber2);
                const deltaPos = Array.from({ length: 3 }, (_v, k) => abs(this.pos[posTag[k]], getBlock.pos[posTag[k]]));

                const testIn = Array.from({ length: 3 }, (_v, k) => (deltaPos[k] < otherSide[k]));

                this.tagData.push = testAll(testIn, true);
            };
        };

        if (/block[0-6]/.test(this.type)) {
            const blockType = this.type.replace('block', '') - 0;
            const target = [...player];
            for (const getTarget of target) {
                if (!/undefined|null/.test(getTarget)) {
                    const otherSide = Array.from({ length: 3 }, (_v, k) => (this.size[posTag[k]] + getTarget.size[posTag[k]]) / 2 + 0);
                    const deltaPos = Array.from({ length: 3 }, (_v, k) => (this.pos[posTag[k]] - getTarget.pos[posTag[k]]));

                    const testIn = Array.from({ length: 3 }, (_v, k) => (abs(deltaPos[k]) <= otherSide[k]));

                    if (testAll(testIn, true)) {
                        const moveSigned = Array.from({ length: 3 }, (_v, k) => (this.pos[posTag[k]] >= getTarget.pos[posTag[k]]) ? 1 : -1);
                        const touch = Array.from({ length: 3 }, (_v, k) => abs(otherSide[k], abs(deltaPos[k])));

                        const touchPos = getMinId(touch);
                        const toPos = Array.from({ length: 3 }, (_v, k) => (k === touchPos) ? ((touch[k] * moveSigned[k]) / blockSize) : 0);

                        if (touchPos === 1 && deltaPos[1] > 0) {
                            if (!this.onPlayerHead) {
                                this.onPlayerHead = true;
                                this.playerDeltaPos[0] = deltaPos[0];
                                this.playerDeltaPos[2] = deltaPos[2];
                            } else {
                                for (let side = 0; side <= 2; side += 2) {
                                    const toDeltaPos = Array.from({ length: 3 }, (_v, k) => (k === side) ? ((this.playerDeltaPos[k] - deltaPos[k]) / blockSize) : 0);
                                    let isHit = this.move(posTag[side], toDeltaPos);
                                    if (isHit) {
                                        this.onPlayerHead = false;
                                    };
                                };
                            };
                        } else {
                            this.onPlayerHead = false;
                        };
                        this.v[posTag[touchPos]] = 0;
                        let isHit = this.move(posTag[touchPos], toPos);
                        if (isHit) {
                            getTarget.move(posTag[touchPos], Array.from(toPos, (v) => -v));
                            getTarget.v[posTag[touchPos]] = 0;
                            return true;
                        };
                    };
                };
            };
        };

        return false;
    };
    test(index, type) {
        let testBlock = false;
        let returns = [false, null, null];
        for (const key in this.blockPosKey) {
            if (this.blockPosKey[key][index] === type) {
                let data = blockPosId[this.blockPosValue[key]];
                if (data !== undefined) {
                    if (!testBlock) {
                        testBlock = true;
                        returns[0] = true;
                        returns[1] = data.type;
                        returns[2] = this.blockPosValue[key];
                    } else if (returns[1] !== data.type) {
                        return [true, null, null];
                    };
                } else if (returns[1] === null) {
                    testBlock = true;
                } else { return [true, null, null]; };
            };
        };
        if (returns[0] === false) { return false; } else { return returns; };
    };
    testFor() {
        if (/air/.test(this.touchBlock[1])) {
            return;
        };
        if (/door[1-2]P/.test(this.touchBlock[1])) {
            nextLevel(this.type);
            return;
        };
        if (this.canIntoPortal && /portal[1-4]/.test(this.touchBlock[1])) {
            const toBlockPos = portalData[`${this.touchBlock[1].replace(/-(x|z)/,'')}-${this.moveDirection}|${this.touchBlock[2]}`];
            if (toBlockPos !== undefined) {
                const toPos = Array.from(toBlockPos, (v) => v * blockSize);
                const noBar = Array.from({ length: 7 }, (_v, k1) => {
                    if (entityData[`block${k1}`] !== undefined) {
                        const otherSide = Array.from({ length: 3 }, (_v, k) => (entityData[`block${k1}`].size[posTag[k]] + this.size[posTag[k]]) / 2);
                        const deltaPos = Array.from({ length: 3 }, (_v, k) => (entityData[`block${k1}`].pos[posTag[k]] - toPos[k]));

                        const testIn = Array.from({ length: 3 }, (_v, k) => (abs(deltaPos[k]) <= otherSide[k]));

                        if (testAll(testIn, true)) {
                            return true;
                        };
                    };
                    return false;
                });
                if (!testOne(noBar, true)) {
                    this.freezeTime = 500;
                    this.to(toPos);
                    return;
                }
            };
        };

        const toPos = Array.from({ length: 3 }, (_v, k) => ((posTag[k] === this.moveDirection) ? (this.blockPos[k] + (this.side[this.moveDirection] * ((this.signed === '-') ? -1 : 1))) : (this.pos[posTag[k]])));
        this.to(toPos);
    };
    copy() {
        return new Entity(this.type, this.inputPos, this.tagData);
    };
};
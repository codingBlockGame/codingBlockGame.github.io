'use strict';

var variable = {};

function runFunction() {
    for (const index in functions) {
        var isRun = false;
        const data = functions[index];
        if (data !== null) {
            const loop = data.loop;
            const type = data.type;
            if (type === 'set') {
                const input = data.input;

                const variableKey = getValue(input[0]);
                const variableValue = getValue(input[1]);

                variable[variableKey] = variableValue;
                isRun = true;
            };

            if (type === 'if') {
                const input = data.input;

                const v1 = getValue(input[0]);
                const c = getValue(input[1]);
                const v2 = getValue(input[2]);

                if (ifFunction(v1, c, v2)) {
                    const command = data.command;
                    isRun = true;
                    runCommand(command);
                };
            };
            if (isRun && !loop) {
                functions[index] = null;
            };
        };
    };
};

function getValue({ type, name, id = undefined }) {
    if (/bool|string|comparison/.test(type)) {
        return name;
    };
    if (type === 'number') {
        return name - 0;
    };
    if (type === 'variable') {
        if (name === 'time') return gameTime;
        return variable[name];
    };
    if (type === 'entity') {
        var gets = entityData[id];
        for (const tag of name) {
            if (gets === undefined) return undefined;
            gets = gets[tag];
        };

        return gets;
    };
    return undefined;
};

function ifFunction(v1, c, v2) {
    if (c === '=') { return (v1 === v2); };
    if (c === '!=') { return (v1 !== v2); };
    if (c === '>=') { return (v1 >= v2); };
    if (c === '<=') { return (v1 <= v2); };
    if (c === '>') { return (v1 > v2); };
    if (c === '<') { return (v1 < v2); };
    return false;
};

function runCommand(commandList) {
    for (const command of commandList) {
        if (command.type === 'setblock') {
            setblock(command.data);
        };
        if (command.type === 'summon') {
            summon(command.data);
        };
        if (command.type === 'deleteBlock') {
            deleteBlock(command.data);
        };
        if (command.type === 'deleteEntity') {
            entityData[command.data.id].toHide = true
        };
        if (command.type === 'addPortal') {
            addPortal(command.data);
        };
        if (command.type === 'delay') {
            functions.push({
                loop: false,
                type: 'if',
                input: [{
                    type: 'variable',
                    name: 'time'
                }, {
                    type: 'comparison',
                    name: '>'
                }, {
                    type: 'number',
                    name: gameTime + (command.data.time / speed)
                }],
                command: command.data.command
            });
        };
        if (command.type === 'tp') {
            player[command.data.id].to(Array.from(command.data.pos, (v) => v * blockSize));
            player[command.data.id].move('y', [0, 0, 0]);
            player[command.data.id].freezeTime = 500;
        };
        if (command.type === 'addTips') {
            const data = command.data;
            tips.push({
                start: gameTime + (data.deltaTime) / speed,
                end: gameTime + (data.deltaTime + data.time + data.opacity * 2) / speed,
                opacity: data.opacity / speed,
                text: data.text
            });
        };
        if (command.type === 'exitTips') {
            tips.at(-1).end = (gameTime + 0.5) / speed;
        };
        if (command.type === 'set') {
            const variableKey = getValue(command.data.name);
            const variableValue = getValue(command.data.value);

            variable[variableKey] = variableValue;
        };
        if (command.type === 'by') {
            const variableKey = getValue(command.data.name);
            const variableValue = getValue(command.data.value);

            variable[variableKey] += variableValue;
        };
        if (command.type === 'reset') {
            runCommand([{
                type: 'set',
                data: {
                    name: {
                        type: 'string',
                        name: 'resetType'
                    },
                    value: {
                        type: 'number',
                        name: getValue({
                            type: 'variable',
                            name: 'runType'
                        })
                    }
                }
            }]);
        };
    };
};
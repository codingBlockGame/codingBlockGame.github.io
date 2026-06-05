function s(c1, c2) {
    function c(d1, d2) {
        return Array.from({ length: 5 }, (v1, k1) => `#${Array.from({ length:3 }, (v2, k2) => Math.round((d1[k2] * k1 + d2[k2] * (4 - k1)) / 4).toString(16).padStart(2, '0')).join('').toLocaleUpperCase()}`);
    };

    function g(c) {
        return Array.from({ length: 3 }, (v, k) => (parseInt(c.split('#').pop().slice(k * 2, (k + 1) * 2), 16)));
    };

    const l = c(g(c1), g(c2));
    for (const n of l) console.log(n);
}
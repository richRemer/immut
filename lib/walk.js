var set = require("./set");

/**
 * Walk object keys, apply function to result, and return updated immutable
 * object.
 * @param {object} obj
 * @param {string[]} keys
 * @param {function} fn
 * @param {...*} args
 * @returns {object}
 */
function walk(obj, keys, fn, args) {
    args = Array.prototype.slice.call(arguments, 3);
    keys = keys.slice();

    var curr = obj,
        updated;

    keys.forEach(key => curr = curr ? curr[key] : undefined);
    updated = fn.apply(null, [curr].concat(args));

    if (updated === curr) return;
    if (!keys.length) return updated;
    
    return walk(obj, keys.slice(0, -1), set, keys.slice(-1)[0], updated);
}

module.exports = walk;

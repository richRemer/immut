/**
 * Return immutable object with key set.
 * @param {object} obj
 * @param {string|object} nameOrVals
 * @param {*} [value]
 */
function set(obj, nameOrVals, value) {
    var name,
        updated = {},
        vals = typeof nameOrVals === "string"
            ? {[nameOrVals]: value}
            : nameOrVals;

    for (name in obj) {
        updated[name] = obj[name];
    }

    for (name in vals) {
        updated[name] = vals[name];
    }

    return Object.freeze(updated);
}

module.exports = set;

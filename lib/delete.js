/**
 * Return immutable object with key deleted.
 * @param {object} obj
 * @param {string} key
 * @returns {object}
 */
function del(obj, key) {
    var name,
        updated = {};

    if (!(key in obj) && Object.isFrozen(obj)) return obj;

    for (name in obj) if (name !== key) {
        updated[name] = obj[name];
    }

    return Object.freeze(updated);
}

module.exports = del;

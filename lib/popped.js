/**
 * Return immutable array with value popped off.
 * @param {array} arr
 * @param {function} [fn]
 * @returns {array}
 */
function popped(arr, fn) {
    if (arr.length === 0) {
        return Object.isFrozen(arr) ? arr : Object.freeze([]);
    }

    var popped = arr.slice(0, -1);

    if (fn) fn(arr.slice(-1)[0]);
    return Object.freeze(popped);
}

module.exports = popped;

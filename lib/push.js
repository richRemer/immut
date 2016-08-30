/**
 * Return immutable array with values pushed onto it.
 * @param {array} arr
 * @param {...*} values
 * @returns {array}
 */
function push(arr, values) {
    values = Array.prototype.slice.call(arguments, 1);
    return Object.freeze(arr.concat(values));
}

module.exports = push;

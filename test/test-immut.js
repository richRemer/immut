var expect = require("expect.js"),
    immut = require("..");

describe("push(array, ...)", () => {
    var arr = ["apple", "orange"];

    it("should return new array with values added", () => {
        var updated = immut.push(arr, "peach");
        expect(updated).to.be.an("array");
        expect(updated).to.not.be(arr);
        expect(updated.length).to.be(3);
        expect(~updated.indexOf("peach")).to.be.ok();
    });

    it("should not update original array", () => {
        var updated = immut.push(arr, "peach");
        expect(arr.length).to.be(2);
        expect(~arr.indexOf("peach")).to.not.be.ok();
    });

    it("should return frozen array", () => {
        var updated = immut.push(arr, "peach");
        expect(Object.isFrozen(updated)).to.be(true);
    });
});

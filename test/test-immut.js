var expect = require("expect.js"),
    sinon = require("sinon"),
    immut = require("..");

describe("push(array, ...)", () => {
    var arr = ["apple", "orange"];

    it("should return new array with values added", () => {
        var updated = immut.push(arr, "peach");
        expect(updated).to.be.an("array");
        expect(updated).to.not.be(arr);
        expect(updated.length).to.be(3);
        expect(updated[2]).to.be("peach");
    });

    it("should not update original array", () => {
        var updated = immut.push(arr, "peach");
        expect(arr.length).to.be(2);
        expect(arr[0]).to.be("apple");
        expect(arr[1]).to.be("orange");
    });

    it("should return frozen array", () => {
        var updated = immut.push(arr, "peach");
        expect(Object.isFrozen(updated)).to.be(true);
    });
});

describe("popped(array, [function])", () => {
    var arr = ["apple", "orange"];

    it("should return new array with last value removed", () => {
        var updated = immut.popped(arr);
        expect(updated).to.be.an("array");
        expect(updated).to.not.be(arr);
        expect(updated.length).to.be(1);
        expect(updated[0]).to.be("apple");
    });

    it("should pass popped value to function", () => {
        var spy = sinon.spy(),
            updated = immut.popped(arr, spy);

        expect(spy.calledOnce).to.be(true);
        expect(spy.calledWith("orange")).to.be(true);
    });

    it("should not update original array", () => {
        var updated = immut.popped(arr);
        expect(arr.length).to.be(2);
        expect(arr[0]).to.be("apple");
        expect(arr[1]).to.be("orange");
    });

    it("should return frozen array", () => {
        var updated = immut.popped(arr);
        expect(Object.isFrozen(updated)).to.be(true);
    });
});

describe("set(object, string, *)", () => {
    var obj = {foo: 42};

    it("should return new object with key set", () => {
        var updated = immut.set(obj, "bar", 13);
        expect(updated).to.be.an("object");
        expect(updated).to.not.be(obj);
        expect(updated.foo).to.be(42);
        expect(updated.bar).to.be(13);
    });

    it("should not updated original object", () => {
        var updated = immut.set(obj, "bar", 13);
        expect(obj.bar).to.be(undefined);
    });

    it("should return frozen object", () => {
        var updated = immut.set(obj, "bar", 13);
        expect(Object.isFrozen(updated)).to.be(true);
    });
});

describe("set(object, object)", () => {
    var obj = {foo: 42};

    it("should return new object with key set", () => {
        var updated = immut.set(obj, {bar: 13});
        expect(updated).to.be.an("object");
        expect(updated).to.not.be(obj);
        expect(updated.foo).to.be(42);
        expect(updated.bar).to.be(13);
    });

    it("should not update original object", () => {
        var updated = immut.set(obj, {bar: 13});
        expect(obj.bar).to.be(undefined);
    });

    it("should return frozen object", () => {
        var updated = immut.set(obj, {bar: 13});
        expect(Object.isFrozen(updated)).to.be(true);
    });
});

describe("walk(obj, string[], function, ...)", () => {
    var obj = {foo: {bar: {baz: 42}}},
        arr = {foo: {bar: [42]}};

    it("should walk object keys with set, then apply function to final", () => {
        var updated = immut.walk(obj, ["foo", "bar"], immut.set, "baz", 13);
        expect(updated).to.be.an("object");
        expect(updated).to.not.be(obj);
        expect(updated.foo).to.be.an("object");
        expect(updated.foo).to.not.be(obj.foo);
        expect(updated.foo.bar).to.be.an("object");
        expect(updated.foo.bar).to.not.be(obj.foo.bar);
        expect(updated.foo.bar.baz).to.be(13);
    });

    it("should not update original object", () => {
        var updated = immut.walk(obj, ["foo", "bar"], immut.set, "baz", 13);
        expect(obj.foo.bar.baz).to.be(42);
    });

    it("should return frozen object", () => {
        var updated = immut.walk(obj, ["foo", "bar"], immut.set, "baz", 13);
        expect(Object.isFrozen(updated)).to.be(true);
    });
});


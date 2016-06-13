export default function createPrototypeChain() {
    for (var i = 0; i < arguments.length; i++) {
        var item = arguments[i];
        var proto = arguments[i + 1];
        try {
            item.__proto__.__proto__ = proto;
        }
        catch (error) {
            item.__proto__ = proto;
        }
    }
}
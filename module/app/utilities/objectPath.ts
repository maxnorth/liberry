export var objectPath = {
    get: get
};

function get(object, path) {
    if (typeof(path) === "string") {
        path = path.match(/[^\/\.]+/g);
    }
    if (object.items) object = object.items;
    
    if (path.length > 1) {
        return get(object[path[0]], path.slice(1, path.length))
    }
    //todo: return clone
    return object[path[0]];
}
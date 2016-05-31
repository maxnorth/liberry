export var objectPath {
    get: get
}

function get(object, path) {
    if (typeof(path) === "string") {
        path = parsePath(path);
    }
    if (object.items) object = object.items;
    
    if (path.length > 1) {
        return get(object[path[0]], path.slice(1, path.length))
    }
    return object[path[0]];
}

function parsePath(path) {
    var pathRegExp = /[^\/\.]+/g,
        match,
        results = [];
    while (match = pathRegExp.exec(path)) {
        results.push(match[0]);
    }
    return results;
}
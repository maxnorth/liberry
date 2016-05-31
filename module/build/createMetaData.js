var fs = require("fs");
var jsonfile = require("jsonfile");

function buildLibraryMetadata(path, metadata) {
    if (!metadata) {
        metadata = {};
    }
    
    var items = getDirectoryItems(path);
    
    if (items.length > 0 && typeof(metadata.items) !== "object") {
        metadata.items = {};
    }
    
    for (var i in items) {
        var item = items[i];
        
        if (item.type === "folder") {
            //TODO use extension (or merging) instead of assignment
            metadata.items[item.name] = buildLibraryMetadata(path + "/" + item.name, metadata.items[item.name]);
        }
        else if (item.type === "json") {
            
            var jsonResult = jsonfile.readFileSync(path +"/"+ item.file);
            
            if (item.name === parentFolder(path) + "-config") {
                extend(metadata.items, jsonResult);
            }
            else {
                metadata.items[item.name] = jsonResult;
            }
        }
        else {
            //parse as string, assign to object with extension as property name
            
        }
    }
    
    return metadata;
    
}

function extend(target, extender) {
    for (var i in extender) {
        target[i] = extender[i];
    }
}

function getDirectoryItems(path) {
    var files = fs.readdirSync(path),
        items = [];
    
    for (var i in files) {
        var file = files[i],
            item = {},
            extensionIndex = file.indexOf("."),
            isFolder = fs.lstatSync(path +"/"+ file).isDirectory();
        
        if (extensionIndex !== file.lastIndexOf(".")) {
            throw new Error(path +"/"+ file +" - Library files may not have multi-part extensions. Please include only one period per file name.");
        }
        if (extensionIndex === 0) {
            throw new Error(path +"/"+ file +" - Library files must have names.");
        }
        if (isFolder && extensionIndex > -1 || file.indexOf("/") > -1) {
            throw new Error(path +"/"+ file +" - Folder names may not include periods or forward slashes: /.");
        }
        
        item.name = isFolder ? file : file.slice(0, extensionIndex);
        item.type = isFolder ? "folder" : (extensionIndex > -1 ? file.slice(extensionIndex + 1, Infinity) : undefined);
        item.file = file;
        
        items.push(item);
    }
    
    return items;
}

function parentFolder(path) {
    return path.slice(path.indexOf("/") + 1, Infinity);
}

console.log(buildLibraryMetadata("ExampleStructure/library"));
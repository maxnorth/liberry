var fs = require("fs");
var jsonfile = require("jsonfile");
var merge = require("merge");

function run(targetPath, resultPath) {

  function createMetadata(metadataType, path, asChild) {
      var metadata = {};

      var items = getDirectoryItems(path);

      if (items.length > 0 && typeof(metadata.items) !== "object") {
          metadata.items = {};
      }

      for (var i in items) {
          var item = items[i];

          if (item.type === "folder") {
              if (!metadata.items[item.name]) {
                metadata.items[item.name] = {};
              }
              extend(metadata.items[item.name], createMetadata(metadataType, path + "/" + item.name, metadataType === "library"));
          }
          else if (item.type === "json") {
              var jsonResult = jsonfile.readFileSync(path +"/"+ item.file);

              if (item.name === "items-config") {
                  extend(metadata.items, jsonResult);
              }
              else {
                  metadata.items[item.name] = metadata.items[item.name] || {};
                  extend(metadata.items[item.name], jsonResult);
              }
          }
          else {
              //parse as string, assign to object with extension as property name
              try {
                if (!metadata.items[item.name]) metadata.items[item.name] = {};
                metadata.items[item.name][item.type] = fs.readFileSync(path +"/"+ item.file, 'utf8');
              }
              catch (error) {
                //throw error;
                throw new Error(path +"/"+ item.file +" - Unable to parse this file as text");
              }
          }
      }

      if (!asChild) {
        console.log(metadata);
        return metadata.items;
      }

      return metadata;

  }

  function extend(target, extender) {
    return merge(target, extender);
    // for (var i in extender) {
    //   if (isObject(target[i]) && isObject(extender[i])) {
    //     extend(target, extender);
    //   }
    //   else {
    //     target[i] = extender[i];
    //   }
    // }
  }

  function isObject(value) {
    return typeof(value) === "object";
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

  function prioritizeItems(items, priorities) {
    for (var i in items) {
      var item = items[i];


    }
  }


  fs.writeFileSync(resultPath, "export var metadata " + JSON.stringify({
    library: createMetadata("library", targetPath + "/library"),
    site: createMetadata("site", targetPath + "/site")
  }));
}

module.exports = run;

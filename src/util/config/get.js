var jsonfile = require("jsonfile"),
    merge = require("deepmerge"),
    path = require("path");

var userConfig, defaultConfig, defaultConfigPath;

try {
    //always lives in the directory where the command is run
    userConfig = jsonfile.readFileSync("./liberry.json");
} catch (exception) {
    //add prompt to create one?
    console.error("No 'liberry.json' configuration file was found.");
    userConfig = {
        liberry: {},
        project: {}
    };
}

var defaultConfig = jsonfile.readFileSync(__dirname + "/defaults.json");

if (userConfig.liberry.css) delete defaultConfig.liberry.css;
if (userConfig.project.css) delete defaultConfig.project.css;

var config = module.exports = merge(defaultConfig, userConfig);

//path formatting
config.liberry._root = path.resolve(config.liberry.root);
config.project._root = path.resolve(config.project.root);

//normalize css paths
normalizePaths(config.liberry, "css");
normalizePaths(config.project, "css");

//normalize watch globs
normalizePaths(config.liberry, "watch");
normalizePaths(config.project, "watch");

//metadata
config._sharedRoot = config.liberry._root === config.project._root;

//task formatting
normalizeTasks(config.liberry);
normalizeTasks(config.project);


function normalizeTasks(workspace) {    

    workspace._tasks = [];

    if (Array.isArray(workspace.tasks)) {
        for (var i in workspace.tasks) {
            formatTask(workspace.tasks[i], workspace._tasks);
        }
    }
    else {
        formatTask(workspace.tasks, workspace._tasks);
    }

    function formatTask(task, taskArray) {
        if (task && isString(task)) {
            taskArray.push({
                command: task,
                path: workspace._root
            });
        }
        else if (isObject(task) && task.command && isString(task.command)) {
            var path = (isString(task.path) && task.path) ? task.path : "./";
            taskArray.push({
                command: task.command || "",
                path: path.resolve(workspace._root, path)
            });
        }
        return undefined;
    }
}

function normalizePaths(workspace, property) {
    
    var outputArray = workspace["_" + property] = [];

    //format css
    if (isString(workspace[property])) {
        formatCss(workspace[property], outputArray);
    }
    else if (Array.isArray(workspace.css)) {
        for (var i in workspace[property]) {
            formatCss(workspace[property][i], outputArray);
        }
    }

    //if no css specified, produce a notice, prompt for one, etc.
    if (workspace[property].length === 0) {
        //TODO - prompt for css file location
    }

    function formatCss(filePath, outputArray) {
        if (filePath && isString(filePath)) {
            outputArray.push(path.resolve(workspace._root, filePath));
        }
    }
}


function isString(subject) {
    return typeof subject === "string";
}
function isObject(subject) {
    return typeof subject === "object";
}
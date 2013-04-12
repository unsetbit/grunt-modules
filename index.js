module.exports = function(grunt, modules){
    setupModules(grunt, modules, "");
};

function setupModules(grunt, modules, parentPath){
    var module,
        moduleName,
        moduleConfig,
        key;

    for(key in modules){
        if(modules.hasOwnProperty(key)){
            module = modules[key];
            moduleName = parentPath? parentPath + "." + key : key;
            
            if (typeof module === 'function') {
                moduleConfig = generateModuleConfig(moduleName, module(grunt, moduleName));
                deepExtend(grunt.config.data, moduleConfig);
            } else if(typeof module === 'object'){
                setupModules(grunt, module, moduleName);
            }
        }
    }
}

// Takes a config file of task to task config mappings,
// and adds them to the appropriate multitask using the
// exported module name as the task name.
function generateModuleConfig(moduleName, tasks){
    var moduleConfig = {},
        taskName,
        taskConfig,
        splitTaskName,
        subTaskName;

    for(taskName in tasks){
        if(tasks.hasOwnProperty(taskName)){
            taskConfig = tasks[taskName];
            splitTaskName = taskName.split("$"),
            taskName = splitTaskName[0],
            subTaskName = splitTaskName[1];

            moduleConfig[taskName] = moduleConfig[taskName] || {};

            // Multi tasks
            if(subTaskName){
                moduleConfig[taskName][moduleName + "$" + subTaskName] = taskConfig;
            } else {
                moduleConfig[taskName][moduleName] = taskConfig;
            }
        }
    }

    return moduleConfig;
}


/*!
 * Node.JS module "Deep Extend"
 * @version 0.2.5
 * @description Recursive object extending.
 * @author Viacheslav Lotsmanov (unclechu)
 */

/**
 * Extening object that entered in first argument.
 * Returns extended object or false if have no target object or incorrect type.
 * If you wish to clone object, simply use that:
 *  deepExtend({}, yourObj_1, [yourObj_N]) - first arg is new empty object
 */
function deepExtend(/*obj_1, [obj_2], [obj_N]*/) {
    if (arguments.length < 1 || typeof arguments[0] !== 'object') {
        return false;
    }

    if (arguments.length < 2) return arguments[0];

    var target = arguments[0];

    // convert arguments to array and cut off target object
    var args = Array.prototype.slice.call(arguments, 1);

    var key, val, src, clone;

    args.forEach(function (obj) {
        if (typeof obj !== 'object') return;

        for (key in obj) {
            if (obj[key] !== void 0) {
                src = target[key];
                val = obj[key];

                if (val === target) continue;

                if (typeof val !== 'object' || val === null) {
                    target[key] = val;
                    continue;
                }

                if (typeof src !== 'object') {
                    clone = (Array.isArray(val)) ? [] : {};
                    target[key] = deepExtend(clone, val);
                    continue;
                }

                if (Array.isArray(val)) {
                    clone = (Array.isArray(src)) ? src : [];
                } else {
                    clone = (!Array.isArray(src)) ? src : {};
                }

                target[key] = deepExtend(clone, val);
            }
        }
    });

    return target;
}
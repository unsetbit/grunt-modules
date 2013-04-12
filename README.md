# Grunt Modules

Grunt Modules allows you to split up your grunt file into modular pieces. It's very useful for managing large codebases.
We use it to manage the build system for a 400+ file application at [Turn](http://www.turn.com/platform) and it 
works like a charm.

In Grunt you define pieces of your modules within each multitask. Grunt Modules inverts the configuration
so that you can have your module define it's tasks instead, allowing you to put entire cross-sections of your
configuration in their own files.

## Use

1. `npm install grunt-modules`
2. Add `var gruntModules = require('grunt-modules');` to the top of your Gruntfile.js
3. Configure non-modular tasks in `grunt.initConfig({/* config */})` as usual 
4. Include your modules via the `gruntModules(grunt, modules)` function.

```javascript
var gruntModules = require('grunt-modules');
module.exports = function(grunt){
  grunt.initConfig({
    /* non-modular tasks */
  });

  gruntModules(grunt, {
    moduleName: require('./path/to/module.js'),
    anotherModuleName: require('./path/to/another/module.js')
    /* so on... */
  });
}
```

## For Example...
```javascript
// Gruntfile.js
var gruntModules = require('grunt-modules');
module.exports = function(grunt) {
  // A sample multitask which just echoes whatever 
	// configuration object is given to it
	grunt.registerMultiTask('echo', 'Echo back input', function(){
		grunt.log.writeln(this.data);
	});

	// Initialize the core config the standard way
	grunt.initConfig({
		echo: {
			inInitConfig: "I'm in init config!"
		}
	});

	// Extend the core config with a grunt module
	gruntModules(grunt, {
		aModule: require('./aModuleFile.js')
	});
};
```

```javascript
// aModuleFile.js
// A module defines a function which takes in the grunt object 
// and module name and returns a configuration object.
module.exports = function(grunt, moduleName){
  return {
    // We can pass the multitask anything that the multitask 
    // would accept for an individual task
    echo: "I'm in aModuleFile!", // will be transformed to echo:aModule
  }
};
```

```
// In the command line
$ grunt echo
Running "echo:inInitConfig" (echo) task
I'm in init config!

Running "echo:aModule" (echo) task
I'm in aModuleFile!
```

Grunt Modules takes the mapping between "aModule" and the function which produces the task map 
in "aModuleFile.js" and uses it to extend the grunt configuration. The end result is the same as
if we had used this file:

```javascript
// Gruntfile.js
module.exports = function(grunt) {
  grunt.registerMultiTask('echo', 'Echo back input', function(){
    grunt.log.writeln(this.data);
  });

  grunt.initConfig({
    echo: {
      inInitConfig: "I'm in init config!",
      aModule: "I'm in aModuleFile!"
    }
  });
```

## Modules
Modules are functions which take in a grunt object and the module name and return a configuration object.
The configuration object should have multitask names as the keys, and a task configuration as the value.

```javascript
// aModule.js
module.exports = function(grunt, moduleName){
  return {
    multiTaskName: {/*task config*/}
  }
}
```

**Multitasks don't behave as regular tasks in the module file configuration.** For example if we had a module named
"CaramelPopcorn":

```javascript
// CaramelPopcorn.js
// ...
  multiTaskName: {
    src: ['popcorn'],
    dest: 'caramel'
  }
// ...
```

It would have the same effect as if we had:
```javascript
// Gruntfile.js
// ...
  multiTaskName: {
    CaramelPopcorn: {
      src: ['popcorn'],
      dest: 'caramel'
    }
  }
// ...
```

If you want to create multiple tasks for a given multitask in a module, you can do so with the `$` convention. For exmaple:
```javascript
// aModule.js
// ...
  multiTaskName: {/*task config*/},
  multiTaskName$another: {/*task config*/}
// ...
```

Would have the same effect as:
```javascript
// Gruntfile.js
// ...
  multiTaskName: {
    aModule: {},
    aModule$another: {}
  }
// ...
```

## Nested Modules
A module can nest other modules within itself. This is done by exporting an object instead of a function.
When a module nests another module the **.** notation is used to define them in the Grunt configuration.

```javascript
// aModule.js
module.exports = {
  nestedModule: require('./path/to/nested/module.js'),
  anotherNestedModule: require('./path/to/another/nested/module.js')
}
```

```javascript
// Gruntfile.js
var gruntModules = require('grunt-modules');
module.exports = function(grunt) {
	grunt.registerMultiTask('echo', 'Echo back input', function(){
		grunt.log.writeln(this.data);
	});

	grunt.initConfig({/* core config */});

	// Extend the core config with a grunt module
	gruntModules(grunt, {
		aModule: require('./aModule.js')
	});
};
```

The core above will produce a grunt configuration that behaves the same as:

```javascript
// Gruntfile.js
module.exports = function(grunt) {
  grunt.initConfig({
    multiTaskName: {
      "aModule.nestedModule": {/*config*/},
      "aModule.anotherNestedModule": {/*config*/},
    }
  });

	// Extend the core config with a grunt module
	gruntModules(grunt, {
		aModule: require('./aModule.js')
	});
};
```

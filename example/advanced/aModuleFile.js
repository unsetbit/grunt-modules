// A module must define a function which takes in the grunt object 
// and module name and returns a configuration object. The tasks
// defined in the configuration object we'll be transfromed so that
// the "echo" task in the configuration we'll turn in to "echo:[moduleName]"
// in the actual grunt configuration.
module.exports = function(grunt, moduleName){
	// Registering a standard task called "popcorn", which will be an
	// alias for the echo task that's defined in this module.
	grunt.registerTask('popcorn', [
		'echo:' + moduleName
	]);

	// "echo" is a sample multitask
	return {
		// We can pass in anything that the multitask would accept
		echo: "I'm in aModuleFile!", // will be transformed to echo:aModule

		// Here, we're defining another task for the 'echo' multitask
		echo$another: "I'm also in aModuleFile!" // will be transformed to echo:aModule$another
	}
};
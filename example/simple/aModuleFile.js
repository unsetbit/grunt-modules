// A module must define a function which takes in the grunt object 
// and module name and returns a configuration object. The tasks
// defined in the configuration object we'll be transfromed so that
// the "echo" task in the configuration we'll turn in to "echo:[moduleName]"
// in the actual grunt configuration.
module.exports = function(grunt, moduleName){
	return {
		// We can pass the multitask anything that the multitask would accept
		// for an individual task
		echo: "I'm in aModuleFile!", // will be transformed to echo:aModule
	}
};
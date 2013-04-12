var gruntModules = require('../../');

module.exports = function(grunt) {
	// This is a sample multitask which just echoes whatever 
	// configuration object is given to it
	grunt.registerMultiTask('echo', 'Echo back input', function(){
		grunt.log.writeln(this.data);
	});
	grunt.registerTask('default', 'echo');

	// Initialize the core grunt config with an empty object
	grunt.initConfig({});

	gruntModules(grunt, {
		aModule: require('./aModuleFile.js'),
		nestedModules: require('./nestedModules.js')
	});
};
var gruntModules = require('../../');

module.exports = function(grunt) {
	// This is a sample multitask which just echoes whatever 
	// configuration object is given to it
	grunt.registerMultiTask('echo', 'Echo back input', function(){
		grunt.log.writeln(this.data);
	});
	grunt.registerTask('default', 'echo');

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
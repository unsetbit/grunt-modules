module.exports = function(grunt, moduleName){
	return {
		echo: "I'm in anotherNestedModule!" // will be transformed to echo:nestedModules.anotherNestedModule
	}
};
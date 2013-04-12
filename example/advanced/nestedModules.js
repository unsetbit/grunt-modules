// A module can be an object map of other modules
module.exports = {
	oneNestedModule: require('./nestedModules/oneNestedModule.js'),
	anotherNestedModule:  require('./nestedModules/anotherNestedModule.js')
};
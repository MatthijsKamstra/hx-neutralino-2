(function ($global) { "use strict";
var Main = function() {
	console.log("src/Main.hx:9:","Main");
	await new Promise(function(resolve,reject) {
		window.setTimeout(function() {
			resolve(10);
		},2000);
	});
};
Main.main = function() {
	new Main();
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
};
Main.main();
})({});

/**
 * Next
 * write async prog in a linear way
 *
 * Copyright (c) 2012 rhyzx
 * https://github.com/rhyzx
 * Licensed under the MIT license
 *
 * @example :
	$.next(function(next) {
		ajax(next);
	}).next(function(next, data) {
		ajax(next);
	}).next(function(next, data) {
		ajax(next);
	}).next(function(next, data) {
		//...
	});
 */
;(function nextAsync($) {
	"use strict";
	
	$ = $ || window; //bind on jQuery if exist
	$.next = next;
	
	/* implement by new Array */
	function next(firstFn) {
		var	fns		= [firstFn],
			index	= 0;
			
		var t = setTimeout(function() {
			(function exec() {
				var fn = fns[index++];
				Array.prototype.unshift.call(arguments, exec);
				fn.apply(this, arguments);
			})();
			
			clearTimeout(t);
		}, 0);
		
		var push = {
			next : function (fn) {
				fns.push(fn);
				return push;
			}
		};
		return push;
	}
	
	
	/* implement by modifying Function prototype *//*
	function next(firstFn) {
		var t = setTimeout(function() {
			var fn = {nextFn: firstFn};
			(function exec() {
				fn = fn.nextFn;
				Array.prototype.unshift.call(arguments, exec);
				fn.apply(this, arguments);
			})();
			
			clearTimeout(t);
		}, 0);
		return firstFn;
	}
	Function.prototype.next = function(fn) {
		this.nextFn = fn;
		return fn;
	};
	*/
})(jQuery);
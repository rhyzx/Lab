/**
 * Tiny Date Format
 * small little tiny mini macro...> <
 * 
 * Copyright (c) 2012 rhyzx
 * https://github.com/rhyzx
 * Licensed under the MIT license
 * 
 * @example : 
	(new Date()).format('yyyy-MM-dd');//2012-12-24
 */
;(function($) {
	"use strict";
	Date.prototype.format = function(pattern){return tinyDateFormat(this, pattern)}; //bind on Date class
	//$.formatDate = tinyDateFormat;
	
	var regex = /y+|M+|d+|h+|m+|s+/g;
	/**
	 * @param {Date}	date	: target to format
	 * @param {String}	pattern	: yyyy-MM-dd etc...
	 * @return {String}	: formated date string
	 */
	function tinyDateFormat(date, pattern) {
		var rs = {
			'y' : date.getFullYear(),
			'M' : date.getMonth()+1,
			'd' : date.getDate(),
			'h' : date.getHours(),
			'm' : date.getMinutes(),
			's' : date.getSeconds()
		};
		return pattern.replace(regex, function(x) {
			return ('00000000'+rs[x.charAt(0)]).slice(-x.length);//max leading 8 zero
		});
	};
})(window);
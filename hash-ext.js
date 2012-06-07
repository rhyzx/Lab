/**
 * HashChange Extension
 * onhashchange&hashchange history implemention for ie6/7
 *
 * Copyright (c) 2012 rhyzx
 * https://github.com/rhyzx
 * Licensed under the MIT license
 */
;(function hashChangeExtension() { //ie6/7
	"use strict";
	if('onhashchange' in window) return;
	window.onhashchange = function(){}; //default
	
	/* history manager */
	var his = (function() {
		var iframe = document.body.appendChild(document.createElement('iframe')),
			win = iframe.contentWindow;
			
		iframe.style.display = 'none';
		
		return {
			push : function(hash) {
				var doc = win.document;
				doc.open();
				doc.write('<html id="' +hash +'"/>');
				doc.close();
			},
			get : function() {
				return win.document.documentElement.id;
			}
		};
	})();
	
	var hash	= window.location.hash || '#';
	his.push(hash); //init history
	
	/* hashchange detector */
	setInterval(function() {
		if(his.get() != hash) { //history change
			hash = window.location.hash = his.get();
			
			//var evt = document.createEventObject();
			//evt.oldURL = '';
			//evt.newURL = '';
			window.onhashchange();
		} else if(hash != (window.location.hash || '#')) { //manual change
			hash = window.location.hash;
			his.push(hash);
			
			//var evt = document.createEventObject();
			//evt.oldURL = '';
			//evt.newURL = '';
			window.onhashchange();
		}
	}, 100); //10 times per second
})();
/**
 * drag event implemention for jQuery
 * @param start(startX, startY)
 * @param move(offsetX, offsetY)
 * @param end(offsetX, offsetY)
 */
;(function($) {
	"use strict";
	
	$.fn.drag = function(start, move, end) {
		var that = this.get(0);
	
		var x = 0,
			y = 0;
		
		this.mousedown(function(evt) {
			x = evt.clientX;
			y = evt.clientY;
			
			//bind on window for leak
			$(window).bind('mousemove', m).bind('mouseup', function fn(evt) {
				$(this).unbind('mousemove', m).unbind('mouseup', fn);
				
				if(end)
					return end.call(that, evt.clientX - x, evt.clientY - y);
			});
			
			if(start)
				return start.call(that, x, y);
		});
		
		function m(evt) {
			if(move)
				move.call(that, evt.clientX - x, evt.clientY - y);
		}
	};
})(jQuery);
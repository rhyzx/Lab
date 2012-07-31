/**
 * Draggable Box
 * @require jQuery
 * @require jQuery.Drag
 * @css
	.box {
		background: rgba(0,0,0,.4);			
		position: absolute;
	}
	.box .mover {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		cursor: move;
	}
	.box .sizer {
		width: 8px;
		height: 8px;
		position: absolute;
		bottom: 0;
		right: 0;
		cursor: se-resize;
	}
 * @example 
 *		new Box(100, 100, '.container');
 */
;(function($) {
	"use strict";
	
	$.Box = Box;
	function Box(x, y, container) {
		this.dom = this.dom.clone().css({left: x || 0, top: y || 0}).appendTo(container || 'body');
		this.addListener();
	}
	Box.prototype = {
		constructor		: Box
		,dom			: $(
		'<div class="box" style="left:0; top:0; width: 60px; height:60px;">\
			<div class="mover"></div>\
			<div class="sizer"></div>\
		</div>')
		,html			: $('#box-template').html()
		,addListener	: function() {
			var s = this.dom.get(0).style,
				that = this;
			//move
			var left, top;
			this.dom.find('.mover').drag(function() {
				left = parseFloat(s.left);
				top = parseFloat(s.top);
				
				return false;
			}, function(x, y) {
				s.left = left +x +'px';
				s.top = top +y +'px';
			});
			
			
			//change size
			var width, height;
			this.dom.find('.sizer').drag(function() {
				width = parseInt(s.width);
				height = parseInt(s.height);
				
				return false; //prevent default
			}, function(x, y) {		
				s.width = Math.max(width +x, 20) +'px';
				s.height = Math.max(height +y, 20) +'px';
			});
		}
	};
})(window);
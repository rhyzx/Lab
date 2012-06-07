/**
 * Ezy Class
 * easy way to create a class
 *
 * Copyright (c) 2012 rhyzx
 * https://github.com/rhyzx
 * Licensed under the MIT license
 *
 * @example :
	var Animal = $.class({
		init:function(name) {
			this.name = name;
		},
		say: function() {
			alert(this.name);
		}
	});
	var Cat = $.class.extend(Animal, {
	   jump:function() {
	       alert('jump ' +this.name);
	   }
	});
	var cat1 = new Cat('micheal');
	cat1.say();	//micheal
	cat1.jump(); //jump micheal
 */
;(function($) {
	"use strict";
	
	$ = $ || window; //bind on jQuery if exist
	$.Class = Class; //class是关键字所以只能用大写

	/**
	 * 创建类的方法
	 * 使用init方法进行构造(如果有的话)
	 * @param proto {Object}	: 类结构对象(原型)
	 * @return {Class}		: 目标类
	 */
	function Class(proto) {
		var clz = function() {
			this.init && this.init.apply(this, arguments);
		};
		proto.constructor = clz;
		clz.prototype = proto;
		return clz;
	}


	/**
	 * 继承方法
	 * 用于在目标类上创建子类
	 * 不适用于在现有类上继承目标类
	 * @param parent {Class}	: 父类
	 * @param child {Object}	: 子类结构
	 * @return {Class}			: 子类
	 */
	Class.extend = function(parent, child) {
		//创建一个父类的原型
		var tmp = function(){};
		tmp.prototype = parent.prototype;
		var proto = new tmp();

		var clz = Class(proto);	//继承父类结构

		for(var prop in child) { //覆盖子类结构
			proto[prop] = child[prop];
		}

		return clz;
	};
})(jQuery);
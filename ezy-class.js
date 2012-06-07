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
	$.Class = Class; //class�ǹؼ�������ֻ���ô�д

	/**
	 * ������ķ���
	 * ʹ��init�������й���(����еĻ�)
	 * @param proto {Object}	: ��ṹ����(ԭ��)
	 * @return {Class}		: Ŀ����
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
	 * �̳з���
	 * ������Ŀ�����ϴ�������
	 * �����������������ϼ̳�Ŀ����
	 * @param parent {Class}	: ����
	 * @param child {Object}	: ����ṹ
	 * @return {Class}			: ����
	 */
	Class.extend = function(parent, child) {
		//����һ�������ԭ��
		var tmp = function(){};
		tmp.prototype = parent.prototype;
		var proto = new tmp();

		var clz = Class(proto);	//�̳и���ṹ

		for(var prop in child) { //��������ṹ
			proto[prop] = child[prop];
		}

		return clz;
	};
})(jQuery);
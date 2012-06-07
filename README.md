Lab
=========

Ezy Class
---------
create class easily

	var Animal = Class({
		init:function(name) {
			this.name = name;
		},
		say: function() {
			alert(this.name);
		}
	});
	var Cat = Class.extend(Animal, {
		 jump:function() {
				 alert('jump ' +this.name);
		 }
	});
	var cat1 = new Cat('micheal');
	cat1.say();	//micheal
	cat1.jump(); //jump micheal
	
	
Tiny Date Format
----------------
	(new Date()).format('yyyy-MM-dd');//2012-12-24
	
Next Async
----------
write async program in linear way

	/* before */
	ajax(function(data) {
		ajax(function(data) {
			ajax(function(data) {
				//...
			});
		});
	});
	
	/* after */
	next(function(next) {
		ajax(next);
	}).next(function(next, data) {
		ajax(next);
	}).next(function(next, data) {
		ajax(next);
	}).next(function(next, data) {
		//...
	});
	
	
Hash Extension
--------------
onhashchange&hash history for ie6/7
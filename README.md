Lab
=========

Ezy Class
---------
create class easily
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
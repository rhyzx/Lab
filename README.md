WingZero
========

something little



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


/* test */
next(function(n) {
	setTimeout(n, 1000);
}).next(function(n) {
	setTimeout(function() {
		n('this is param1', 'this is param2');
	}, 2000);
}).next(function(n, p1, p2) {
	alert(p1);
	alert(p2);
	
	n(); 
}).next(function(n) {
	//n(); //n is undefined there
});

/* implement by Array */
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
		};
	};
	return push;
}

/* implement by modify Function prototype */
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
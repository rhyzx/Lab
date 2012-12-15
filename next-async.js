/*!
 * Next Async
 * write async prog in a linear way
 *
 * Copyright (c) 2012 rhyzx
 * https://github.com/rhyzx/Lab/blob/master/next-async.js
 * Licensed under the MIT license
 *
 * @example :
 *      next(function(v, next) {
 *          console.log(v); //log 1
 *          next(2, 3);
 *      }).next(function(a, b, next) {
 *          console.log(a+b); //log 5
 *          ajax(next); //set ajax callback
 *      }).next(function(data, next) {
 *          //do something...
 *      })(1);//start
 */
;(function ($, undefined) {
    "use strict";

    //bind global
    $.next = next;

    //main
    function next(fn) {
        var first = createNext(fn)
          , last  = first;

        function executor() {
            first.apply(this, arguments);
        }

        //only expose executor
        //neither midify nor expose fisrt
        executor.next = function (fn) {
            last.next = last = createNext(fn);
            return this;
        };

        return executor;
    }

    //ceate a new Next object(also is function)
    function createNext(fn) {
        return function Next() {
            Array.prototype.push.call(arguments, Next.next);
            fn.apply(this, arguments);
        };
    }
})(window.jQuery || window);
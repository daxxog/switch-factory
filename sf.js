/* switch-factory
 * Functions that build switch functions.
 * (c) 2013 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

/* UMD LOADER: https://github.com/umdjs/umd/blob/master/returnExports.js */
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.sf = factory();
    }
}(this, function() {
    var allow = function(_valid) { //inline str-allow
        var valid = _valid;
        return function(str) {
            var _valid = '';
            
            str.split('').forEach(function(v, i, a) {
                if(valid.indexOf(v) !== -1) {
                    _valid += v;
                }
            });
            
            return _valid;
        };
    };
    
    var filterStr = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890 {}[];:/,.<>()!@#$%^&*~`|_+=-"',
        numbersOnlyStr = '1234567890';
    
    var filter = allow(filterStr),
        numbersOnly = allow(numbersOnlyStr);
    
    var sf = {
        is: function(list) {
            var f,
                fx = 'f = function(s){switch(s.length){',
                byLen = {},
                err = false;
            
            if(Array.isArray(list) && list.length > 0) {
                list.forEach(function(v, i, a) {
                    if(typeof v == 'string') {
                        var _len = numbersOnly(v.length.toString());
                        
                        if(typeof byLen[_len] == 'undefined') {
                            byLen[_len] = [];
                        }
                    
                        byLen[_len].push(filter(v));
                    } else {
                        err = 'Non string element detected!';
                    }
                });
            } else {
                err = 'Argument is not a non empty Array!';
            }
            
            if(err !== false) {
                throw err;
            }
            
            for(var i in byLen) {
                var v = byLen[i];
                
                fx += 'case ' + i + ':switch(s){';
                
                v.forEach(function(v, i, a) {
                    fx += 'case \'' + v + '\':';
                });
                
                fx += 'return true;}return false;';
            }
            
            fx += 'default:return false;}}';
            
            eval(fx);
            return f;
        },
        run: function(idx, fu) {
            var fx = fu[idx],
                _default = fu['default'];
            
            if(typeof fx == 'function') {
                return fx(idx);
            } else if(typeof _default == 'function') {
                return _default(idx);
            } else {
                return;
            }
        },
        allow: function(_valid) { //faster str-allow with switches
            var valid = sf.is(_valid.split(''));
            
            return function(str) {
                var _valid = '';
                
                str.split('').forEach(function(v, i, a) {
                    if(valid(v)) {
                        _valid += v;
                    }
                });
                
                return _valid;
            };
        }
    };
    
    //bootstrap filters
    filter = sf.allow(filterStr);
    numbersOnly = sf.allow(numbersOnlyStr);
    
    return sf;
}));
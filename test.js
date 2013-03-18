var sf = require('./sf.js'),
    allow = require('str-allow'),
    stoptime = require('stoptime');

var isDuck = sf.is(['quack', 'swim', 'flap']),
    filter = allow('1234567890'),
    filterFast = sf.allow('1234567890'),
    duckDebug = function(what) {
        what.split(' ').forEach(function(v, i, a) {
            console.log(v, isDuck(v));
        });
    };

Array.prototype.avg = function() {
    var av = 0;
    var cnt = 0;
    var len = this.length;
    for (var i = 0; i < len; i++) {
        var e = +this[i];
        if (!e && this[i] !== 0 && this[i] !== '0') e--;
        if (this[i] == e) {
            av += e;
            cnt++;
        }
    }
    return av / cnt;
};

/* TESTS */
'pro duck hunter'.split(' ').forEach(function(v, i, a) {
    sf.run(v, {
        duck: function() {
            duckDebug('quack swim flap');
        },
        hunter: function() {
            duckDebug('ready aim fire');
        },
        default: function() {
            console.log(isDuck.toString());
        }
    });
});

/* BENCHMARKS */
var _benchMark = function(filter, k) {
    var bench = stoptime();
    
    for(var i=0; i<k; i++) {
        for(var j=0; j<k; j++) {
            filter('a'+i+'bc'+j);
        }
    }
    
    return bench.elapsed();
};

var benchMark = function(k) {
    var x = _benchMark(filter, k),
        y = _benchMark(filterFast, k),
        gte = (x>y) ? '>' : '<';
    
    console.log(x, gte, y);
    
    return ((x/y) - 1) * 100;
};

var bmData = [];
for(var i = 500; i<520; i++) {
    bmData.push(benchMark(i));
}

console.log('switch-factory is ' + bmData.avg() + '% faster than str-allow');
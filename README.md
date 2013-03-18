switch-factory
==============
Functions that build switch functions.

Install
-------
stable
```bash
npm install switch-factory
```
edge
```bash
npm install https://github.com/daxxog/switch-factory/tarball/master
```

Usage
========

sf.is(list)
----------
Takes a list of string values to check for and returns a switch function that checks for them.

Arguments: 
* **list** *Array*

Returns:
* *Function*( **val** *String* )

sf.allow(safe)
----------
Takes a safe string and returns a function that filters out everything except safe charecters.

Arguments: 
* **safe** *String*

Returns:
* *Function* ( **unsafe** *String* )

sf.run(what, functions)
----------
Runs a function from a hash. Similar to switch, but with a different syntax.

Arguments: 
* **what** *Hash*
* **functions** *HashTable* ( *Function* ( **hash** *Hash* ))

Returns:
* *Mixed* **functionReturnVal**

Example:
```javascript
    sf.run('noexist', {
        "hash": function() {}
        "default": function(hash) {
            console.log('Could not find hash: ' + hash);
        }
    });
```

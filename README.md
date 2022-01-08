# Dict.js 

Dict.js is a JavaScript library for nodeJS and browser. Dict.js extends JavaScript Map. The library is heavily inspired and influenced by F# Map module.

## Documentation

Please go to [Dict APIs](/api.docs/dict.api.md) to read more.

## Installation

```javascript
npm install @nyinyithann/dict.js
```

## Getting started

`Dict` extends `Map`. All built-in methods of `Map` can be used with `Dict`. And `Dict.js` provides additional methods.
```javascript
const diatonicMajorInC = new Dict(
  [
    [1, ['C', 'do']],
    [2, ['D', 're']],
    [3, ['E', 'mi']],
    [4, ['F', 'fa']],
    [5, ['G', 'so']],
    [6, ['A', 'la']],
    [7, ['B', 'ti']]
  ]
);
const twinkelLittleStarNotes = new Vec(1, 1, 5, 5, 6, 6, 5);
const solfeges = diatonicMajorInC.fold((s, k, [_, solfege]) => twinkelLittleStarNotes.includes(k) ? `${s}${solfege} ` : s, '');
console.log(solfeges)
// => do so la
```

`Dict` has the following methods.

#### Static Methods

```
of
empty
```

#### Instance Methods

```
change
exists
filter
findKey
fold
foldRight
every
map
partition
isEmpty
toArray
toSet
```

### Author

Nyi Nyi Than - [@nyinyithann](https://www.linkedin.com/in/nyinyithan/)

### Credit

- [F# Collections](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-collections.html)

- [Exploring ES6](https://exploringjs.com/es6.html) By [Dr. Axel Rauschmayer](https://2ality.com/p/about.html)
- [Understanding ECMAScript 6](https://leanpub.com/understandinges6) By [Nicholas C. Zakas](https://humanwhocodes.com/)
- [Collection Pipeline](https://martinfowler.com/articles/collection-pipeline/)
  by [Martin Fowler](https://martinfowler.com/)
- [javascript.info](https://javascript.info/)

### License

MIT

  <h1> Dict APIs </h1>
<hr/>
<h3> change(keyMapping, valueMpping) ⇒ Dict </h3>
Returns a new map with the value come out of valueMapping. The value is associated with the key come out of keyMapping.

**Returns**: <code>Dict</code> - The result Dict.  
**Throws**:

- <code>TypeError</code> When keyMapping is not a function or a generator function. Or valueMapping is not a function or a generator function.


| Param | Type | Description |
| --- | --- | --- |
| keyMapping | <code>function</code> | The function to get key. |
| valueMpping | <code>function</code> | The function to get value. |

**Example**  
```js
const dict_1 = new Dict(
   [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
);
const resultDict_1 = dict_1.change(k => k === 3, v => "tría");
console.dir(resultDict_1);
// => [Dict] { 1 => 'one', 2 => 'two', 3 => 'tría', 4 => 'four' }
```
<h3> Dict </h3>
Dict extends Map and has all the methods of Map.

<h3> Dict.empty() ⇒ Dict </h3>
Create an empty Dict.

**Returns**: <code>Dict</code> - The empty Dict.  
**Example**  
```js
const dict = Dict.empty();
```
<h3> every(predicate) ⇒ Dict </h3>
Returns true if the given predicate returns true for all of the bindings in the dict.

**Returns**: <code>boolean</code> - True if the predicate evaluates to true for all of the key/value pairs in the Dict.  
**Throws**:

- <code>TypeError</code> when predicate is not a function or a generator function.


| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>function</code> | The function to test the input elements. |

**Example**  
```js
const dict_2 = new Dict(
   [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
);
const allValueHasLengthOf2 = dict_2.every((k, v) => v.length > 2);
console.log(allValueHasLengthOf2);
// => true
```
<h3> exists(predicate) ⇒ Dict </h3>
Returns true if the given predicate returns true for one of the bindings in the Dict.

**Returns**: <code>boolean</code> - True if the predicate returns true for one of the key/value paris.  
**Throws**:

- <code>TypeError</code> when predicate is not a function or a generator function.


| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>function</code> | The function to test the input elements. |

**Example**  
```js
const dict_3 = new Dict(
   [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
);
const hasValueWithLengthOf5 = dict_3.exists((k, v) => v.length === 5);
console.log(hasValueWithLengthOf5);
// => true
```
<h3> filter(predicate) ⇒ Dict </h3>
Builds a new dict containing only the bindings for which the given predicate returns 'true'.

**Returns**: <code>Dict</code> - The filtered dict.  
**Throws**:

- <code>TypeError</code> when predicate is not a function or a generator function.


| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>function</code> | The function to test the key/value pairs. |

**Example**  
```js
const dict_4 = new Dict(
   [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
);
const filtered = dict_4.filter((k, v) => k > 1 && v.length > 3);
console.log(filtered);
// => [Dict] { 3 => 'three', 4 => 'four' }
```
<h3> findKey(predicate) ⇒ key|undefined </h3>
Evaluates the function on each mapping in the collection.
Returns the key for the first mapping where the function returns 'true'.

**Returns**: <code>key</code> \| <code>undefined</code> - The first key for which the predicate evaluates true or undefined if key is not found.  

| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>function</code> | The function to test the input elements. |

**Example**  
```js
const dict_5 = new Dict(
   [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
);
const keyFound = dict_5.findKey((k, v) => v === "four");
console.log(keyFound);
// => 4
```
<h3> fold(folder, state) ⇒ value </h3>
Folds over the bindings in the dict.

**Returns**: <code>\*</code> - The final state value.  
**Throws**:

- <code>TypeError</code> when state is null or undefined. Or folder is not a function. Or folder is a generator function.


| Param | Type | Description |
| --- | --- | --- |
| folder | <code>function</code> | The function to update the state given the input key/value pairs. |
| state | <code>\*</code> | The initial state. |

**Example**  
```js
const dict_6 = new Dict(
   [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
);
const state = dict_6.fold((s, k, v) => `${s}{${k} -> ${v}}\n`, '');
console.log(state);
// =>
// {1 -> one}
// {2 -> two}
// {3 -> three}
// {4 -> four}
```
<h3> foldRight(folder, state) ⇒ value </h3>
Folds over the bindings in the map.

**Returns**: <code>\*</code> - The final state value.  
**Throws**:

- <code>TypeError</code> when state is null or undefined. Or folder is not a function. Or folder is a generator function.


| Param | Type | Description |
| --- | --- | --- |
| folder | <code>function</code> | The function to update the state given the input key/value pairs. |
| state | <code>\*</code> | The initial state |

**Example**  
```js
const dict_7 = new Dict(
   [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
);
const finalState = dict_7.foldRight((k, v, s) => `${s}{${k} -> ${v}}\n`, '');
console.log(finalState);
// =>
// {4 -> four}
// {3 -> three}
// {2 -> two}
// {1 -> one}
```
<h3> isEmpty() ⇒ boolean </h3>
Check if the map is empty.

**Returns**: <code>boolean</code> - True if the map is empty.  
**Example**  
```js
const dict = new Dict();
console.log(dict.isEmpty());
// => true
```
<h3> map(mapping) ⇒ Dict </h3>
Builds a new dict whose elements are the results of applying the given function to each of the elements of the dict.
The key passed to the function indicates the key of element being transformed.

**Returns**: <code>Dict</code> - The resulting dict of keys and transformed values.  
**Throws**:

- <code>TypeError</code> When mapping is not a function or a generator function.


| Param | Type | Description |
| --- | --- | --- |
| mapping | <code>function</code> | The function to transform the key/value pairs. |

**Example**  
```js
const dict_8 = new Dict(
     [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
);
const mappedResult = dict_8.map((k, v) => k % 2 === 0 ? "even" : "odd");
console.log(mappedResult);
// => [Dict] { 1 => 'odd', 2 => 'even', 3 => 'odd', 4 => 'even' }
```
<h3> Dict.of() ⇒ Dict </h3>
Creates a new dict from a variable number of key/value pair arguments.

**Returns**: <code>Dict</code> - A newly created dict.  
**Example**  
```js
const newDict = Dict.of(
   ['Key1', 100], ['key2', 200], ['key3', 300]
);
console.log(newDict);
// => [Dict] { 'Key1' => 100, 'key2' => 200, 'key3' => 300 }
```
<h3> partition(predicate) ⇒ Array </h3>
Builds two new dicts, one containing the bindings for which the given predicate returns 'true',
and the other the remaining bindings.

**Returns**: <code>Array</code> - An array containing two dicts.  
**Throws**:

- <code>TypeError</code> when predicate is not a function or a generator function.


| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>function</code> | The function to test the input elements. |

**Example**  
```js
const dict_9 = new Dict(
   [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
);
const partitioned = dict_9.partition((k, v) => k < 3);
console.log(partitioned);
// =>
//   [
//     [Dict] { 1 => 'one', 2 => 'two' },
//     [Dict] { 3 => 'three', 4 => 'four' }
//   ]
```
<h3> toArray() ⇒ Array </h3>
Returns an array of all key-value pairs in the mapping. The array will be ordered by the keys of the dict.

**Returns**: <code>Array</code> - The result array.  
**Example**  
```js
const dict_10 = new Dict(
   [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
);
const array = dict_10.toArray();
console.log(array);
// => [ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ], [ 4, 'four' ] ]
```
<h3> toSet() ⇒ Set </h3>
Returns a set of all key-value pairs in the mapping. The set will be ordered by the keys of the map.

**Returns**: <code>Set</code> - The result set.  
**Example**  
```js
const dict_11 = new Dict(
   [[1, "one"], [2, "two"], [3, "three"], [4, "four"]]
);
const set = dict_11.toArray();
console.log(set);
// => [ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ], [ 4, 'four' ] ]
```

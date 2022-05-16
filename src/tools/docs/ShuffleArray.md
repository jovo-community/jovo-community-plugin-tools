# Shuffle Array

## Overview
Shuffle Array allows you to shuffle any array and then access each item before reshuffling and starting over.

## Usage

### Summary
The following methods can be accessed in handlers with `this.$jcTools.shuffleArray`:

```ts
getNextItem(key: string, array: unknown[], reset = false): unknown
getNextIndex(key: string, length: number, reset = false): number
clear(key: string): void

getEntry(key: string): ShuffleArrayEntry
setEntry(key: string, entry: ShuffleArrayEntry | undefined): void
```

### Get the Next Item
The easiest way to use the Shuffle Array is with `getNextItem()` passing a `key` parameter which will be used to store the indexes in user data storage. Multiple keys allow you to shuffle multiple arrays.

handler.js:
```js
const values = ['A', 'B', 'C', 'D', 'E'];
const value = this.$jcTools.shuffleArray.getNextItem('letters', values);

// if stored entry for 'letters' is:
//   "indexes": [3, 1, 2, 0, 4],
//   "index": 3
// then value is: 'A'
```

handler.ts:
```ts
const values: string[] = ['A', 'B', 'C', 'D', 'E'];
const value = this.$jcTools.shuffleArray.getNextItem('letters', values);

// if stored entry for 'letters' is:
//   "indexes": [3, 1, 2, 0, 4],
//   "index": 3
// then value is: 'A'
```

Each time `getNextItem()` is called, you will get a different item in the list. When all items have been accessed, the indexes are shuffled again and the current index starts back at the start.

NOTE: The array passed to `getNextItem()` is not stored in `$user.data` only a shuffled list of indexes based on the length of the `array` parameter.


### Get the Next Index
You can also use `getNextIndex()` passing a `key` parameter which will be used to store the indexes in user data storage.

handler.js:
```js
const values = ['A', 'B', 'C', 'D', 'E'];
const index = this.$jcTools.shuffleArray.getNextIndex('letters', values.length);
const value = values[index];

// if stored entry for 'letters' is:
//   "indexes": [3, 1, 2, 0, 4],
//   "index": 3
// then index is: 0
// and value is: 'A'
```

handler.ts:
```ts
const values: string[] = ['A', 'B', 'C', 'D', 'E'];
const index = this.$jcTools.shuffleArray.getNextIndex('letters', values.length);
const value = values[index];

// if stored entry for 'letters' is:
//   "indexes": [3, 1, 2, 0, 4],
//   "index": 3
// then index is: 0
// and value is: 'A'
```

Each time `getNextIndex()` is called, you will get a different index in the list. When all indexes have been accessed, they are shuffled again and the current index starts back at the start.


### Reshuffling
The Shuffle Array automatically reshuffles and sets the index back to the start:
- The first time that `getNextIndex()` or `getNextItem()` is called.
- The next call to `getNextIndex()` or `getNextItem()` after the current list of `indexes` have all been accessed.
- The next call to `getNextIndex()` or `getNextItem()` after `clear()` is called.
- When `getNextIndex()` or `getNextItem()` is called with the `reset` parameter set to `true`.
- When the `length` parameter passed to `getNextIndex()` is smaller than the current length of `indexes`.
- When the length of the `array` parameter passed to `getNextItem()` is smaller than the current length of `indexes`.


### Get and Set Entry
Normally you will not need to access the entries stored for each key in `this.$user.data.jcTools.shuffleArray`. If you do, the better approach is to use `getEntry(key)` or `setEntry(key, entry)`.


## User Data Store
The shuffled array of `indexes` as well as the `index` for the current item are stored in user data storage so it is persisted for a user across multiple sessions. Multiple arrays can be tracked separately using different keys.

To configure a Database Integration, follow the instructions [here](https://www.jovo.tech/docs/databases).

Here is an example of how values are stored in  `this.$user.data`:

```json
{
  "jcTools": {
    "shuffleArray": {
      "letters": {
        "indexes": [3, 1, 2, 0, 4],
        "index": 3
      },
      "quotes": {
        "indexes": [0, 1, 9, 6, 5, 2, 8, 3, 7, 4],
        "index": 6
      }
    }
  }
}
```


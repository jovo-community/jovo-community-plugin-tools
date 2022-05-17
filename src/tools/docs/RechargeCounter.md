# Recharge Counter

## Overview
Recharge Counter allows you to set a max number of times a counter can be used. Each use must recharge for a set number of minutes before it can be used again.

Uses:
- rechargeable game actions
- periodic notices
- occassional reminder prompts
- upsell prompts

## Usage

### Summary
The following methods can be accessed in handlers with `this.$jcTools.rechargeCounter`:

```ts
setMax(key: string, max: number): void
setRechargeMinutes(key: string, minutes: number): void
getCount(key: string): number
subtract(key: string): boolean
getNextRechargeInMinutes(key: string): number
reset(key: string): void

getEntry(key: string): RechargeCounterEntry
setEntry(key: string, entry: RechargeCounterEntry | undefined): void
```

### Set Max, Count & Recharge Minutes
Call `setMax()` to set the maximum count value for the specified `key`. This is the max number of entries to be tracked and that can be used before they must recharge. Calling `getCount()` tells you how many times the counter can be used and will update as the counter recharges.

Call `setRechargeMinutes()` to set the time the counter will take each entry to recharge. This value is in minutes.

Setting either `max` or `rechargeMinutes` does not affect the values in the `times` array with the exception that recharged entries are removed so the counter slot is available again.

handler.js / handler.ts:
```js
const MINUTES_15 = 15;
const HOURS_1 = 60;
const DAYS_2 = 60 * 24 * 2;
const DAYS_15 = 60 * 24 * 15;

this.$jcTools.rechargeCounter.setMax('action', 3);
this.$jcTools.rechargeCounter.setRechargeMinutes('action', HOURS_1);

const count = this.$jcTools.rechargeCounter.getCount('action');
// count: 3
```

### Subtract
Call `subtract()` to decrement the counter. If the `getCount()` value was greater than 0, the return value for `subtract()` would be `true` to let you know the counter actually decremented. If the count was 0, the return value would be `false` meaning there were no more count to decrement.

Every time `subtract()` is called, a new entry is added to the `times` array for the `key`. Values are removed from `times` when they are older than `rechargeMinutes` which increments the counter.

The recharge time for each entry starts at the time that it was added to the `times` array which is when `subtract()` was called.

handler.js / handler.ts:
```js
let isDecremented;

this.$jcTools.rechargeCounter.setMax('action', 3);
// getCount('action'): 3

isDecremented = this.$jcTools.rechargeCounter.subtract('action');
// isDecremented: true
// getCount('action'): 2

isDecremented = this.$jcTools.rechargeCounter.subtract('action');
// isDecremented: true
// getCount('action'): 1

isDecremented = this.$jcTools.rechargeCounter.subtract('action');
// isDecremented: true
// getCount('action'): 0

isDecremented = this.$jcTools.rechargeCounter.subtract('action');
// isDecremented: false
// getCount('action'): 0
```

### Get Next Recharge
To know how many minutes are remaining until the counter is recharged to have at least one available count, call `getNextRechargeInMinutes()`. This value can be used to inform the user when the counter can be used again. If `getCount()` is greater than 0, then `getNextRechargeInMinutes()` will return 0 indicating that the counter can be used immediately.

handler.js / handler.ts:
```js
const DAYS_2 = 60 * 24 * 2;
let minutes

this.$jcTools.rechargeCounter.setMax('upsell', 1);
this.$jcTools.rechargeCounter.setRechargeMinutes('upsell', DAYS_2);
// getCount('upsell'): 1

minutes = this.$jcTools.rechargeCounter.getNextRechargeInMinutes('upsell');
// minutes: 0

const isDecremented = this.$jcTools.rechargeCounter.subtract('upsell');
// isDecremented: true
// getCount('upsell'): 0

minutes = this.$jcTools.rechargeCounter.getNextRechargeInMinutes('upsell');
// minutes: 2880
```

### Reset
Calling `reset()` for a specific `key` will reset the `times` array back to an empty array.

handler.js / handler.ts:
```js

// if stored entry for 'action' is:
//   "times": [number, number, number]

this.$jcTools.rechargeCounter.reset('action');

// then stored entry for 'action' is reset:
//   "times": []
```

### Get and Set Entry
Normally you will not need to access the entries stored for each key in `this.$user.data.jcTools.rechargeCounter`. If you do, the better approach is to use `getEntry(key)` or `setEntry(key, entry)`.


## User Data Store
The `max` value for the counter is the number of times that `subtract()` can be called before the counter must recharge. Each call to `subtract()` adds an entry to the `times` array. The `rechargeMinutes` value is the number of minutes that an entry in the `times` array will take up a slot before it is removed. The numbers stored in the `times` array are based on the number of minutes since epoch of January 1, 1970, UTC.
 
The values stored in user data storage are persisted for a user across multiple sessions. Multiple counters can be tracked separately using different keys.

To configure a Database Integration, follow the instructions [here](https://www.jovo.tech/docs/databases).

Here is an example of how values are stored in `this.$user.data`:

```json
{
  "jcTools": {
    "rechargeCounter": {
      "action": {
        "max": 3,
        "times": [27545940, 27545945, 27545950], // minutes since January 1, 1970, UTC
        "rechargeMinutes": 15
      }
    }
  }
}
```


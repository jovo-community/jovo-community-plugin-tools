# Streak Counter

## Overview
Streak Counter allows you to count the number of continuous days something happens. 

You can add one Streak Counter in the LAUNCH handler and another for a certain action in a game.

Uses:
- game play streaks
- correct answer streaks
- positive feedback for daily use

## Usage

### Summary
The following methods can be accessed in handlers with `this.$jcTools.streakCounter`:

```ts
getCount(key: string): number
reset(key: string): void

getEntry(key: string): StreakCounterEntry
setEntry(key: string, entry: StreakCounterEntry | undefined): void
```

### Get Count
Calling `getCount()` will return the number of days in the streak for the specified `key`. The streak count is only changed when `getCount()` or `reset()` are called.

Getting the count multiple times during a given day will return the current streak count. A day is determined by 00:00 UTC time.

When `getCount()` is called and the stored `lastDay` value is yesterday, the `count` increments by 1 and the `lastDay` value is set to today.

When the difference between today and the stored `lastDay` is greater than 1, then the streak counter resets back to 1. 

The minimum value for a streak is 1.

handler.js / handler.ts:
```js
const value = this.$jcTools.streakCounter.getCount('launch');

// if stored entry for 'launch' is:
//   "count": 21,
//   "lastDay": number (today)
// then value is: 21

// if stored entry for 'launch' is:
//   "count": 21,
//   "lastDay": number (yesterday)
// then value is: 22

// if stored entry for 'launch' is:
//   "count": 21,
//   "lastDay": number (older than yesterday)
// then value is: 1
```

### Reset
Calling `reset()` for a specific `key` will reset the `count` back to 1 and set `lastDay` to today.

handler.js / handler.ts:
```js
this.$jcTools.streakCounter.reset('launch');

// stored entry for 'launch' is set to:
//   "count": 1,
//   "lastDay": number (today)
```

### Get and Set Entry
Normally you will not need to access the entries stored for each key in `this.$user.data.jcTools.streakCounter`. If you do, the better approach is to use `getEntry(key)` or `setEntry(key, entry)`.


## User Data Store
The `count` of the streak as well as the `lastDay` the streak was checked (stored as days since epoch of January 1, 1970, UTC) are stored in user data storage so it is persisted for a user across multiple sessions. Multiple streaks can be tracked separately using different keys.

To configure a Database Integration, follow the instructions [here](https://www.jovo.tech/docs/databases).

Here is an example of how values are stored in `this.$user.data`:

```json
{
  "jcTools": {
    "streakCounter": {
      "launch": {
        "count": 21, // streak 21 days
        "lastDay": 19128 // days since January 1, 1970, UTC
      }
    }
  }
}
```


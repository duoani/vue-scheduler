# Breaking changes in v1.x.x

## value
Now, for sunday, value is `0`.

```javascript
// v1.x.x
{
  "1": [...], // Mon
  "2": [...], // Tue
  "3": [...], // Wed
  "4": [...], // Thu
  "5": [...], // Fri
  "6": [...], // Sat
  "7": [...]  // Sun <==
}

// 2.0.0
{
  "0": [...], // Sun <==
  "1": [...], // Mon
  "2": [...], // Tue
  "3": [...], // Wed
  "4": [...], // Thu
  "5": [...], // Fri
  "6": [...]  // Sat
}
```
## locale object
Some rearrangements in `WEEK_DAYS`, making Sunday to be index 0.

```javascript
// v1.x.x
{
  AM: 'AM',
  PM: 'PM',
  TIME_TITLE: 'TIME',
  WEEK_TITLE: 'DAY',
  WEEK_DAYS: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'], // <==
  ...
}

// 2.0.0
{
  AM: 'AM',
  PM: 'PM',
  TIME_TITLE: 'TIME',
  WEEK_TITLE: 'DAY',
  WEEK_DAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // <==
  ...
}
```



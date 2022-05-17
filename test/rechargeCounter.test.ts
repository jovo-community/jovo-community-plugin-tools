import { TestSuite, InputType } from '@jovotech/framework';
import { min } from 'lodash';
import { JovoCommunityTools } from '../src/JovoCommunityTools';
import { app } from './testApp/app';

const testSuite = new TestSuite({ app });

describe('rechargeCounter', () => {
  beforeEach(async () => {
    await testSuite.run({ type: InputType.Launch });
  });

  test('setMax() should set max value', async () => {
    const root = testSuite?.$jcTools as JovoCommunityTools;
    const key = 'test';
    const max = 3;
    const beforeEntry = root.rechargeCounter.getEntry(key);
    expect(beforeEntry).not.toBeDefined();

    root.rechargeCounter.setMax(key, max);

    const afterEntry = root.rechargeCounter.getEntry(key);
    expect(afterEntry.max).toBe(max);

    expect(testSuite.$user.data?.jcTools?.rechargeCounter[key]).toBeDefined();
    expect(testSuite.$user.data?.jcTools?.rechargeCounter[key]).toBe(afterEntry);
  });

  test('setRechargeMinutes() should set rechargeMinutes', async () => {
    const root = testSuite?.$jcTools as JovoCommunityTools;
    const key = 'test';
    const minutes = 5;
    const beforeEntry = root.rechargeCounter.getEntry(key);
    expect(beforeEntry).not.toBeDefined();

    root.rechargeCounter.setRechargeMinutes(key, minutes);

    const afterEntry = root.rechargeCounter.getEntry(key);
    expect(afterEntry.rechargeMinutes).toBe(minutes);

    expect(testSuite.$user.data?.jcTools?.rechargeCounter[key]).toBeDefined();
    expect(testSuite.$user.data?.jcTools?.rechargeCounter[key]).toBe(afterEntry);
  });

  test('reset() should empty times array', async () => {
    const root = testSuite?.$jcTools as JovoCommunityTools;
    const key = 'test';
    root.rechargeCounter.setEntry(key, {max: 3, rechargeMinutes: 5, times: [1, 2, 3]});

    root.rechargeCounter.reset(key);

    const afterEntry = root.rechargeCounter.getEntry(key);
    expect(afterEntry.times.length).toBe(0);

    expect(testSuite.$user.data?.jcTools?.rechargeCounter[key]).toBeDefined();
    expect(testSuite.$user.data?.jcTools?.rechargeCounter[key]).toBe(afterEntry);
  });

  test('setMax() should empty times array', async () => {
    const root = testSuite?.$jcTools as JovoCommunityTools;
    const key = 'test';
    root.rechargeCounter.setEntry(key, {max: 3, rechargeMinutes: 5, times: [1, 2, 3]});

    root.rechargeCounter.setMax(key, 1);

    const afterEntry = root.rechargeCounter.getEntry(key);
    expect(afterEntry.times.length).toBe(0);

    expect(testSuite.$user.data?.jcTools?.rechargeCounter[key]).toBeDefined();
    expect(testSuite.$user.data?.jcTools?.rechargeCounter[key]).toBe(afterEntry);
  });

  test('getCount() should empty times array', async () => {
    const root = testSuite?.$jcTools as JovoCommunityTools;
    const key = 'test';
    const max = 3;
    root.rechargeCounter.setEntry(key, {max: max, rechargeMinutes: 5, times: [1, 2, 3]});

    const value = root.rechargeCounter.getCount(key);
    expect(value).toBe(max);

    const afterEntry = root.rechargeCounter.getEntry(key);
    expect(afterEntry.times.length).toBe(0);

    expect(testSuite.$user.data?.jcTools?.rechargeCounter[key]).toBeDefined();
    expect(testSuite.$user.data?.jcTools?.rechargeCounter[key]).toBe(afterEntry);
  });

  test('subtract() should empty times array', async () => {
    const root = testSuite?.$jcTools as JovoCommunityTools;
    const key = 'test';
    const max = 3;
    root.rechargeCounter.setEntry(key, {max: max, rechargeMinutes: 5, times: [1, 2, 3]});

    const value = root.rechargeCounter.subtract(key);
    expect(value).toBe(true);

    const afterEntry = root.rechargeCounter.getEntry(key);
    expect(afterEntry.times.length).toBe(1);

    expect(testSuite.$user.data?.jcTools?.rechargeCounter[key]).toBeDefined();
    expect(testSuite.$user.data?.jcTools?.rechargeCounter[key]).toBe(afterEntry);
  });

  test('subtract() should return true until max is reached', async () => {
    const root = testSuite?.$jcTools as JovoCommunityTools;
    const key = 'test';
    const max = 2;
    const minutes = 5;
    let success;
    let count;

    root.rechargeCounter.setMax(key, max);
    root.rechargeCounter.setRechargeMinutes(key, minutes);

    success = root.rechargeCounter.subtract(key);
    expect(success).toBe(true);
    count = root.rechargeCounter.getCount(key);
    expect(count).toBe(1);

    success = root.rechargeCounter.subtract(key);
    expect(success).toBe(true);
    count = root.rechargeCounter.getCount(key);
    expect(count).toBe(0);

    success = root.rechargeCounter.subtract(key);
    expect(success).toBe(false);
    count = root.rechargeCounter.getCount(key);
    expect(count).toBe(0);

    const value = root.rechargeCounter.getNextRechargeInMinutes(key);
    expect(value).toBe(minutes);

  });

  test('getNextRechargeInMinutes() should return 0', async () => {
    const root = testSuite?.$jcTools as JovoCommunityTools;
    const key = 'test';
    const max = 2;

    root.rechargeCounter.setMax(key, max);

    const value = root.rechargeCounter.getNextRechargeInMinutes(key);
    expect(value).toBe(0);

    const afterEntry = root.rechargeCounter.getEntry(key);
    expect(afterEntry.times.length).toBe(0);
  });

  test('getNextRechargeInMinutes() with all expired entries should return 0', async () => {
    const root = testSuite?.$jcTools as JovoCommunityTools;
    const key = 'test';
    const max = 2;

    root.rechargeCounter.setEntry(key, {max: max, rechargeMinutes: 5, times: [1, 2]});

    const value = root.rechargeCounter.getNextRechargeInMinutes(key);
    expect(value).toBe(0);

    const afterEntry = root.rechargeCounter.getEntry(key);
    expect(afterEntry.times.length).toBe(0);
  });


  // test('getCount() when daily streak broken should set count back to 1', async () => {
  //   const root = testSuite?.$jcTools as JovoCommunityTools;
  //   const key = 'test';
  //   root.streakCounter.setEntry(key, {count: 21, lastDay: 1});

  //   const value = root.streakCounter.getCount(key);
  //   expect(value).toEqual(1);

  //   const afterEntry = root.streakCounter.getEntry(key);

  //   expect(testSuite.$user.data?.jcTools?.streakCounter[key]).toBeDefined();
  //   expect(testSuite.$user.data?.jcTools?.streakCounter[key]).toBe(afterEntry);
  // });

  // test('reset() should set count back to 1', async () => {
  //   const root = testSuite?.$jcTools as JovoCommunityTools;
  //   const key = 'test';
  //   root.streakCounter.setEntry(key, {count: 21, lastDay: 1});

  //   root.streakCounter.reset(key);

  //   const afterEntry = root.streakCounter.getEntry(key);
  //   expect(afterEntry.count).toEqual(1);

  //   expect(testSuite.$user.data?.jcTools?.streakCounter[key]).toBeDefined();
  //   expect(testSuite.$user.data?.jcTools?.streakCounter[key]).toBe(afterEntry);
  // });


});

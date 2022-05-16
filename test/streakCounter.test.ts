import { TestSuite, InputType } from '@jovotech/framework';
import { JovoCommunityTools } from '../src/JovoCommunityTools';
import { app } from './testApp/app';

const testSuite = new TestSuite({ app });

describe('streakCounter', () => {
  beforeEach(async () => {
    await testSuite.run({ type: InputType.Launch });
  });

  test('getCount() should return 1', async () => {
    const root = testSuite?.$jcTools as JovoCommunityTools;
    const key = 'test';
    const beforeEntry = root.streakCounter.getEntry(key);
    expect(beforeEntry).not.toBeDefined();

    const value = root.streakCounter.getCount(key);
    expect(value).toEqual(1);

    const afterEntry = root.streakCounter.getEntry(key);

    expect(testSuite.$user.data?.jcTools?.streakCounter[key]).toBeDefined();
    expect(testSuite.$user.data?.jcTools?.streakCounter[key]).toBe(afterEntry);
  });

  test('getCount() when daily streak broken should set count back to 1', async () => {
    const root = testSuite?.$jcTools as JovoCommunityTools;
    const key = 'test';
    root.streakCounter.setEntry(key, {count: 21, lastDay: 1});

    const value = root.streakCounter.getCount(key);
    expect(value).toEqual(1);

    const afterEntry = root.streakCounter.getEntry(key);

    expect(testSuite.$user.data?.jcTools?.streakCounter[key]).toBeDefined();
    expect(testSuite.$user.data?.jcTools?.streakCounter[key]).toBe(afterEntry);
  });

  test('reset() should set count back to 1', async () => {
    const root = testSuite?.$jcTools as JovoCommunityTools;
    const key = 'test';
    root.streakCounter.setEntry(key, {count: 21, lastDay: 1});

    root.streakCounter.reset(key);

    const afterEntry = root.streakCounter.getEntry(key);
    expect(afterEntry.count).toEqual(1);

    expect(testSuite.$user.data?.jcTools?.streakCounter[key]).toBeDefined();
    expect(testSuite.$user.data?.jcTools?.streakCounter[key]).toBe(afterEntry);
  });


});

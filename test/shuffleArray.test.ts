import { TestSuite, InputType } from '@jovotech/framework';
import { JovoCommunityTools } from '../src/JovoCommunityTools';
import { app } from './testApp/app';

const testSuite = new TestSuite({ app });

describe('shuffleArray', () => {
  beforeEach(async () => {
    await testSuite.run({ type: InputType.Launch });
  });

  test('getNextIndex() should add entry to user store', async () => {
    const root = testSuite?.$jcTools as JovoCommunityTools;
    const key = 'test';
    const length = 5;
    const beforeEntry = root.shuffleArray.getEntry(key);
    expect(beforeEntry).not.toBeDefined();

    const value = root.shuffleArray.getNextIndex(key, length);
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThan(length);

    const afterEntry = root.shuffleArray.getEntry(key);
    expect(afterEntry).toBeDefined();
    expect(afterEntry.index).toEqual(1);
    expect(afterEntry.indexes.length).toEqual(length);

    expect(testSuite.$user.data?.jcTools?.shuffleArray[key]).toBeDefined();
    expect(testSuite.$user.data?.jcTools?.shuffleArray[key]).toBe(afterEntry);
  });

  test('getNextItem() should add entry to user store', async () => {
    const root = testSuite?.$jcTools as JovoCommunityTools;
    const key = 'letters';
    const length = 5;
    const values: string[] = ['A', 'B', 'C', 'D', 'E'];

    const beforeEntry = root.shuffleArray.getEntry(key);
    expect(beforeEntry).not.toBeDefined();

    const value = root.shuffleArray.getNextItem(key, values);
    expect(values).toIncludeAnyMembers([value]);

    const afterEntry = root.shuffleArray.getEntry(key);
    expect(afterEntry).toBeDefined();
    expect(afterEntry.index).toEqual(1);
    expect(afterEntry.indexes.length).toEqual(length);

    expect(testSuite.$user.data?.jcTools?.shuffleArray[key]).toBeDefined();
    expect(testSuite.$user.data?.jcTools?.shuffleArray[key]).toBe(afterEntry);
  });
});

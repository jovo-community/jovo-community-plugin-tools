import { TestSuite, InputType } from '@jovotech/framework';
import { app } from './testApp/app';

const testSuite = new TestSuite({ app });

describe('plugin', () => {
  beforeEach(async () => {
    await testSuite.run({ type: InputType.Launch });
  });

  test('should load plugin', async () => {
    expect(testSuite?.$jcTools).toBeDefined();
  });
});

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Component, BaseComponent, Global } from '@jovotech/framework';

@Global()
@Component()
export class GlobalComponent extends BaseComponent {
  LAUNCH() {
    this.$data.firstName = 'Mark';
    this.$user.data.appName = 'plugin test';

    return this.$send('launch');
  }

  UNHANDLED() {
    return this.LAUNCH;
  }
}

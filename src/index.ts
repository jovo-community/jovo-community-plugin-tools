import { JovoCommunityTools } from './JovoCommunityTools';

declare module '@jovotech/framework/dist/types/Jovo' {
  interface Jovo {
    $jcTools: JovoCommunityTools;
  }
}

export * from './JovoCommunityToolsPlugin';
export * from './tools';

# Jovo Community Plugin - Tools

[![NPM](https://nodei.co/npm/jovo-community-plugin-tools.png)](https://nodei.co/npm/jovo-community-plugin-tools/)

![Node CI](https://github.com/jovo-community/jovo-community-plugin-tools/workflows/Build/badge.svg)

## Overview

This plugin for the [Jovo Framework](https://github.com/jovotech/jovo-framework) simplifies some tasks and integrates with the database user storage. This plugin will grow to include other utilities.

## Supports

- Jovo Framework 4.x
- Platforms: any (alexa, googleAssistant, core, web, etc.)
- Requires a [Database Integration](https://www.jovo.tech/docs/databases) for user data storage.

## Install

Install the plugin into your Jovo project:

`npm install jovo-community-plugin-tools --save`

Register the plugin in:

app.js:

```javascript
const { JovoCommunityToolsPlugin } = require("jovo-community-plugin-tools");

const app = new App({
  plugins: [new JovoCommunityToolsPlugin()],
});
```

app.ts:

```typescript
import { JovoCommunityToolsPlugin } from "jovo-community-plugin-tools";

const app = new App({
  plugins: [new JovoCommunityToolsPlugin()],
});
```

## Tools

The included tools are:

- [shuffleArray](./src/tools/docs/README.md)

# License

MIT
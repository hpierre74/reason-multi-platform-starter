# Reason React-Native Multi-Platform Starter

> This is a React Native application developed in Reason.
> Available on iOS, Android, Web & HbbTV

## Setup

### `package.json`

To get started, see the following scripts in your `package.json`:

```json
"scripts": {
  "re:watch": "bsb -clean-world -make-world -w",
  "re:build": "bsb -clean-world -make-world",
  "start": "node node_modules/react-native/local-cli/cli.js start",
  "start:ios": "react-native run-ios",
  "start:android": "react-native run-android",
  "start:web": "node web/scripts/start.js",
  "build:web": "node web/scripts/build.js",
  "start:hbbtv": "node hbbtv/scripts/start.js",
  "build:hbbtv": "node hbbtv/scripts/build.js",
  "serve:hbbtv": "node ./hbbtv/scripts/server.js",
  "proxy:hbbtv": "concurrently \"yarn start:hbbtv\" \"yarn serve:hbbtv\"",
  "test": "jest"
}
```

### Contributing

See [Contributing Rules](CONTRIBUTING.md)

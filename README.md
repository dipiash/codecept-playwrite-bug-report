# codecept-playwrite-bug-report

Example for problem: https://github.com/microsoft/playwright/issues/10316

## Before start

Install dependencies. Execute `yarn` command in console

## How to run local test

- `yarn PORTAL:start` - run the simple test to open page https://dasreda.ru

## How to run remote test

1. You need a [moon](https://aerokube.com/moon/) instance
2. You need to change setting in `codecept.conf.js`
   - uncomment this lines
      ```
       // chromium: {
       //   timeout: 30000,
       //   browserWSEndpoint:
       //     'ws://MOON_INSTANCE/playwright/chromium/playwright-1.16.3?headless=false&enableVideo=true&name=TEST' +
       //     '&arg=--no-sandbox&arg=--disable-setuid-sandbox' +
       //     '&arg=--disable-dev-shm-usage' +
       //     '&arg=--disable-accelerated-2d-canvas' +
       //     '&arg=--no-first-run' +
       //     '&arg=--no-zygote' +
       //     '&arg=--single-process' +
       //     '&arg=--disable-gpu',
       // },
       ```
   - set the real `MOON_INSTANCE` path


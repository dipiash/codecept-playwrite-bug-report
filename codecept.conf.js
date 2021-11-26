/**
 * @typedef TestEnvVariables
 * @type {object}
 * @property {string}  PATH_TO_TESTS
 * @property {string}  PATH_TO_OUTPUT
 * @property {string}  PATH_TO_ALLURE
 * @property {string}  TEST_NAME
 * @property {string}  BASE_URL
 * @property {boolean} SHOW
 * @property {boolean} HEADLESS
 */

import path from 'path'
import Joi from 'joi'
import { config } from 'dotenv'
import dotenvParseVariables from 'dotenv-parse-variables'
import { setHeadlessWhen } from '@codeceptjs/configure'

const portals = {
  portal: path.join(__dirname, './packages/portal/.env.example'),
}

const { parsed } = config({ path: portals['portal'] })
/** @type {TestEnvVariables} */
const testEnv = dotenvParseVariables(parsed)

const envModel = Joi.object().keys({
  PATH_TO_TESTS: Joi.string().required(),
  PATH_TO_OUTPUT: Joi.string().required(),
  PATH_TO_ALLURE: Joi.string().required(),
  TEST_NAME: Joi.string().required(),
  BASE_URL: Joi.string().required(),
  SHOW: Joi.bool().required(),
  HEADLESS: Joi.bool().required(),
})

const { error } = envModel.validate(testEnv)

if (error) {
  console.error(error)
  throw new Error('You need to pass required envs!')
}

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(testEnv.HEADLESS)

exports.config = {
  tests: testEnv.PATH_TO_TESTS,
  output: testEnv.PATH_TO_OUTPUT,
  multiple: {
    parallel: {
      chunks: 3,
      browsers: ['chromium'],
    },
    basic: {
      // run all tests in chrome
      browsers: ['chromium'],
    },
  },
  helpers: {
    Playwright: {
      url: testEnv.BASE_URL,
      show: testEnv.SHOW,
      fullPageScreenshots: true,
      keepBrowserState: false,
      keepCookies: false,
      uniqueScreenshotNames: true,
      waitForNavigation: 'load',
      browser: 'chromium',
      ignoreHTTPSErrors: true,
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
    },
  },
  include: {
    I: './steps_file.ts',
  },
  bootstrap: null,
  name: testEnv.TEST_NAME,
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    allure: {
      enabled: true,
      outputDir: testEnv.PATH_TO_ALLURE,
    },
    customLocator: {
      enabled: true,
      prefix: '=',
      attribute: 'data-qa',
    },
  },
  require: ['ts-node/register'],
}

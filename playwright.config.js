// @ts-check
import { defineConfig, devices } from "@playwright/test";
const config =({
  testDir: "./test",
  //retries: 1,
  timeout: 40 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter:'html',
  use: {
    browserName:"chromium",
    headless:false,
    screenshot:"on",
    video:"retain-on-failure", //failed test case video will be recorded
    trace: "retain-on-failure",  //on
    //...devices["iPhone 15 Pro Max"], //Iocn
    //maximums window
     viewport: null,
  launchOptions: {
    args: ['--start-maximized'],

  },
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },
});
module.exports =config
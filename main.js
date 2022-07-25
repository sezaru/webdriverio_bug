const { remote } = require('webdriverio')
const { spawn } = require('child_process')
const path = require('path')

;(async () => {
  const driverVersion = 103

  const command = path.resolve(__dirname, `chromedriver-${driverVersion}`)

  console.log(`>>> Using driver: ${command}`)

  const args = ['--port=9500', '--log-level=ALL', '--log-path=./chromedriver.log']

  await spawn(command, args)

  // const browser = await remote({
  //   capabilities: {
  //     browserName: 'chrome'
  //   }
  // })

  const browser = await remote({
    capabilities: {
      browserName: 'chrome',
      'goog:loggingPrefs': { browser: 'ALL' },
      'goog:chromeOptions': { binary: '/usr/bin/google-chrome', w3c: false }
    },
    logLevel: 'warn',
    hostname: 'localhost',
    port: 9500,
    path: '/',
    connectionRetryTimeout: 65000,
    connectionRetryCount: 2,
    waitforTimeout: 15000,
    waitforInterval: 250
  })

  await browser.url('http://localhost:4000/pages/test_left_click.html')

  const element = await browser.$('>>>#container #inside')

  console.log(element)

  // This function call will work fine
  await browser.execute("arguments[0].click();", element)

  // This function call will fail
  await element.click()
})()

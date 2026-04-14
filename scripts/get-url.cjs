const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Users/jack/.cache/puppeteer/chrome/mac_arm-144.0.7559.96/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('https://www.google.com/maps/search/Total+Wraps+and+Tints+Ltd');
  await page.waitForNavigation({waitUntil: 'networkidle2'}).catch(() => {});
  console.log(page.url());
  await browser.close();
})();

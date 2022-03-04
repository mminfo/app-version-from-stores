import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

async function getBrowser() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--headless'],
  });

  return browser;
}

async function getVersion(browser, url, selector, evaluateFn) {
  const page = await browser.newPage();

  try {
    await page.goto(url);
    return await page.evaluate(evaluateFn, selector);
  } catch (error) {
    console.error(error);    
    return '';
  } finally {
    await page.close();
  }
}

async function getVersionFromAppStore(browser) {
  const url = process.env.APP_URL_APPLE || '';
  const selector = '.whats-new__latest__version';
  const evaluateFn = (selector) =>
    document.querySelector(selector).innerText.split(' ')[1];

  return getVersion(browser, url, selector, evaluateFn);
}

async function getVersionFromPlayStore(browser) {
  const url = process.env.APP_URL_GOOGLE || '';
  const selector = '.htlgb .IQ1z0d .htlgb';
  const evaluateFn = (selector) =>
    document.querySelectorAll(selector)[3].innerText;

  return getVersion(browser, url, selector, evaluateFn);
}

async function start() {
  const browser = await getBrowser();

  const versionAppStore = await getVersionFromAppStore(browser);
  const versionPlayStore = await getVersionFromPlayStore(browser);

  console.log(`App Store: ${versionAppStore}`);
  console.log(`Play Store: ${versionPlayStore}`);

  await browser.close();
}

start();
